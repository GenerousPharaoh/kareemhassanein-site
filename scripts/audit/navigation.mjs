// Check the distinction between service navigation and case-study filters, plus the footer.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Work/Portfolio/captures-2026-10/_tools/package.json');
const {chromium}=require('playwright-core');
const base=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'http://127.0.0.1:4323';
const out=path.resolve(process.argv.find(a=>a.startsWith('--out='))?.slice(6)||'output/polish/navigation');
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
  for(const width of [320,390,768,960,1440]) {
    const ctx=await context({viewport:{width,height:width<900?844:900},isMobile:width<900,hasTouch:width<900,reducedMotion:'reduce'});
    await ctx.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.__copied=text;}}}));
    const page=await ctx.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/about',{waitUntil:'networkidle'});
    const header=page.locator('body > header');
    if(width<960) {
      await header.getByRole('button',{name:'Open menu'}).click();
      const menu=page.getByRole('navigation',{name:'Menu',exact:true});
      assert.ok(await menu.getByRole('link',{name:'Case studies',exact:true}).isVisible());
      const firms=menu.getByRole('link',{name:'For law firms Websites, intake and ads'});
      assert.ok(await firms.isVisible());
      if(width===390) await page.screenshot({path:path.join(out,'menu-phone.png')});
      await page.keyboard.press('Escape');
      assert.equal(await header.getByRole('button',{name:'Open menu'}).evaluate(el=>el===document.activeElement),true);
      await header.getByRole('button',{name:'Open menu'}).click();
      await firms.click();
      await page.waitForURL(base+'/firms');
      await page.waitForFunction(()=>!document.querySelector('#main').hasAttribute('inert'));
      await header.getByRole('button',{name:'Open menu'}).click();
      assert.equal(await menu.getByRole('link',{name:'For law firms Websites, intake and ads'}).getAttribute('aria-current'),'page');
      await menu.getByRole('link',{name:'Case studies',exact:true}).click();
    } else {
      const summary=header.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      assert.ok(await header.locator('details').evaluate(el=>el.open));
      if(width===1440) await page.screenshot({path:path.join(out,'services-desktop.png')});
      await page.keyboard.press('Escape');
      assert.equal(await header.locator('details').evaluate(el=>el.open),false);
      assert.equal(await summary.evaluate(el=>el===document.activeElement),true);
      await summary.click();
      await page.locator('h1').click();
      assert.equal(await header.locator('details').evaluate(el=>el.open),false);
      await summary.click();
      await header.getByRole('link',{name:'For clinics Websites, booking and ads'}).click();
      await page.waitForURL(base+'/clinics');
      await page.waitForFunction(()=>!document.querySelector('header details').open);
      assert.equal(await summary.getAttribute('data-active'),'true');
      await header.getByRole('link',{name:'Case studies',exact:true}).click();
    }
    await page.waitForURL(base+'/work');
    await page.getByRole('heading',{name:'Case studies',exact:true}).waitFor();
    const filters=page.getByRole('group',{name:'Filter case studies'});
    for(const [name,count] of [['Law firms',1],['Clinics',3],['Other projects',3],['All cases',7]]) {
      await filters.getByRole('button',{name,exact:true}).click();
      assert.equal(await page.locator('[data-sectors]:visible').count(),count,name);
      assert.equal(new URL(page.url()).pathname,'/work','Filters stay on the case-study page');
      const box=await filters.getByRole('button',{name,exact:true}).boundingBox();
      assert.ok(box.x>=0 && box.x+box.width<=width+1,'All filters remain within the screen');
    }
    if(width===390||width===1440) { await filters.scrollIntoViewIfNeeded(); await page.screenshot({path:path.join(out,`filters-${width}.png`)}); }
    const footer=page.locator('body > footer');
    await footer.scrollIntoViewIfNeeded();
    assert.ok(!(await footer.innerText()).includes('Every account stays in your name'));
    assert.equal(await footer.getByRole('navigation').count(),3);
    const copy=footer.getByRole('button',{name:'Copy',exact:true});
    await copy.click();
    await footer.getByRole('button',{name:'Copied',exact:true}).waitFor();
    assert.equal(await page.evaluate(()=>window.__copied),'kareem.hassanein@gmail.com');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    if(width===390||width===1440) await footer.screenshot({path:path.join(out,`footer-${width}.png`)});
    await footer.getByRole('link',{name:'Back to top',exact:true}).click();
    await page.waitForFunction(()=>scrollY<5);
    assert.deepEqual(errors,[]);
    pass(`${width}: service navigation, local filters, footer copy and back to top`);
    await ctx.close();
  }
  const ctx=await context({viewport:{width:1440,height:900},javaScriptEnabled:false});
  const page=await ctx.newPage();
  await page.goto(base+'/about',{waitUntil:'networkidle'});
  await page.locator('header summary').click();
  await page.locator('header').getByRole('link',{name:'For law firms Websites, intake and ads'}).click();
  await page.waitForURL(base+'/firms');
  await page.locator('footer').getByRole('link',{name:'Case studies',exact:true}).click();
  await page.waitForURL(base+'/work');
  assert.equal(await page.locator('[data-sectors]:visible').count(),7);
  pass('No JavaScript: native Services dropdown, footer links and all case studies');
  await ctx.close();
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,checks},null,2));
} finally { await browser.close(); }
