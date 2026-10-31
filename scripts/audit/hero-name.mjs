// Full-name window and permanent homepage name: layout, first paint and interruptions. Contact is blocked.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=(process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323').replace(/\/$/,'');
const origin=new URL(base).origin;
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/work-monogram/checks');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const checks=[];
const contact=[];
const pass=name=>{checks.push(name);console.log('PASS '+name);};

async function withPage(options,check,setup=async()=>{}) {
  const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference',...options});
  const errors=[];
  try {
    await ctx.route('**/*',route=>{
      const url=new URL(route.request().url());
      if(url.origin===origin && url.pathname==='/api/contact') {contact.push(url.pathname);return route.abort('blockedbyclient');}
      const trusted=process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app') && url.origin===origin;
      return route.continue(trusted?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{});
    });
    await ctx.addInitScript(()=>{
      window.__heroNameStarts=[];
      new MutationObserver(records=>records.forEach(({target})=>{
        if(target.getAttribute('data-opening-phase')==='name') window.__heroNameStarts.push(performance.now());
      })).observe(document,{subtree:true,attributes:true,attributeFilter:['data-opening-phase']});
    });
    await setup(ctx);
    const page=await ctx.newPage();
    page.setDefaultTimeout(15000);
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error' && /hydrat/i.test(message.text()))errors.push(message.text());});
    await check(page,ctx);
    assert.deepEqual(errors,[],'No runtime or hydration errors');
  } finally {await ctx.close();}
}

async function available(page) {
  assert.equal(await page.locator('h1').count(),1);
  const name=page.getByRole('heading',{level:1,name:'Kareem Hassanein',exact:true});
  assert.equal(await name.count(),1);
  assert.equal(await name.evaluate(el=>el.textContent.replace(/\s+/g,'')),'KareemHassanein','The name has one actual text rendering, not duplicate overlays');
  assert.equal(await page.locator('[data-wall-intro], [data-intro-title], [data-mark-cell]').count(),0);
  assert.ok(await page.locator('body > header').evaluate(el=>getComputedStyle(el).visibility==='visible' && +getComputedStyle(el).opacity===1));
  assert.ok(await page.locator('[data-hero-copy]').evaluate(el=>getComputedStyle(el).visibility==='visible' && +getComputedStyle(el).opacity===1));
  assert.equal(await page.locator('[data-hero-copy] > p').textContent(),'Websites, booking, search and ads');
  for(const track of ['hero-book','hero-work']) {
    const link=page.locator(`[data-track="${track}"]`);
    assert.ok(await link.isVisible());
    assert.ok(await link.evaluate(el=>{
      const b=el.getBoundingClientRect();const hit=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);
      return hit===el || el.contains(hit);
    }),`${track} is immediately unobstructed`);
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal page overflow');
}

async function settledName(page,{checkViewport=true}={}) {
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('[data-hero-name]').evaluate(el=>Number(getComputedStyle(el).opacity)),1,'The complete name remains visible');
  const result=await page.locator('[data-hero-name]').evaluate(name=>{
    const box=el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};};
    const words=[...name.children].map(word=>{
      const r=word.getBoundingClientRect();
      const cs=getComputedStyle(word);
      return {text:word.textContent.trim(),left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,visibility:cs.visibility,opacity:+cs.opacity,clip:cs.clipPath,transform:cs.transform};
    });
    return {words,header:box(document.querySelector('body > header')),hero:box(name.closest('section')),copy:box(document.querySelector('[data-hero-copy]')),descriptor:box(document.querySelector('[data-hero-copy] > p')),links:[...document.querySelectorAll('[data-hero-copy] a')].map(box),work:box(document.getElementById('selected-work')),viewport:{width:innerWidth,height:innerHeight},clip:getComputedStyle(name).clipPath,sinkClip:getComputedStyle(document.querySelector('[data-sink]')).clipPath};
  });
  assert.deepEqual(result.words.map(word=>word.text),['Kareem','Hassanein']);
  assert.equal(result.clip,'none');assert.equal(result.sinkClip,'none');
  const overlaps=(a,b)=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1;
  for(const word of result.words) {
    assert.equal(word.visibility,'visible');assert.equal(word.opacity,1);assert.equal(word.clip,'none');
    assert.ok(word.width>0 && word.height>0);
    assert.ok(word.left>=-1 && word.right<=result.viewport.width+1,JSON.stringify(result));
    assert.ok(word.top>=result.header.bottom-1 && word.bottom<=result.hero.bottom+1,'Name is not clipped by the header or hero');
    assert.ok(!overlaps(word,result.descriptor) && result.links.every(link=>!overlaps(word,link)),JSON.stringify(result));
  }
  assert.ok(!overlaps(result.words[0],result.words[1]),'The two name lines do not overlap');
  for(const link of result.links) {
    assert.ok(link.left>=-1 && link.right<=result.viewport.width+1);
    assert.ok(!overlaps(link,result.descriptor),'Descriptor and actions do not overlap');
    assert.ok(link.bottom<result.work.top-4,'Actions remain clear of the work sheet');
    if(checkViewport)assert.ok(link.top>=result.header.bottom && link.bottom<=result.viewport.height+1,JSON.stringify(result));
  }
  assert.ok(result.work.top<=result.hero.bottom+1,'No blank gap between hero and selected work');
  return result;
}

const finish=page=>page.waitForFunction(()=>!document.querySelector('[data-hero-opening]'));
const starts=page=>page.evaluate(()=>window.__heroNameStarts.length);
const noNameMotion=async page=>assert.equal(await page.locator('[data-hero-name]').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
const routeSettled=page=>page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing'));

try {
  for(const [width,height] of [[320,844],[390,844],[430,844],[768,1024],[1440,900],[1440,720],[1440,680]]) {
    await withPage({viewport:{width,height},isMobile:width<900,hasTouch:width<900},async page=>{
      await page.goto(base+'/',{waitUntil:'domcontentloaded'});await available(page);
      await finish(page);await settledName(page);await noNameMotion(page);
      await page.screenshot({path:path.join(out,`name-${width}x${height}.png`)});
    });
    pass(`${width}x${height}: permanent name, clear descriptor/actions and no clipping or gaps`);
  }

  let release;
  await withPage({},async page=>{
    try {
      await page.goto(base+'/',{waitUntil:'commit'});
      await page.locator('[data-hero-name]').waitFor({state:'attached'});
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('[data-hero-name]').parentElement).position==='absolute');
      await available(page);assert.equal(await page.locator('[data-ready]').count(),0);
      assert.ok(await page.locator('[data-name-window]').isVisible(),'The full-name screen window is present before app JavaScript');
      await page.waitForFunction(()=>document.documentElement.hasAttribute('data-opening-expired'));
      await settledName(page);const before=await starts(page);assert.equal(before,0);
      await page.screenshot({path:path.join(out,'slow-js-settled.png')});
      release();await page.waitForSelector('[data-ready]');await finish(page);
      await page.waitForTimeout(150);assert.equal(await starts(page),before,'Hydration does not replay the entrance');
      await settledName(page);
    } finally {release?.();}
  },async ctx=>{
    const held=new Promise(resolve=>release=resolve);
    await ctx.route('**/*.js',async route=>{await held;await route.fallback();});
  });
  pass('Slow JavaScript: name window and controls appear at first paint; deadline resolves without hydration replay');

  for(const mode of ['no-js','os-reduce','saved-off']) {
    await withPage(mode==='no-js'?{javaScriptEnabled:false}:mode==='os-reduce'?{reducedMotion:'reduce'}:{},async page=>{
      await page.goto(base+'/',{waitUntil:'domcontentloaded'});await available(page);await settledName(page);await noNameMotion(page);
      if(mode!=='no-js')await finish(page);
      if(mode==='os-reduce') {
        assert.equal(await page.locator('html').getAttribute('data-motion'),'off');
        await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(150);
        assert.equal(await starts(page),0,'Re-enabling device motion does not replay the name');await noNameMotion(page);
      }
      if(mode==='saved-off') {
        await page.getByRole('button',{name:'Open menu'}).click();
        const motion=page.getByRole('navigation',{name:'Menu',exact:true}).getByRole('switch',{name:'Motion',exact:true});
        assert.equal(await motion.getAttribute('aria-checked'),'false');await motion.click();
        await page.getByRole('button',{name:'Close menu'}).click();
        await page.locator('#site-menu').waitFor({state:'hidden'});
        assert.equal(await page.locator('html').getAttribute('data-motion'),'on');
        assert.equal(await starts(page),0,'Re-enabling saved motion does not replay the name');await noNameMotion(page);
      }
    },async ctx=>{
      if(mode==='saved-off')await ctx.addInitScript(()=>localStorage.setItem('kh-motion','off'));
      if(mode==='os-reduce')await ctx.addInitScript(()=>localStorage.setItem('kh-motion','on'));
    });
    pass(`${mode}: intact name from first paint and no replay when motion is enabled`);
  }

  for(const interruption of ['scroll','rotate','reduce']) {
    await withPage({},async page=>{
      await page.goto(base+'/',{waitUntil:'domcontentloaded'});await page.waitForSelector('[data-ready]');
      await page.waitForFunction(()=>window.__heroNameStarts.length>=1 || !document.querySelector('[data-hero-opening]'));
      const before=await starts(page);
      if(interruption==='scroll')await page.evaluate(()=>scrollTo({top:150,behavior:'instant'}));
      if(interruption==='rotate')await page.setViewportSize({width:844,height:390});
      if(interruption==='reduce')await page.emulateMedia({reducedMotion:'reduce'});
      await finish(page);
      if(interruption==='scroll')await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      if(interruption==='rotate')await page.setViewportSize({width:390,height:844});
      if(interruption==='reduce')await page.emulateMedia({reducedMotion:'no-preference'});
      await page.waitForTimeout(150);await noNameMotion(page);await available(page);await settledName(page);
      assert.equal(await starts(page),before,`${interruption} cannot restart name animations`);
    });
    pass(`${interruption}: interruption settles to the intact name without replay`);
  }

  let releaseDrag;
  await withPage({},async page=>{
    try {
      await page.goto(base+'/',{waitUntil:'commit'});
      await page.locator('[data-hero-name]').waitFor({state:'attached'});
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('[data-hero-name]').parentElement).position==='absolute');
      await page.evaluate(()=>document.fonts.ready);
      assert.ok(await page.locator('[data-name-window]').isVisible(),'The name window is ready before hydration');
      releaseDrag();await page.waitForSelector('[data-ready]');
      const point=await page.locator('[data-hero-name]').evaluate(name=>{
        const hero=name.closest('section');const nameBox=name.getBoundingClientRect();
        const copy=document.querySelector('[data-hero-copy]').getBoundingClientRect();
        const x=innerWidth*.25;const y=(nameBox.bottom+copy.top)/2;
        const target=document.elementFromPoint(x,y);
        return {x,y,clear:hero.contains(target) && !target.closest('a, button, [data-hero-copy]')};
      });
      assert.ok(point.clear,'Pointer starts on open wall space');
      await page.mouse.click(point.x,point.y);
      assert.equal(await page.locator('[data-hero-opening]').count(),1,'A tap does not retire the name entrance');
      await page.mouse.move(point.x,point.y);await page.mouse.down();
      await page.mouse.move(point.x+4,point.y);
      assert.equal(await page.locator('[data-dragging]').count(),0,'Sub-threshold pointer movement is still a tap');
      assert.equal(await page.locator('[data-hero-opening]').count(),1);
      const lane=page.locator('[data-plane] [data-row]').first();
      const before=await lane.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
      await page.mouse.move(point.x+64,point.y);
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(resolve)));
      assert.equal(await page.locator('[data-dragging]').count(),1,'A real horizontal drag crossed the threshold');
      assert.equal(await page.locator('[data-hero-opening]').count(),0,'Dragging retires the name on the next rendered frame');
      const after=await lane.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
      assert.ok(Math.abs(after-before)>32,'The wall moves with the drag, beyond its small automatic drift');
      await page.mouse.up();await noNameMotion(page);await settledName(page);
    } finally {releaseDrag?.();await page.mouse.up();}
  },async ctx=>{
    const held=new Promise(resolve=>releaseDrag=resolve);
    await ctx.route('**/*.js',async route=>{await held;await route.fallback();});
  });
  pass('Real pointer input: taps preserve the entrance; horizontal dragging settles the name and moves the wall immediately');

  await withPage({},async page=>{
    await page.goto(base+'/',{waitUntil:'domcontentloaded'});
    await page.getByRole('button',{name:'Open menu'}).click();
    await page.getByRole('navigation',{name:'Menu',exact:true}).getByRole('link',{name:'Pricing',exact:true}).click();
    await page.waitForURL(base+'/pricing');await routeSettled(page);
    const before=await starts(page);
    await page.goBack();await page.waitForURL(base+'/');await routeSettled(page);await finish(page);
    await available(page);await settledName(page);await noNameMotion(page);
    assert.equal(await starts(page),before,'History return does not replay the name entrance');
  });
  pass('Menu during entrance and browser Back preserve an immediately complete homepage');
  assert.deepEqual(contact,[],'No contact requests were attempted');
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
