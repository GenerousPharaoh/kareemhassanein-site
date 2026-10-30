// Booking, pricing and project-browsing checks. Contact delivery is always mocked.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/journey/checks');
fs.mkdirSync(out,{recursive:true});
const checks=[];
const pass=name=>{checks.push(name);console.log('PASS '+name);};
const browser=await chromium.launch({channel:'chrome',headless:true});
async function context(options={}) {
  const ctx=await browser.newContext(options);
  if(process.env.VERCEL_OIDC_TOKEN && new URL(base).hostname.endsWith('.vercel.app')) await ctx.route('**/*',route=>route.continue(new URL(route.request().url()).origin===new URL(base).origin?{headers:{...route.request().headers(),'x-vercel-trusted-oidc-idp-token':process.env.VERCEL_OIDC_TOKEN}}:{}));
  return ctx;
}
const settle=page=>page.waitForFunction(()=>!document.documentElement.hasAttribute('data-route-changing'));
try {
  for(const width of [320,390,1440]) {
    const ctx=await context({viewport:{width,height:width<900?844:900},isMobile:width<900,hasTouch:width<900});
    let release,requestArrived;
    let waiting=true;
    const captured=[];
    const arrived=new Promise(resolve=>requestArrived=resolve);
    await ctx.route('**/api/contact',async route=>{
      captured.push(route.request().postDataJSON());requestArrived();
      const response=waiting?await new Promise(resolve=>release=resolve):{status:200,body:{success:true}};
      await route.fulfill({status:response.status,contentType:'application/json',body:JSON.stringify(response.body)});
    });
    const page=await ctx.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/book',{waitUntil:'networkidle'});
    const form=page.getByRole('region',{name:'Send a request'});
    await form.getByRole('textbox',{name:'Name',exact:true}).fill('Journey Audit');
    await form.getByRole('textbox',{name:'Email',exact:true}).fill('journey@example.invalid');
    await form.getByRole('textbox',{name:'What is going on?',exact:true}).fill('Please review example.invalid booking.');
    await form.getByRole('radio',{name:/Website check/}).check();
    await page.waitForURL(base+'/book/check');
    assert.equal(await form.getByRole('textbox',{name:'Name',exact:true}).inputValue(),'Journey Audit');
    assert.equal(await form.getByRole('textbox',{name:'What is going on?',exact:true}).inputValue(),'Please review example.invalid booking.');
    assert.equal(new URL(page.url()).search,'');
    await page.waitForTimeout(650);
    await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(150);
    if(width!==320) await page.screenshot({path:path.join(out,`booking-${width}.png`),fullPage:true});
    const submit=form.locator('button[type="submit"]');
    assert.ok(await form.getByRole('button',{name:'Request the check',exact:true}).isVisible());
    await submit.click();await arrived;
    assert.equal(captured.length,1);
    assert.match(captured[0].message,/Topic: Website check \(\$1,500\)/);
    for(const control of await form.locator('input:not([aria-hidden]),textarea').all()) {
      if(await control.isVisible()) assert.ok(await control.isDisabled(),'Editable fields lock while the captured request sends');
    }
    assert.ok(await submit.evaluate(el=>el===document.activeElement),'Submit retains focus while sending');
    release({status:503,body:{error:'Mock delivery failure'}});
    await page.waitForFunction(()=>!document.querySelector('input[name="name"]').disabled);
    assert.equal(await form.getByRole('textbox',{name:'Name',exact:true}).inputValue(),'Journey Audit');
    assert.ok((await form.innerText()).includes('not sent'));
    await page.reload({waitUntil:'networkidle'});
    assert.ok(await form.getByRole('radio',{name:/Website check/}).isChecked(),'Refresh preserves the topic URL');
    assert.equal(await form.getByRole('textbox',{name:'Name',exact:true}).inputValue(),'','No form data is persisted');
    await form.getByRole('radio',{name:'A 20-minute call',exact:true}).check();
    await page.waitForURL(base+'/book');
    await form.getByRole('textbox',{name:'Name',exact:true}).fill('Journey Audit');
    await form.getByRole('textbox',{name:'Email',exact:true}).fill('journey@example.invalid');
    await form.getByRole('textbox',{name:'What is going on?',exact:true}).fill('A short test request.');
    waiting=false;
    await form.getByRole('button',{name:'Send request',exact:true}).click();
    await form.getByRole('heading',{name:/Thanks/}).waitFor();
    assert.ok(await form.getByRole('heading',{name:/Thanks/}).evaluate(el=>el===document.activeElement));
    if(width!==320) await page.screenshot({path:path.join(out,`sent-${width}.png`)});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    assert.deepEqual(errors,[]);
    pass(`${width}: enquiry layout, topic URL, refresh, pending edit lock, failure recovery and confirmed success`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390,reducedMotion:'reduce',javaScriptEnabled:false});
    const page=await ctx.newPage();await page.goto(base+'/pricing',{waitUntil:'networkidle'});
    for(const id of ['fixes','sprint','website','monthly']) {
      const offer=page.locator(`article#${id}`);
      assert.ok(await offer.getByRole('heading',{level:2}).isVisible());
      assert.equal(await offer.locator('details').count(),1);
      assert.equal(await offer.locator('details').evaluate(el=>el.open),false);
      await page.getByRole('navigation',{name:'Compare offers'}).locator(`a[href="#${id}"]`).click();
      const box=await offer.boundingBox();assert.ok(box.y>=64 && box.y<250,`Offer anchor ${id}: ${box.y}`);
      await offer.locator('summary').click();
      assert.ok(await offer.locator('li').first().isVisible());
      await offer.locator('summary').click();
    }
    assert.match(await page.locator('#monthly').innerText(),/three-month minimum/);
    assert.match(await page.locator('#website').innerText(),/quarter at preview/);
    assert.match(await page.locator('#check').innerText(),/60 days/);
    assert.match(await page.locator('main').innerText(),/Canadian dollars/);
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:path.join(out,`pricing-${width}.png`),fullPage:true});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.goto(base+'/book/check',{waitUntil:'networkidle'});
    assert.ok(await page.locator('noscript a[href^="mailto:"]').isVisible());
    assert.ok(await page.locator('form button[type="submit"]').isDisabled());
    pass(`${width}: native pricing disclosures, visible prices/terms, working anchors and no-JavaScript booking fallback`);
    await ctx.close();
  }
  for(const width of [390,1440]) {
    const ctx=await context({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390});
    await ctx.addInitScript(()=>{
      const start=document.startViewTransition?.bind(document);
      if(!start)return;
      document.startViewTransition=options=>{
        const transition=start(options);
        transition.ready.then(()=>window.__sharedArrival=!!document.querySelector('[data-case-hero][data-shared-case]')).catch(()=>{});
        return transition;
      };
    });
    const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    for(const route of ['/work/tax-relief-counsel','/work/endorphins']) {
      await page.goto(base+route,{waitUntil:'networkidle'});
      const next=page.locator('[data-case-next]');
      const surface=next.locator('[data-case-preview]');
      await surface.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
      assert.equal(await next.locator('button,video').count(),0,'A linked preview has no nested media controls or autoplay');
      const slug=await surface.getAttribute('data-case-preview');
      await page.evaluate(()=>window.__sharedArrival=false);
      await page.screenshot({path:path.join(out,`next-${width}-${slug}.png`)});
      const box=await surface.boundingBox();await page.mouse.click(box.x+box.width*.45,Math.min(box.y+box.height*.3,700));
      await page.waitForURL(base+'/work/'+slug);await settle(page);
      assert.ok(await page.evaluate(()=>window.__sharedArrival),'Next project surface connects to its header');
      assert.equal(await page.locator('[data-shared-case]').count(),0);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
    assert.deepEqual(errors,[]);
    pass(`${width}: next-case handoff into both still and moving headers, with clean transition teardown`);
    await ctx.close();
  }
  const ctx=await context({viewport:{width:1440,height:900}});
  const page=await ctx.newPage();await page.goto(base+'/work/endorphins',{waitUntil:'networkidle'});
  const opener=page.locator('a[data-zoom]').first();
  const full=await opener.getAttribute('href');let fail=true,attempts=0;
  let failedPath=new URL(full,base).pathname;
  await ctx.route('**/*',route=>{
    if(new URL(route.request().url()).pathname===failedPath){attempts++;if(fail)return route.abort();}
    return route.fallback();
  });
  await opener.click();
  const dialog=page.getByRole('dialog');await dialog.waitFor();
  const retry=dialog.getByRole('button',{name:'Retry image',exact:true});await retry.waitFor();
  const oldAttempts=attempts;fail=false;await retry.click();
  await page.waitForFunction(()=>document.querySelector('dialog img[data-ready]'));
  assert.ok(attempts>oldAttempts,'Retry issues a new request for the failed initial image');
  const rail=dialog.getByRole('group',{name:'Choose a screen'});
  assert.ok(await rail.getByRole('button').first().evaluate(el=>el===document.activeElement),'Retry keeps focus on the corresponding screen control');
  failedPath=new URL(await page.locator('a[data-zoom]').nth(1).getAttribute('href'),base).pathname;
  fail=true;await rail.getByRole('button').nth(1).click();await retry.waitFor();
  assert.equal(new URL(await dialog.locator('img[data-ready]').getAttribute('src'),base).pathname,new URL(full,base).pathname,'A failed replacement keeps the current capture visible');
  fail=false;await retry.focus();await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('dialog [aria-current="true"]')?.getAttribute('aria-label')?.startsWith('Screen 2:'));
  assert.ok(await rail.getByRole('button').nth(1).evaluate(el=>el===document.activeElement),'Keyboard retry retains focus through successful replacement');
  const y=await page.evaluate(()=>scrollY);const bounds=await dialog.boundingBox();
  await page.mouse.move(bounds.x+2,bounds.y+bounds.height/2);await page.mouse.wheel(0,400);await page.waitForTimeout(350);
  assert.ok(Math.abs((await page.evaluate(()=>scrollY))-y)<2,'Gallery edge cannot scroll the page behind it');
  await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
  assert.ok(await opener.evaluate(el=>el===document.activeElement));
  await page.mouse.move(100,500);await page.mouse.wheel(0,-200);await page.waitForTimeout(500);
  assert.ok((await page.evaluate(()=>scrollY))<y-20,'Closing restores desktop scrolling');
  pass('Gallery: initial and replacement-image retries, stable keyboard focus, locked background and restored scrolling');
  const latePath=new URL(await page.locator('a[data-zoom]').nth(2).getAttribute('href'),base).pathname;
  let releaseLate,lateStarted;
  const lateArrival=new Promise(resolve=>lateStarted=resolve);
  const held=new Promise(resolve=>releaseLate=resolve);
  await ctx.route('**'+latePath,async route=>{lateStarted();await held;await route.fallback();});
  await opener.click();await rail.getByRole('button').nth(2).click();await lateArrival;
  await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});
  await opener.click();await dialog.waitFor();releaseLate();await page.waitForTimeout(400);
  assert.ok(await dialog.isVisible(),'A previous dialog close cannot dismiss a reopened viewer');
  assert.equal(await rail.getByRole('button').first().getAttribute('aria-current'),'true','A late request cannot replace the newly opened capture');
  await page.keyboard.press('Escape');
  pass('Gallery: reopening while an old image request completes keeps the new session intact');
  await ctx.close();
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally {await browser.close();}
