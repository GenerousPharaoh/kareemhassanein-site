// Exercise the homepage image sequences without sending forms or external messages.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/selected-work/checks');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const pass=name=>{checks.push(name);console.log(`PASS ${name}`);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  return ctx;
}
try {
  for(const width of [320,390,768,1440]) {
    const ctx=await context({viewport:{width,height:width<900?844:900},isMobile:width<900,hasTouch:width<900,reducedMotion:'reduce'});
    const page=await ctx.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base+'/#selected-work',{waitUntil:'networkidle'});
    for(let i=0;i<3;i++) {
      const preview=page.locator('[data-work-preview]').nth(i);
      await preview.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      assert.equal(await preview.getAttribute('data-frame'),'0');
      assert.equal(await preview.getAttribute('data-running'),null);
      assert.ok(await preview.getByRole('button',{name:/Play .* previews/}).isVisible());
      const capture=preview.getByRole('img');
      assert.ok(await capture.evaluate(img=>img.complete&&img.naturalWidth>0));
      assert.equal(await capture.evaluate(img=>getComputedStyle(img).objectFit),'contain','Screens must not crop text or illustrations');
      const box=await preview.boundingBox();
      assert.ok(box.x>=0 && box.x+box.width<=width+1);
      const row=preview.locator('..');
      const link=row.locator('a');
      await link.focus();
      await page.keyboard.press('Tab');
      assert.ok(await preview.getByRole('button').evaluate(button=>document.activeElement===button),'Pause follows the project link in keyboard order');
      if(width===390||width===1440) await row.screenshot({path:path.join(out,`project-${i}-${width}.png`)});
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    assert.deepEqual(errors,[]);
    pass(`${width}: complete images, stable layout, keyboard order and reduced motion`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
    const page=await ctx.newPage();
    const errors=[];
    const requests=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('request',request=>requests.push(request.url()));
    await page.goto(base,{waitUntil:'networkidle'});
    await page.waitForFunction(()=>!document.querySelector('[data-wall-intro]'));
    assert.equal(await page.locator('[data-work-preview][data-running]').count(),0);
    assert.ok(!requests.some(url=>/\/work-media\/tax-relief-counsel\/practice--desktop-/.test(url)),'Later screens stay unloaded above the section');
    for(let i=0;i<3;i++) {
      const preview=page.locator('[data-work-preview]').nth(i);
      await preview.scrollIntoViewIfNeeded();
      await preview.evaluate(el=>{
        el.__times=[];
        new MutationObserver(()=>el.__times.push(performance.now())).observe(el,{attributes:true,attributeFilter:['data-frame']});
      });
      await page.waitForFunction(index=>document.querySelectorAll('[data-work-preview]')[index].__times.length>=2,i);
      const times=await preview.evaluate(el=>el.__times);
      const cadence=times[1]-times[0];
      assert.ok(cadence>=1600 && cadence<2500,`Image cadence ${cadence}ms`);
      await preview.getByRole('button',{name:/Pause .* previews/}).click();
      const frame=await preview.getAttribute('data-frame');
      await page.waitForTimeout(2150);
      assert.equal(await preview.getAttribute('data-frame'),frame);
      assert.equal(new URL(page.url()).pathname,'/','Pause must not activate the case link');
      await preview.getByRole('button',{name:/Play .* previews/}).click();
      await page.waitForFunction(({i,frame})=>document.querySelectorAll('[data-work-preview]')[i].dataset.frame!==frame,{i,frame});
      if(i===0) {
        await page.evaluate(()=>scrollTo(0,0));
        await page.waitForTimeout(350);
        const hidden=await preview.getAttribute('data-frame');
        await page.waitForTimeout(2150);
        assert.equal(await preview.getAttribute('data-frame'),hidden,'Off-screen previews stop');
        await preview.scrollIntoViewIfNeeded();
        await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
        const background=await preview.getAttribute('data-frame');
        await page.waitForTimeout(2150);
        assert.equal(await preview.getAttribute('data-frame'),background,'Hidden tabs stop');
        await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});
      }
    }
    const first=page.locator('[data-work-preview]').first();
    await first.scrollIntoViewIfNeeded();
    const bounds=await first.boundingBox();
    await page.mouse.click(bounds.x+bounds.width*.5,bounds.y+bounds.height*.35);
    await page.waitForURL(base+'/work/tax-relief-counsel');
    assert.deepEqual(errors,[]);
    pass(`${width}: 1.8–2s cadence, pause/resume, viewport/tab sleep, lazy images and case navigation`);
    await ctx.close();
  }
  const ctx=await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await ctx.newPage();
  let release;
  const held=new Promise(resolve=>{release=resolve;});
  await ctx.route('**/work-media/tax-relief-counsel/practice--desktop-*',async route=>{await held;await route.fallback();});
  await page.goto(base+'/#selected-work',{waitUntil:'domcontentloaded'});
  const preview=page.locator('[data-work-preview]').first();
  await preview.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2300);
  assert.equal(await preview.getAttribute('data-frame'),'0','Slow image keeps the previous capture visible');
  await preview.getByRole('button',{name:/Pause .* previews/}).click();
  release();
  await page.waitForTimeout(2300);
  assert.equal(await preview.getAttribute('data-frame'),'0','Late decode cannot advance a paused preview');
  pass('Slow image handoff and pause during loading');
  await ctx.close();
  const failure=await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  let aborted=0;
  await failure.route('**/work-media/tax-relief-counsel/practice--desktop-*',route=>{aborted++;return route.abort();});
  const failedPage=await failure.newPage();
  await failedPage.goto(base+'/#selected-work',{waitUntil:'networkidle'});
  await failedPage.waitForFunction(()=>document.querySelector('[data-work-preview]').dataset.frame==='2');
  assert.ok(aborted>0,'Failure test must actually intercept a request');
  pass('Failed capture is skipped without blanking the preview');
  await failure.close();
  const plain=await context({viewport:{width:390,height:844},javaScriptEnabled:false,reducedMotion:'reduce'});
  const staticPage=await plain.newPage();
  await staticPage.goto(base+'/#selected-work',{waitUntil:'networkidle'});
  assert.equal(await staticPage.locator('[data-work-preview]').count(),3);
  assert.equal(await staticPage.locator('[data-work-preview]').getByRole('button').count(),0);
  await staticPage.locator('#selected-work a[href="/work/tax-relief-counsel"]').click();
  await staticPage.waitForURL(base+'/work/tax-relief-counsel');
  pass('No JavaScript: first captures and native case links work');
  await plain.close();
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({base,checks},null,2));
}finally{await browser.close();}
