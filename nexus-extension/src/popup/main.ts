const extractJobData = (): any => {
  const panel = document.querySelector('[data-test="job-details-panel"]');
  if (!panel) return null;

  const title = panel.querySelector("h2")?.textContent?.trim() || "";
  const description =
    panel.querySelector('[data-test="job-description-text"]')?.textContent?.trim() || "";
  const budget =
    panel.querySelector('[data-test="budget"]')?.textContent?.trim() || "";
  const postedDate =
    panel.querySelector('[data-test="posted-on"]')?.textContent?.trim() || "";
  const location =
    panel.querySelector('[data-test="client-location"]')?.textContent?.trim() || "";

  return {
    title,
    description,
    budget,
    postedDate,
    location,
    url: window.location.href,
  };
};

const observer = new MutationObserver(() => {
  const data = extractJobData();
  if (data) {
    console.log("Scraped Job Data:", data);
    chrome.runtime.sendMessage({ type: "JOB_DATA", data });
  }
});

// Wait for the page to load fully
window.addEventListener("load", () => {
  const target = document.body;
  observer.observe(target, {
    childList: true,
    subtree: true,
  });
});
