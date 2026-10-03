async function fetchJson(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow"
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch error for URL:", url);
    console.error(err);
    throw err;
  }
}

async function fetchSample(sampleId) {
  const url = `${window.APP_CONFIG.SAMPLE_API_URL}?action=getSample&sampleId=${encodeURIComponent(sampleId)}`;
  return await fetchJson(url);
}

async function fetchSampleUpdates(sampleId) {
  const url = `${window.APP_CONFIG.SAMPLE_API_URL}?action=getSampleUpdates&sampleId=${encodeURIComponent(sampleId)}`;
  return await fetchJson(url);
}
