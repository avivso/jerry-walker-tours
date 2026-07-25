/* ============================================================
   Jerry Walker · referral tracking
   Remembers where a visitor came from, so the WhatsApp message
   they send names the blog / group that referred them.

   How it works:
     1. A partner sends traffic to  ...?ref=NAME
     2. We store NAME on the device for 30 days.
     3. The WhatsApp message opens with "הגעתי דרך <the partner's name>".

   TO ADD A PARTNER: add one line to SOURCES below, using the same
   code you put in their ?ref= link. A code that is not listed here
   still works, it just shows the code itself instead of a nice name.
   ============================================================ */
window.JWRef = (() => {
  "use strict";
  const KEY = "jw_ref";
  const TTL = 30 * 24 * 60 * 60 * 1000; // 30 days
  const OWN = /(^|\.)jerrywalkertrips\.com$|(^|\.)avivso\.github\.io$|^localhost$|^127\.0\.0\.1$/i;

  /* ?ref=code  ->  how the source is named inside the message */
  const SOURCES = {
    anon:     { he: "אתר ״פרנקופילים אנונימיים״",      en: 'the "Anonymous Francophiles" site' },
    israelim: { he: "קבוצת הפייסבוק ״פריז לישראלים״",  en: 'the "Paris for Israelis" Facebook group' },
  };

  const clean = (s) => String(s || "").trim().replace(/[ -]/g, "").slice(0, 40);
  // the wording shown in the message: plain text only, no line breaks
  const cleanLabel = (s) => String(s || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, 60);

  function save(code, label) {
    try { localStorage.setItem(KEY, JSON.stringify({ r: code, n: label || "", t: Date.now() })); } catch (e) {}
  }

  /* read ?ref= (+ optional &via= wording), otherwise fall back to the referring domain */
  function capture() {
    try {
      const q = new URLSearchParams(location.search);
      const tagged = clean(q.get("ref") || q.get("utm_source"));
      if (tagged) { save(tagged, cleanLabel(q.get("via"))); return tagged; }

      const host = clean((document.referrer || "").split("/")[2] || "").replace(/^www\./i, "");
      if (host && !OWN.test(host) && !get()) { save(host, ""); return host; }
    } catch (e) {}
    return get();
  }

  /* the whole stored record, or null once it has expired */
  function stored() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const o = JSON.parse(raw);
      if (!o || !o.r) return null;
      if (Date.now() - (o.t || 0) > TTL) { localStorage.removeItem(KEY); return null; }
      return o;
    } catch (e) { return null; }
  }

  /* the remembered code, or "" */
  function get() { const o = stored(); return o ? o.r : ""; }

  /* how to name the source inside the message, or "" when there is none.
     wording from the link (&via=) wins, then the built-in list, then the raw code. */
  function source(lang) {
    const o = stored();
    if (!o) return "";
    if (o.n) return o.n;
    const known = SOURCES[String(o.r).toLowerCase()];
    return known ? (known[lang] || known.he) : o.r;
  }

  capture();
  return { capture, get, source, SOURCES };
})();
