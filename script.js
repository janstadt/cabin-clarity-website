/* CabinClarity marketing site — script.js
   Purpose: reveal-on-scroll via IntersectionObserver + stagger.
   ~30 lines, zero dependencies. Without JS, .no-js class keeps
   everything visible (progressive enhancement). */

document.documentElement.classList.remove("no-js");

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
