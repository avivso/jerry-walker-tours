/* ============================================================
   Jerry Walker · blog engine
   Reads blog/posts.md and turns it into posts.
   Post format (see blog/posts.md): posts separated by a line "===".
   First line = title; optional 2nd line = date (YYYY-MM-DD); then body.
   ============================================================ */
window.JWBlog = (() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const slug = (s, i) => "post-" + (i + 1);

  function bodyToHtml(lines) {
    const blocks = lines.join("\n").split(/\n\s*\n/); // blank line = new paragraph
    return blocks.map((b) => {
      b = b.trim();
      if (!b) return "";
      const img = b.match(/^!\[[^\]]*\]\(([^)]+)\)$/); // ![](url)
      if (img) return `<img src="${esc(img[1])}" alt="" loading="lazy">`;
      return `<p>${esc(b).replace(/\n/g, "<br>")}</p>`;
    }).join("");
  }

  function parse(txt) {
    const chunks = txt.split(/\n=+\n/).map((c) => c.trim()).filter(Boolean);
    const posts = [];
    chunks.forEach((chunk, i) => {
      const lines = chunk.split("\n");
      let title = "", date = "", rest = [];
      let li = 0;
      while (li < lines.length && !lines[li].trim()) li++;
      if (li < lines.length) { title = lines[li].replace(/^#+\s*/, "").trim(); li++; }
      if (li < lines.length && /^(\d{4}-\d{2}-\d{2}|תאריך[:：])/.test(lines[li].trim())) {
        date = lines[li].replace(/^תאריך[:：]\s*/, "").trim(); li++;
      }
      rest = lines.slice(li);
      if (!title) return;
      const plain = rest.join(" ").replace(/!\[[^\]]*\]\([^)]+\)/g, "").replace(/\s+/g, " ").trim();
      posts.push({
        id: slug(title, i), title, date,
        html: bodyToHtml(rest),
        excerpt: plain.length > 130 ? plain.slice(0, 130).trim() + "…" : plain,
      });
    });
    return posts;
  }

  async function load(lang) {
    lang = lang || (localStorage.getItem("jw_lang") || "he");
    const file = lang === "en" ? "blog/posts.en.md" : "blog/posts.md";
    try {
      let r = await fetch(file, { cache: "no-cache" });
      if (!r.ok && file !== "blog/posts.md") r = await fetch("blog/posts.md", { cache: "no-cache" });
      if (!r.ok) return [];
      return parse(await r.text());
    } catch (e) { return []; }
  }

  return { load, parse, esc };
})();
