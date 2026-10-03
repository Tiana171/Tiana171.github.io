document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loadSampleBtn").addEventListener("click", loadCurrentSample);
  document.getElementById("openKetcherBtn").addEventListener("click", () => {
    window.open(window.APP_CONFIG.KETCHER_URL, "_blank", "width=1200,height=900");
  });

  loadCurrentSample();
});

async function loadCurrentSample() {
  const sampleId = window.APP_CONFIG.DEFAULT_SAMPLE_ID;

  try {
    const sample = await fetchSample(sampleId);
    renderSample(sample);

    const updates = await fetchSampleUpdates(sampleId);
    renderUpdates(updates);
  } catch (err) {
    console.error("Load error:", err);
    alert("Ошибка загрузки. Откройте консоль браузера (F12) и посмотрите детали.");
  }
}

function renderSample(sample) {
  document.getElementById("pageTitle").textContent = `Карточка образца ${sample.sampleId || ""}`;
  document.getElementById("sampleId").textContent = sample.sampleId || "—";
  document.getElementById("shortName").textContent = sample.shortName || "—";
  document.getElementById("fullName").textContent = sample.fullName || "—";
  document.getElementById("formula").textContent = sample.formula || "—";
  document.getElementById("mass").textContent = sample.currentMassMg || "—";
  document.getElementById("responsible").textContent = sample.responsiblePerson || "—";
}

function renderUpdates(items) {
  const box = document.getElementById("updatesList");

  if (!Array.isArray(items) || items.length === 0) {
    box.textContent = "Для этого образца пока нет обновлений.";
    return;
  }

  box.innerHTML = items.map(item => `
    <div class="updates-item">
      <div><strong>${item.updateTitle || "Без названия"}</strong></div>
      <div>${item.updateType || ""}</div>
      <div>${item.textDescription || ""}</div>
      <div>${item.dateOfUpdate || ""}</div>
    </div>
  `).join("");
}