import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/flow/checks');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const pass=name=>{checks.push(name);console.log('PASS '+name);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  await ctx.addInitScript(()=>{
    window.__transitions=[];
    if(!document.startViewTransition) return;
    const start=document.startViewTransition.bind(document);
    document.startViewTransition=options=>{
      const at=performance.now(), t=start(options), record={types:[...t.types]};
      window.__transitions.push(record);
      const skip=t.skipTransition.bind(t);
      t.skipTransition=()=>{record.skipped=performance.now()-at;skip();};
      t.ready.then(()=>{
        record.ready=performance.now()-at;
        record.hidden=[...document.querySelectorAll('[data-enter], [data-display] span')].filter(el=>parseFloat(getComputedStyle(el).opacity)<.99).length;
        record.animations=document.getAnimations().map(a=>a.animationName||'').filter(n=>/ink-arrive|portrait-open|^enter$/.test(n));
      }).catch(()=>record.cancelled=true);
      t.finished.then(()=>record.finished=performance.now()-at).catch(()=>{});
      return t;
    };
  });
  return ctx;
}
async function settle(page) { await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing')); }
async function pointerClick(page,locator) {
  // Locator.click scrolls sticky controls to their original document position in Chromium.
  const box=await locator.boundingBox();
  await page.mouse.click(box.x+box.width/2,box.y+box.height/2);
}
async function position(page,selector) {
  const y=await page.locator(selector).evaluate(el=>scrollY+(el.closest('section,footer')||el).getBoundingClientRect().top+100);
  await page.evaluate(y=>scrollTo(0,y+40),y);
  await page.waitForTimeout(50);
  await page.evaluate(()=>scrollTo(0,Math.max(0,scrollY-40)));
  await page.waitForTimeout(550);
}
try {
  for(const [width,height] of [[320,568],[390,844],[768,1024],[844,390],[1024,768],[1440,900]]) {
    const phone=width<960;
    // 768px deliberately uses a fine pointer, like a narrow PC window.
    const ctx=await context({viewport:{width,height},isMobile:phone&&width!==768,hasTouch:phone&&width!==768});
    const page=await ctx.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/about',{waitUntil:'networkidle'});
    await page.waitForTimeout(500);
    const header=page.locator('body > header');
    for(const [selector,theme] of [['#about-title','light'],['#why-title','dark'],['#how-title','light'],['#close-title','dark'],['footer','light']]) {
      await position(page,selector);
      // A short footer can stop below the header when the document reaches its scroll limit.
      const expected=selector==='footer' && (await page.locator('footer').boundingBox()).y>32?'dark':theme;
      assert.equal(await header.getAttribute('data-theme'),expected,`${width}, ${selector}`);
      if(phone) {
        const y=await page.evaluate(()=>scrollY);
        await pointerClick(page,header.getByRole('button',{name:'Open menu'}));
        const menu=page.locator('#site-menu');
        await menu.waitFor({state:'visible'});
        const box=await menu.boundingBox();
        const contentWidth=(await header.boundingBox()).width;
        assert.ok(box.x===0 && Math.abs(box.width-contentWidth)<1 && box.y>=63 && Math.abs(box.y+box.height-height)<2,JSON.stringify(box));
        assert.equal(await header.getAttribute('data-theme'),expected);
        assert.equal(await header.evaluate(el=>getComputedStyle(el).transform),'none');
        assert.ok(await page.locator('#main').evaluate(el=>el.inert));
        await page.mouse.move(width/2,28);await page.mouse.wheel(0,300);await page.waitForTimeout(150);
        assert.ok(Math.abs((await page.evaluate(()=>scrollY))-y)<2,`${width} ${selector}: menu background ${y} -> ${await page.evaluate(()=>scrollY)}`);
        await page.keyboard.press('Escape');
        await page.waitForFunction(()=>document.querySelector('#site-menu').hidden);
        assert.ok(!await page.locator('#main').evaluate(el=>el.inert));
        assert.equal(await header.getByRole('button',{name:'Open menu'}).evaluate(el=>el===document.activeElement),true);
      } else {
        const toggle=header.locator('summary');
        await pointerClick(page,toggle);
        const panel=header.locator('details > div');
        const box=await panel.boundingBox();
        assert.ok(box.x>=0 && box.x+box.width<=width && box.y>=44);
        await page.mouse.move(32,height-30);await page.mouse.wheel(0,110);await page.waitForTimeout(250);
        assert.ok(!await header.getAttribute('data-tucked'),'Open desktop Services stays available while scrolling');
        await page.keyboard.press('Escape');
        assert.ok(!await header.locator('details').evaluate(el=>el.open));
        await page.waitForTimeout(1000); // Let the deliberate wheel gesture finish before repositioning.
      }
    }
    await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(600);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    for(const el of await header.locator('a:visible,button:visible,summary:visible').all()) {
      const box=await el.boundingBox();assert.ok(box.width>=44 && box.height>=44,`${width}: ${await el.innerText()} ${JSON.stringify(box)}`);
    }
    if(width===390||width===1440) await page.screenshot({path:path.join(out,`header-${width}.png`)});
    if(phone) {
      await header.getByRole('button',{name:'Open menu'}).click();
      await page.waitForTimeout(500);
      if(width===390||width===844) await page.screenshot({path:path.join(out,`menu-${width}.png`)});
      await page.keyboard.press('Shift+Tab');
      assert.equal(await header.getByRole('button',{name:'Close menu'}).evaluate(el=>el===document.activeElement),true);
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.locator('[data-track="menu-book"]').evaluate(el=>el===document.activeElement),true);
      await page.setViewportSize({width:1200,height:800});
      await page.waitForFunction(()=>document.querySelector('#site-menu').hidden);
      assert.ok(!await page.locator('#main').evaluate(el=>el.inert));
      assert.notEqual(await page.evaluate(()=>document.documentElement.style.overflow),'hidden');
    }
    assert.deepEqual(errors,[]);
    pass(`${width}x${height}: menus over five light/dark positions, background lock, focus and resizing`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
    const page=await ctx.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/work',{waitUntil:'networkidle'});
    if(width===390) await page.getByRole('button',{name:'Open menu'}).click();
    await page.getByRole('navigation',{name:width===390?'Menu':'Main',exact:true}).getByRole('link',{name:'About',exact:true}).click();
    await page.waitForURL(base+'/about');await settle(page);
    const arrival=await page.evaluate(()=>window.__transitions.find(t=>t.types.includes('page')));
    assert.ok(arrival.ready && !arrival.skipped,JSON.stringify(arrival));
    assert.equal(arrival.hidden,0);assert.deepEqual(arrival.animations,[]);
    await page.goBack();await page.waitForURL(base+'/work');await settle(page);
    await page.getByRole('button',{name:'Clinics',exact:true}).click();await page.waitForTimeout(500);
    const card=page.locator('[data-case-card]').filter({has:page.locator('a[href="/work/physiomax"]')});
    await card.locator('[data-case-preview]').scrollIntoViewIfNeeded();await page.waitForTimeout(900);
    const y=await page.evaluate(()=>scrollY);
    const box=await card.locator('[data-case-preview]').boundingBox();
    await page.mouse.click(box.x+box.width*.4,Math.min(box.y+box.height*.3,700));
    await page.waitForURL(base+'/work/physiomax');await settle(page);
    await page.goBack();await page.waitForURL(base+'/work');await settle(page);await page.waitForTimeout(200);
    assert.equal(await page.locator('[data-filter]').getAttribute('data-filter'),'clinics');
    assert.ok(Math.abs((await page.evaluate(()=>scrollY))-y)<5,'Back restores the filtered list at the same position');
    await page.goForward();await page.waitForURL(base+'/work/physiomax');await settle(page);
    assert.equal(await page.getByRole('link',{name:'Case studies',exact:true}).count()>=1,true);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.locator('footer').getByRole('link',{name:'About',exact:true}).click();
    await page.waitForURL(base+'/about');
    assert.ok(await page.locator('h1').isVisible());
    assert.deepEqual(errors,[]);
    pass(`${width}: composed arrivals, filtered Back/Forward, preserved scroll and reduced motion`);
    await ctx.close();
  }
  // Hold an uncached route. The animation must let go after 300ms, and rapid taps must stay sane.
  const ctx=await context({viewport:{width:1440,height:900}});
  let release;const hold=new Promise(resolve=>release=resolve);
  await ctx.route('**/about?*',async route=>{await hold;await route.fallback();});
  const page=await ctx.newPage();
  await page.goto(base+'/work',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.history.state?.__khMotionPosition!==undefined);
  const about=page.getByRole('navigation',{name:'Main',exact:true}).getByRole('link',{name:'About',exact:true});
  await about.dispatchEvent('click');await about.dispatchEvent('click');
  await page.waitForTimeout(500);
  const slow=await page.evaluate(()=>window.__transitions.filter(t=>t.types.includes('page')));
  assert.equal(slow.length,1,'Repeated pending destination creates only one transition');
  assert.ok(slow[0].skipped>=280 && slow[0].skipped<500,JSON.stringify(slow));
  assert.ok(!await page.evaluate(()=>document.documentElement.hasAttribute('data-route-changing')));
  await page.getByRole('navigation',{name:'Main',exact:true}).getByRole('link',{name:'Pricing',exact:true}).click();
  await page.waitForURL(base+'/pricing');release();await page.waitForTimeout(500);await settle(page);
  assert.equal(new URL(page.url()).pathname,'/pricing','A late response cannot override a newer choice');
  pass('Delayed route: 300ms snapshot limit, duplicate-tap guard and latest navigation wins');
  await ctx.close();
  const fallback=await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  await fallback.addInitScript(()=>document.startViewTransition=undefined);
  const plain=await fallback.newPage();await plain.goto(base+'/work',{waitUntil:'networkidle'});
  await plain.getByRole('button',{name:'Open menu'}).click();
  await plain.getByRole('navigation',{name:'Menu',exact:true}).getByRole('link',{name:'About',exact:true}).click();
  await plain.waitForURL(base+'/about');
  assert.equal(await plain.locator('[data-display] span').evaluateAll(els=>els.filter(el=>parseFloat(getComputedStyle(el).opacity)<.99).length),0);
  pass('Unsupported transition API: native route remains readable and usable');
  await fallback.close();
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
