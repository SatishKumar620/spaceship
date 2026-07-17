import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Emulate an iPhone 13
  const iPhone = puppeteer.KnownDevices['iPhone 13'];
  await page.emulate(iPhone);

  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Wait for loading screen to disappear
  console.log("Waiting for loading screen to disappear...");
  try {
    await page.waitForSelector('#loadingScreen', { hidden: true, timeout: 10000 });
  } catch(e) {
    console.log("Loading screen wait timed out or element not found, proceeding anyway.");
  }

  const initialScroll = await page.evaluate(() => window.scrollY);
  console.log(`Initial scroll Y: ${initialScroll}`);

  // Simulate a touch scroll (swipe up)
  console.log("Simulating touch scroll...");
  const { width, height } = page.viewport();
  
  // Swipe from bottom-center to top-center
  await page.touchscreen.touchStart(width / 2, height * 0.8);
  await page.touchscreen.touchMove(width / 2, height * 0.5);
  await page.touchscreen.touchMove(width / 2, height * 0.2);
  await page.touchscreen.touchEnd();

  // Wait a bit for scroll to register (Lenis smooth scroll might take a moment)
  await new Promise(r => setTimeout(r, 1500));

  const finalScroll = await page.evaluate(() => window.scrollY);
  console.log(`Final scroll Y: ${finalScroll}`);

  if (finalScroll > initialScroll) {
    console.log("✅ SUCCESS: Touch scroll is working! Page scrolled by " + (finalScroll - initialScroll) + "px");
  } else {
    console.log("❌ FAILED: Touch scroll did NOT move the page.");
  }

  await browser.close();
})();
