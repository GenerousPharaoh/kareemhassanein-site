// Hero layout, motion and navigation checks. No external messages or form submissions.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/hero/checks');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const pass=name=>{checks.push(name);console.log(`PASS ${name}`);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) {
    await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  }
  return ctx;
}
try {
  for(const [width,height] of [[320,568],[390,844],[768,1024],[844,390],[1280,680],[1440,900],[1920,1080]]) {
    const ctx=await context({viewport:{width,height},isMobile:width<900,hasTouch:width<900,reducedMotion:'reduce'});
    const page=await ctx.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const result=await page.locator('[data-hero-copy]').evaluate(copy=>{
      const box=copy.getBoundingClientRect(), hero=copy.parentElement.getBoundingClientRect(), heading=copy.querySelector('h1').getBoundingClientRect();
      return {left:box.left,right:box.right,top:box.top,bottom:box.bottom,heroBottom:hero.bottom,headingHeight:heading.height,opacity:getComputedStyle(copy).opacity,overflow:document.documentElement.scrollWidth-innerWidth};
    });
    assert.equal(await page.locator('h1').count(),1);
    assert.ok(result.overflow<=1 && result.left>=0 && result.right<=width+1);
    assert.ok(result.top>=64 && result.bottom<result.heroBottom-50,JSON.stringify(result));
    assert.equal(result.opacity,'1');
    assert.ok(result.headingHeight>0);
    assert.equal(await page.getByRole('button',{name:/wall of work/}).count(),0);
    await page.screenshot({path:path.join(out,`hero-${width}.png`)});
    await page.locator('[data-track="hero-work"]').click();
    await page.waitForFunction(()=>location.hash==='#selected-work' && scrollY>100);
    assert.ok(await page.locator('#selected-work').evaluate(el=>el.getBoundingClientRect().top<150));
    assert.deepEqual(errors,[]);
    pass(`${width}x${height}: readable heading, no overflow, reduced motion and work anchor`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
    const page=await ctx.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'networkidle'});
    await page.waitForFunction(()=>!document.querySelector('[data-wall-intro]'));
    const rows=()=>page.locator('[data-plane] [data-row]').evaluateAll(els=>els.map(el=>el.style.transform));
    const before=await rows();
    await page.waitForTimeout(180);
    assert.notDeepEqual(await rows(),before);
    await page.getByRole('button',{name:'Pause the wall of work'}).click();
    await page.waitForTimeout(80);
    const paused=await rows();
    const pose=await page.locator('[data-plane]').getAttribute('style');
    await page.waitForTimeout(250);
    assert.deepEqual(await rows(),paused,'Pause stops all lanes');
    assert.equal(await page.locator('[data-plane]').getAttribute('style'),pose,'Pause stops the camera sway');
    await page.screenshot({path:path.join(out,`hero-motion-${width}.png`)});
    await page.getByRole('button',{name:'Play the wall of work'}).click();
    const resumed=await rows();
    await page.waitForTimeout(180);
    assert.notDeepEqual(await rows(),resumed,'Play resumes the wall');
    await page.getByRole('button',{name:'Pause the wall of work'}).click();
    const book=page.locator('[data-track="hero-book"]');
    await book.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    assert.ok(await book.evaluate(el=>getComputedStyle(el).outlineStyle!=='none'));
    await page.keyboard.press('Enter');
    await page.waitForURL(`${base}/book`);
    await page.goBack();
    await page.waitForURL(base+'/');
    await page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing'));
    assert.equal(await page.locator('[data-wall-intro]').count(),0,'Back navigation does not replay the intro');
    assert.ok(await page.locator('[data-hero-copy]').isVisible());
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForTimeout(150);
    const still=await rows();
    await page.waitForTimeout(180);
    assert.deepEqual(await rows(),still,'Changing motion preference stops the wall');
    assert.deepEqual(errors,[]);
    pass(`${width}: entrance, drift, complete pause, keyboard booking, return and motion preference`);
    await ctx.close();
  }
  for(const motion of ['reduce','no-preference']) {
    const ctx=await context({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:motion});
    const page=await ctx.newPage();
    await page.goto(base,{waitUntil:'networkidle'});
    await page.waitForTimeout(3500);
    assert.ok(await page.locator('[data-hero-copy]').isVisible());
    assert.equal(await page.locator('[data-track="hero-book"]').getAttribute('href'),'/book');
    assert.equal(await page.getByRole('button',{name:/wall of work/}).count(),0);
    await page.locator('[data-track="hero-work"]').click();
    assert.ok(await page.evaluate(()=>scrollY>100));
    pass(`No JavaScript, ${motion}: statement and native navigation remain usable`);
    await ctx.close();
  }
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
