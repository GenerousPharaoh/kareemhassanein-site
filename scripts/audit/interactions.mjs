// Menu, motion preference and stationary action feedback. Contact requests are blocked.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(arg=>arg.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(arg=>arg.startsWith('--out='))?.slice(6)||'output/mobile-opening/interactions');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const pass=name=>{checks.push(name);console.log('PASS '+name);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN&&new URL(base).hostname.endsWith('.vercel.app')) await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  await ctx.route('**/api/contact',route=>route.abort());
  return ctx;
}
const settle=page=>page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing'));
try {
  for(const width of [390,768]) {
    const ctx=await context({viewport:{width,height:844},isMobile:width===390,hasTouch:width===390});
    const page=await ctx.newPage();
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+'/pricing',{waitUntil:'networkidle'});
    const opener=page.getByRole('button',{name:'Open menu',exact:true});
    const sheet=page.locator('#site-menu');
    for(const position of ['top','middle','bottom']) {
      await page.evaluate(position=>scrollTo(0,position==='top'?0:position==='middle'?1200:document.documentElement.scrollHeight),position);
      await page.waitForTimeout(150);
      if(position!=='top')await page.evaluate(()=>scrollBy(0,-80));
      await page.waitForTimeout(650);
      const initialY=await page.evaluate(()=>scrollY);
      // Use the visible sticky header directly; locator.click may scroll its original flow box.
      const toggleBounds=await opener.boundingBox();
      await page.mouse.click(toggleBounds.x+toggleBounds.width/2,toggleBounds.y+toggleBounds.height/2);
      await sheet.waitFor({state:'visible'});
      await page.waitForTimeout(320);
      const box=await sheet.boundingBox();
      assert.ok(box.y>=55&&box.y<100&&box.height>600,`Menu stays anchored to viewport from ${position}`);
      assert.ok(await page.locator('main').evaluate(el=>el.inert));
      assert.equal(await sheet.evaluate(el=>el.scrollTop),0);
      if(position==='top')await page.screenshot({path:path.join(out,`menu-${width}.png`)});
      await sheet.getByRole('switch',{name:'Motion',exact:true}).scrollIntoViewIfNeeded();
      await page.keyboard.press('Escape');
      await sheet.waitFor({state:'hidden'});
      assert.ok(await opener.evaluate(el=>el===document.activeElement));
      const restoredY=await page.evaluate(()=>scrollY);
      assert.ok(Math.abs(restoredY-initialY)<2,`Closing keeps the original page position at ${width}/${position}: ${initialY} to ${restoredY}`);
      assert.equal(await page.locator('main').evaluate(el=>el.inert),false);
    }
    await opener.click();await page.waitForTimeout(350);
    assert.equal(await sheet.evaluate(el=>el.scrollTop),0,'A scrolled menu reopens at its first link');
    assert.ok(await sheet.getByRole('link',{name:'Home',exact:true}).evaluate(el=>el===document.activeElement));
    const motion=sheet.getByRole('switch',{name:'Motion',exact:true});
    await motion.click();assert.equal(await motion.getAttribute('aria-checked'),'false');
    await motion.click();assert.equal(await motion.getAttribute('aria-checked'),'true');
    assert.equal(await page.evaluate(()=>document.documentElement.style.overflow),'hidden');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Close menu');
    await page.keyboard.press('Shift+Tab');
    assert.ok(await motion.evaluate(el=>el===document.activeElement));
    await page.keyboard.press('Escape');await sheet.waitFor({state:'hidden'});
    if(width===768) {
      await page.mouse.move(50,500);await page.mouse.wheel(0,-400);await page.waitForTimeout(600);
      assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('lenis-stopped')),false,'Motion re-enable in an open menu must not leave scrolling stopped');
    }
    await opener.evaluate(el=>el.focus({preventScroll:true}));await page.waitForTimeout(600);
    await opener.click();await sheet.waitFor({state:'visible'});
    await page.setViewportSize({width:1440,height:900});
    await page.waitForFunction(()=>document.querySelector('#site-menu').hidden);
    assert.ok(await page.getByRole('link',{name:'Kareem Hassanein, home',exact:true}).evaluate(el=>el===document.activeElement),'Widening returns focus to the visible identity');
    assert.equal(await page.locator('main').evaluate(el=>el.inert),false);
    assert.deepEqual(errors,[]);
    pass(`${width}: menu at top/middle/footer, reopen position, keyboard loop, Motion toggle and desktop resize`);
    await ctx.close();
  }

  const ctx=await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await ctx.newPage();await page.goto(base+'/about',{waitUntil:'networkidle'});
  const opener=page.getByRole('button',{name:'Open menu',exact:true});
  await opener.click();
  const names=await page.locator('#site-menu').evaluate(el=>el.getAnimations({subtree:true}).map(animation=>animation.animationName));
  assert.equal(names.filter(name=>name?.includes('menu-content-in')).length,1,'One menu entrance coordinates all navigation groups');
  assert.ok(!names.some(name=>/sheet-item|sheet-in|arrow/.test(name)));
  await page.waitForTimeout(100);await page.screenshot({path:path.join(out,'menu-arrival.png')});
  await page.locator('#site-menu').getByRole('link',{name:'Case studies',exact:true}).click();
  await page.waitForURL(base+'/work');await settle(page);
  assert.equal(await page.locator('main').evaluate(el=>el.inert),false);
  await page.setViewportSize({width:844,height:390});
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.waitForTimeout(350);await page.screenshot({path:path.join(out,'menu-landscape.png')});
  await page.locator('#site-menu').getByRole('link',{name:'Notes',exact:true}).click();
  await page.waitForURL(base+'/notes');await settle(page);
  pass('Mobile menu: coordinated arrival, page transition and usable landscape navigation');
  await ctx.close();

  const desktop=await context({viewport:{width:1440,height:900}});
  const wide=await desktop.newPage();await wide.goto(base+'/pricing',{waitUntil:'networkidle'});
  const services=wide.locator('header details').filter({has:wide.locator('summary').filter({hasText:'Services'})});
  await services.locator('summary').click();
  await services.getByRole('link',{name:/law firms/i}).waitFor({state:'visible'});
  await wide.waitForTimeout(300);
  await wide.screenshot({path:path.join(out,'desktop-services.png')});
  await wide.keyboard.press('Escape');assert.equal(await services.evaluate(el=>el.open),false);
  const button=wide.locator('header a[data-track="header-book"]');
  const geometry=()=>button.evaluate(el=>{const box=el.getBoundingClientRect();return{x:box.x,y:box.y,width:box.width,height:box.height,after:getComputedStyle(el,'::before').content};});
  const before=await geometry();await button.hover();await wide.waitForTimeout(350);const after=await geometry();
  assert.deepEqual(after,before,'Hover feedback cannot shift a header button or introduce a fill overlay');
  assert.ok(after.after==='none'||after.after==='normal');
  const call=wide.locator('main a[href="/book"]').last();await call.scrollIntoViewIfNeeded();await wide.waitForTimeout(700);
  const arrow=call.locator('svg').last();const arrowBefore=await arrow.boundingBox();
  await call.hover();await wide.waitForTimeout(400);const arrowAfter=await arrow.boundingBox();
  assert.ok(Math.abs(arrowBefore.x-arrowAfter.x)<1&&Math.abs(arrowBefore.y-arrowAfter.y)<1,'Invitation arrow stays in place on hover');
  await wide.screenshot({path:path.join(out,'invitation-desktop.png')});
  await wide.goto(base+'/work/tax-relief-counsel',{waitUntil:'networkidle'});
  const zoom=wide.locator('a[data-zoom]').first();await zoom.click();
  const dialog=wide.getByRole('dialog');await dialog.waitFor();
  assert.ok(!/\b0\d\s*\/\s*0\d\b/.test(await dialog.innerText()),'Gallery has no decorative frame counter');
  await wide.emulateMedia({reducedMotion:'reduce'});await wide.emulateMedia({reducedMotion:'no-preference'});
  await wide.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
  await wide.waitForTimeout(200);
  assert.equal(await wide.evaluate(()=>document.documentElement.classList.contains('lenis-stopped')),false,'Changing OS preference in viewer cannot strand scrolling');
  pass('Desktop: native Services disclosure, stationary button/arrow feedback, gallery cleanup and scroll restoration');
  await desktop.close();

  for(const width of [390,844,1440]) {
    const nojs=await context({viewport:{width,height:width===844?390:900},javaScriptEnabled:false,reducedMotion:'reduce'});
    const tab=await nojs.newPage();await tab.goto(base+'/pricing',{waitUntil:'networkidle'});
    if(width<960) {
      const menu=tab.locator('noscript details');await menu.locator('summary').click();
      assert.ok(await menu.getByRole('link',{name:'Case studies',exact:true}).isVisible());
      await tab.screenshot({path:path.join(out,`menu-no-js-${width}.png`)});
      await menu.getByRole('link',{name:'Case studies',exact:true}).click();await tab.waitForURL(base+'/work');
      assert.equal(await tab.getByRole('button',{name:'Open menu',exact:true}).count(),0);
    } else {
      assert.equal(await tab.locator('noscript details').isVisible(),false);
      await tab.locator('header details:not(noscript details) summary').click();
      assert.ok(await tab.locator('header').getByRole('link',{name:/law firms/i}).isVisible());
    }
    assert.ok(await tab.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    pass(`${width}: working navigation without JavaScript`);
    await nojs.close();
  }
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
