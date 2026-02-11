(function () {
  // Mark current page in the navbar
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });

  // Optional: modlist search filter
  const search = document.getElementById("modSearch");
  const tbody = document.getElementById("tbody");
  if (search && tbody) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const norm = (s) => (s || "").toLowerCase().trim();

    const apply = () => {
      const q = norm(search.value);
      let shown = 0;

      rows.forEach(tr => {
        const text = norm(tr.innerText);
        const ok = !q || text.includes(q);
        tr.style.display = ok ? "" : "none";
        if (ok) shown++;
      });

      const counter = document.getElementById("resultsCount");
      if (counter) counter.textContent = `${shown} shown`;
    };

    search.addEventListener("input", apply);
    apply();
  }
})();