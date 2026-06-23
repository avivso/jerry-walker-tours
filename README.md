# Jerry Walker — אתר נחיתה / Landing Page

אתר נחיתה דו-לשוני (עברית ראשי + אנגלית) לקידום הסיורים הפרטיים של ג'רי ווקר בפריז.
אתר **סטטי** (HTML/CSS/JS בלבד) — אפשר לארח אותו בכל מקום, ללא שרת וללא build.

A bilingual (Hebrew-first + English) landing page for Jerry Walker's private Paris tours.
Pure static site — host it anywhere, no server or build step.

---

## צפייה מקומית / View locally
```bash
cd jerrywalker-site
python3 -m http.server 8080
# פתחו בדפדפן / open: http://localhost:8080
```

## העלאה לאוויר / Deploy
האתר הוא תיקייה סטטית. כל אחת מהאפשרויות עובדת:
- **Netlify** — גוררים את תיקיית `jerrywalker-site` ל-app.netlify.com/drop (הכי מהיר).
- **Vercel** — `vercel` בתוך התיקייה, או חיבור ל-GitHub.
- **GitHub Pages / Cloudflare Pages** — מעלים את התיקייה כ-repo.

לחיבור הדומיין `jerrywalkertrips.com`: אחרי ההעלאה, מוסיפים את הדומיין בלוח הבקרה של הספק ומכוונים את ה-DNS אליו.

---

## עריכת תוכן / Editing content
כמעט כל הטקסטים והתמונות מנוהלים ממקום אחד: **`assets/js/main.js`**
- `I18N` — טקסטים קבועים (תפריט, כותרות, כפתורים) בעברית + אנגלית.
- `TOURS` — 8 הסיורים בפריז (כותרת, משך, תיאור קצר, תיאור מלא, נקודות עיקריות, תמונה).
- `TRIPS` — טיולי היום מחוץ לעיר.
- `REVIEWS` — המלצות.
- `POSTS` — תקצירי הבלוג.
- `GALLERY` — רשימת תמונות הגלריה.
- פרטי קשר בראש הקובץ: `WA_NUMBER` (וואטסאפ), והקישורים לפייסבוק/אינסטגרם ב-HTML.

תמונות: בתיקייה `assets/img/`. כדי להחליף תמונה — שומרים קובץ באותו שם, או משנים את שם הקובץ ב-`main.js`.

---

## פרטי קשר שבשימוש / Contact details in use
- **WhatsApp / טלפון:** 050-498-1145 (`https://wa.me/972504981145`)
- **אימייל:** jerrywalkertrips@gmail.com
- **Facebook:** https://www.facebook.com/JerryWalkerTrips/
- **Instagram:** https://www.instagram.com/jerrywalkertours/

---

## מה כדאי להשלים / To complete later
1. **תמונות טיולי היום + 3 סיורים** (לורה, טרואה, שאנטיי/אובר, ג'יברני, פר-לשז, עיר האורות והצללים, לה מארה) — כרגע תמונות חופשיות מ-Wikimedia Commons (ראו `IMAGE-CREDITS.md`). מומלץ להחליף בתמונות של ג'רי עצמו כשיש — פשוט שומרים קובץ באותו שם ב-`assets/img/`.
2. **פוסטים לבלוג** — כרגע 3 תקצירים שמקשרים לפייסבוק. אפשר להוסיף את הפוסטים האמיתיים ב-`POSTS`.
3. **לאשר מספר הוואטסאפ** — מבוסס על מספר ישראלי (+972). אם יש מספר צרפתי מועדף, מעדכנים את `WA_NUMBER`.
