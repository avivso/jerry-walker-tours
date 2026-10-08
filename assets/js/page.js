/* ============================================================
   Jerry Walker · shared script for the static pages
   (tour pages, About, FAQ, Contact): mobile menu, year,
   and WhatsApp links that name the tour and the referring partner.
   ============================================================ */
(() => {
  "use strict";
  const WA_NUMBER = "972504981145";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();

  // mobile menu
  const burger = $("#navBurger"), nav = $("#mainNav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", false);
    }));
  }

  // WhatsApp message: names the tour (when the page is a tour page) and the partner (if any)
  const tour = document.body.getAttribute("data-tour") || "";
  function waLink() {
    const src = (window.JWRef && JWRef.source("he")) || "האתר";
    const text = tour
      ? `שלום ג'רי! הגעתי דרך ${src} ואשמח לשריין את הסיור "${tour}" ולקבל פרטים ומחירים 🙂`
      : `שלום ג'רי! הגעתי דרך ${src} ואשמח לקבל פרטים ומחירים על סיור בפריז 🙂`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  }
  const apply = () => $$("[data-wa]").forEach((a) => (a.href = waLink()));
  apply();
  if (window.JWRef) JWRef.whenReady(apply);   // refresh once the partner list has loaded
})();
