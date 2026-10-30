import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/flow/drawing');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  return ctx;
}
try {
  for(const width of [390,1440].filter(width=>!process.argv.includes('--desktop-only')||width===1440)) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
    const page=await ctx.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/about',{waitUntil:'networkidle'});
    const drawing=page.locator('[data-process-drawing]');
    const nav=page.getByRole('navigation',{name:'How I work'});
    await drawing.scrollIntoViewIfNeeded();
    for(const [i,name] of ['Assess','Plan','Build','Run'].entries()) {
      await nav.getByRole('link',{name,exact:true}).click();
      await page.waitForFunction(i=>document.querySelector('[data-process-drawing]').dataset.active===String(i),i);
      if(i===2) {
        await page.waitForFunction(()=>document.querySelector('[data-process-drawing]').hasAttribute('data-morphing'));
        await page.screenshot({path:path.join(out,`morph-${width}-start.png`)});
        await page.waitForTimeout(160);
        await page.screenshot({path:path.join(out,`morph-${width}-middle.png`)});
      }
      await page.waitForFunction(()=>!document.querySelector('[data-process-drawing]').hasAttribute('data-morphing'));
      await page.waitForTimeout(450);
      assert.equal(await drawing.locator(`[data-scene="${i}"]`).evaluate(el=>getComputedStyle(el).opacity),'1');
      assert.equal(await drawing.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
      if(i===2) await page.screenshot({path:path.join(out,`morph-${width}-finished.png`)});
    }
    // Reverse while the outlines are moving. The final geometry must belong to the last step.
    await nav.getByRole('link',{name:'Plan',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-process-drawing]').hasAttribute('data-morphing'));
    await nav.getByRole('link',{name:'Build',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-process-drawing]').dataset.active==='2'&&!document.querySelector('[data-process-drawing]').hasAttribute('data-morphing'));
    assert.equal(await drawing.locator('[data-morph-surface]').first().getAttribute('width'),'318.00');
    await nav.getByRole('link',{name:'Run',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-process-drawing]').hasAttribute('data-morphing'));
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>!document.querySelector('[data-process-drawing]').hasAttribute('data-morphing'));
    await nav.getByRole('link',{name:'Assess',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-process-drawing]').dataset.active==='0');
    assert.ok(!await drawing.getAttribute('data-morphing'));
    const running=await drawing.evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').map(a=>({name:a.animationName,property:a.transitionProperty,target:a.effect.target.outerHTML.slice(0,150)})));
    assert.deepEqual(running,[]);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    assert.deepEqual(errors,[]);
    checks.push(`${width}: four complete drawings, finite morphs, rapid reversal and live reduced motion`);
    console.log('PASS '+checks.at(-1));
    await page.goto(base+'/ai',{waitUntil:'networkidle'});
    assert.ok(!(await page.locator('main').innerText()).includes('stay in your name'));
    assert.ok((await page.locator('main').innerText()).includes('until you have approved it'));
    await page.screenshot({path:path.join(out,`ai-${width}.png`),fullPage:true});
    await ctx.close();
  }
  const ctx=await context({viewport:{width:390,height:844},javaScriptEnabled:false});
  const page=await ctx.newPage();await page.goto(base+'/about',{waitUntil:'networkidle'});
  assert.equal(await page.locator('[data-process-step]').count(),4);
  assert.equal(await page.locator('[data-scene="0"]').evaluate(el=>getComputedStyle(el).opacity),'1');
  assert.equal(await page.locator('h1').count(),1);
  checks.push('No JavaScript: complete process text and a finished illustration');console.log('PASS '+checks.at(-1));
  await ctx.close();
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
