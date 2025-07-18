console.log('[Nexus] Content script loaded');

let started = false;
waitForRootAndObserve();

function waitForRootAndObserve(retries = 10) {
  if (started) return;
  const root = document.querySelector('#layout') || document.body;

  if (!root) {
    if (retries === 0) {
      console.warn('[Nexus] Root container not found after max retries.');
      return;
    }
    console.log(`[Nexus] Root not found, retrying... (${retries})`);
    setTimeout(() => waitForRootAndObserve(retries - 1), 500);
    return;
  }

  started = true;

  new MutationObserver(() => {
    const jobPanel = document.querySelector('[data-test="job-details-panel"]');
    if (jobPanel) {
      try {
        const scraped = scrapeUpworkJob(jobPanel);
        console.log('[Nexus] Scraped job:', scraped);
        // TODO: Send scraped data to backend here
      } catch (err) {
        console.error('[Nexus] Error scraping job panel:', err);
      }
    }
  }).observe(root, { childList: true, subtree: true });

  console.log('[Nexus] MutationObserver started on:', root);
}

function scrapeUpworkJob(t: Element) {
  if (!t) throw new Error('Job panel element is null or undefined');

  const title =
    t.querySelector('h2')?.textContent?.trim() ||
    document.querySelector('h1')?.textContent?.trim() ||
    '';

  const description =
    t.querySelector('[data-test="job-description-text"]')?.textContent?.trim() ||
    t.querySelector('[data-test="description"]')?.textContent?.trim() ||
    '';

  const budget =
    t.querySelector('[data-test="budget"]')?.textContent?.trim() ||
    t.querySelector('[data-test="amount"]')?.textContent?.trim() ||
    '';

  const postedDate =
    t.querySelector('[data-test="posted-on"]')?.textContent?.trim() || '';

  const location =
    t.querySelector('[data-test="client-location"]')?.textContent?.trim() || '';

  return {
    title,
    description,
    budget,
    postedDate,
    location,
    url: window.location.href,
  };
}
