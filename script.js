/* CabinClarity marketing site — script.js
   Purpose: reveal-on-scroll via IntersectionObserver + stagger.
   ~30 lines, zero dependencies. Without JS, .no-js class keeps
   everything visible (progressive enhancement). */

document.documentElement.classList.remove("no-js");

/* Shared footer — single source of truth for every page. To add a data
   source or change attribution, edit FOOTER_CREDIT here; each page carries
   only an empty <footer class="footer" data-footer"></footer> placeholder.
   The year is computed at runtime so it never goes stale. */
(function renderFooter() {
  const FOOTER_CREDIT =
    "Data courtesy of MI EGLE/DNR, MiCorps, MN & WI DNR, MPCA, MDH, USGS, " +
    'UMN LakeBrowser, EPA & <a href="data-sources.html">OpenStreetMap contributors</a>.';

  const footer = document.querySelector("footer.footer[data-footer]");
  if (!footer) return;

  const inSubPage = !document.querySelector("#problem"); // index.html hosts the anchors
  const T = inSubPage ? "index.html" : "";

  footer.innerHTML =
    '<div class="container footer-inner">' +
    '<div class="footer-brand">' +
    '<img src="assets/icon.png" alt="" width="24" height="24" /> Cabin<b>Clarity</b>' +
    "</div>" +
    '<nav aria-label="Footer">' +
    `<a href="${T}#problem">Problem</a>` +
    `<a href="${T}#features">Features</a>` +
    `<a href="${T}#screens">Screenshots</a>` +
    '<a href="data-sources.html">Data sources</a>' +
    '<a href="privacy.html">Privacy policy</a>' +
    '<a href="mailto:hello@cabinclarity.app">Contact</a>' +
    "</nav>" +
    `<small>© ${new Date().getFullYear()} CabinClarity · ${FOOTER_CREDIT}</small>` +
    "</div>";
})();

(function () {
  let els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  els.forEach(function (el) {
    io.observe(el);
  });

  // Stagger siblings inside grids for a choreographed entrance
  [".bento", ".audience-grid", ".shot-grid", ".risk-list"].forEach(
    function (sel) {
      document.querySelectorAll(sel).forEach(function (group) {
        Array.prototype.forEach.call(group.children, function (child, i) {
          child.style.transitionDelay = i * 70 + "ms";
        });
      });
    },
  );
})();
