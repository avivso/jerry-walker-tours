/* ============================================================
   Jerry Walker · Private Paris Tours · main.js
   Bilingual (HE primary / EN) content + interactions
   ============================================================ */
(() => {
  "use strict";

  /* ---------- contact constants ---------- */
  const WA_NUMBER = "972504981145"; // 050-498-1145
  const WA_TEXT = {
    he: "שלום ג'רי! הגעתי דרך האתר ואשמח לקבל פרטים ומחירים על סיור בפריז 🙂",
    en: "Hi Jerry! I found you through your website and would love details and pricing for a Paris tour 🙂",
  };
  const waHref = (lang) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT[lang])}`;

  /* ---------- static UI strings ---------- */
  const I18N = {
    he: {
      "nav.tours": "סיורים בפריז", "nav.daytrips": "טיולי יום", "nav.gallery": "גלריה",
      "nav.blog": "בלוג", "nav.about": "אודות", "nav.contact": "צור קשר",
      "cta.whatsapp": "שריינו סיור בוואטסאפ",
      "hero.eyebrow": "מדריך אקדמאי מוסמך · סיורים פרטיים",
      "hero.title": "פריז, בעיניים של מספר סיפורים",
      "hero.sub": "סיורים פרטיים מודרכים בעברית, אנגלית וצרפתית. היסטוריה, אמנות וסיפורים, באווירה אישית ומשעשעת.",
      "hero.explore": "גלו את הסיורים",
      "intro.lead": "לא עוד טיול עם המון. סיור פרטי, אישי ומעמיק, שנבנה סביבכם, סביב הקצב והסקרנות שלכם, ומלא בסיפורים שלא תשמעו בשום מקום אחר.",
      "tours.kicker": "סיורים פרטיים ברחבי פריז", "tours.title": "סיורי עומק בלב פריז",
      "tours.sub": "סיורים פרטיים ואיכותיים במיוחד. בחרו את הסיפור שמדבר אליכם, ואני אבנה סביבו את היום שלכם.",
      "trips.kicker": "טיולי יום פרטיים מחוץ לעיר", "trips.title": "מעבר לפריז",
      "trips.sub": "טיולי יום פרטיים ומודרכים בעברית אל היעדים הקסומים שמסביב לעיר ובצפון צרפת.",
      "about.kicker": "נעים להכיר, ג'רי", "about.title": "מדריך, חוקר ומספר סיפורים",
      "about.p1": "מדריך אקדמאי מוסמך ומנוסה, מאוהב בפריז ובסיפורים שהיא מסתירה מאחורי כל פינה. בכל סיור אני משלב היסטוריה, אמנות ותרבות עם אנקדוטות מפתיעות והרבה הומור, כדי שתחזרו הביתה לא רק עם תמונות, אלא עם חוויה ועם הבנה אמיתית של העיר.",
      "about.p2": "אני מדריך סיורים פרטיים בלבד, לקבוצות של 1 עד 12 מטיילים. איני מארגן קבוצות. הסיור הוא שלכם, בקצב שלכם.",
      "about.cta": "דברו איתי בוואטסאפ", "about.badgeNum": "1-12", "about.badgeLabel": "מטיילים · פרטי בלבד",
      "reviews.kicker": "מטיילים מספרים", "reviews.title": "מה אומרים אחרי הסיור",
      "gallery.kicker": "תמונות מסיורים", "gallery.title": "רגעים מהשטח",
      "blog.kicker": "בלוג · כתבות · פוסטים", "blog.title": "סיפורים מפריז",
      "blog.sub": "קטעים, סיפורים וטיפים שכתבתי על פריז לאורך השנה.",
      "blog.more": "לכל הכתבות בבלוג",
      "blog.empty": "הכתבות בדרך. בקרוב יעלו כאן הסיפורים שכתבתי על פריז.",
      "contact.kicker": "בואו נתכנן את פריז שלכם", "contact.title": "מוכנים לצאת לדרך?",
      "contact.sub": "כתבו לי בוואטסאפ, בטלפון, במייל או בפייסבוק/אינסטגרם, ואחזור אליכם עם כל הפרטים והמחירים, ונתאים יחד את הסיור המושלם עבורכם.",
      "contact.phone": "טלפון", "contact.email": "אימייל",
      "contact.cardTitle": "קבלת מידע ומחירים",
      "contact.cardText": "המחירים נקבעים לפי הסיור והרכב המטיילים. הדרך המהירה לקבל הצעה היא הודעת וואטסאפ. אני בדרך כלל זמין ועונה מהר.",
      "footer.tag": "סיורים פרטיים מודרכים בעברית · פריז וסביבתה",
      "ui.more": "לפרטים נוספים", "ui.book": "לשריון הסיור בוואטסאפ",
      "ui.highlights": "מה רואים בסיור", "ui.readmore": "להמשך קריאה",
    },
    en: {
      "nav.tours": "Paris Tours", "nav.daytrips": "Day Trips", "nav.gallery": "Gallery",
      "nav.blog": "Blog", "nav.about": "About", "nav.contact": "Contact",
      "cta.whatsapp": "Book on WhatsApp",
      "hero.eyebrow": "Certified academic guide · Private tours",
      "hero.title": "Paris, through a storyteller's eyes",
      "hero.sub": "Private guided tours in Hebrew, English & French. History, art and stories, with a personal, witty touch.",
      "hero.explore": "Explore the tours",
      "intro.lead": "Not another tour with the crowd. A private, personal, in-depth experience, built around you, your pace and your curiosity, and full of stories you won't hear anywhere else.",
      "tours.kicker": "Private tours across Paris", "tours.title": "In-depth tours in the heart of Paris",
      "tours.sub": "Exceptionally rich private tours. Pick the story that speaks to you, and I'll build your day around it.",
      "trips.kicker": "Private day trips beyond the city", "trips.title": "Beyond Paris",
      "trips.sub": "Private guided day trips in Hebrew to the most magical destinations around the capital and across northern France.",
      "about.kicker": "Meet Jerry", "about.title": "A guide, a researcher, a storyteller",
      "about.p1": "A certified, experienced academic guide, in love with Paris and the stories it hides around every corner. On every tour I weave history, art and culture together with surprising anecdotes and plenty of humour, so you go home not just with photos, but with a real understanding of the city.",
      "about.p2": "I guide private tours only, for groups of 1 to 12 travellers. I don't run mixed groups. The tour is yours, at your pace.",
      "about.cta": "Message me on WhatsApp", "about.badgeNum": "1-12", "about.badgeLabel": "travellers · private only",
      "reviews.kicker": "Travellers' words", "reviews.title": "What guests say afterwards",
      "gallery.kicker": "Photos from the tours", "gallery.title": "Moments on the ground",
      "blog.kicker": "Blog · Articles · Posts", "blog.title": "Stories from Paris",
      "blog.sub": "Notes, stories and tips I've written about Paris over the year.",
      "blog.more": "Read the blog",
      "blog.empty": "Posts are on the way. My Paris stories will appear here soon.",
      "contact.kicker": "Let's plan your Paris", "contact.title": "Ready to set out?",
      "contact.sub": "Reach me on WhatsApp, by phone, email or Facebook/Instagram, and I'll get back to you with all the details and pricing, and together we'll shape the perfect tour for you.",
      "contact.phone": "Phone", "contact.email": "Email",
      "contact.cardTitle": "Get details & pricing",
      "contact.cardText": "Prices depend on the tour and your group. The fastest way to a quote is a WhatsApp message. I'm usually available and reply quickly.",
      "footer.tag": "Private guided tours in Hebrew · Paris & beyond",
      "ui.more": "Learn more", "ui.book": "Book this tour on WhatsApp",
      "ui.highlights": "On this tour", "ui.readmore": "Read more",
    },
  };

  /* ---------- value props ---------- */
  const VALUES = [
    { ico: "M12 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z",
      he: { t: "סיורים פרטיים בלבד", d: "רק אתם והמדריך, 1 עד 12 מטיילים" },
      en: { t: "Private tours only", d: "Just you and the guide, 1 to 12 travellers" } },
    { ico: "M12 3 1 9l4 2.2V17l7 4 7-4v-5.8l2-1.1V17h2V9L12 3zm6.8 6L12 12.7 5.2 9 12 5.3 18.8 9zM17 15.6l-5 2.9-5-2.9v-3.3l5 2.7 5-2.7v3.3z",
      he: { t: "מדריך אקדמאי מוסמך", d: "ידע עמוק ומסירה מרתקת" },
      en: { t: "Certified academic guide", d: "Deep knowledge, captivating delivery" } },
    { ico: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 9h-3a15.9 15.9 0 0 0-1.3-5.7A8 8 0 0 1 18.9 11zM12 4c.9 1.3 1.7 3.4 1.9 7h-3.8c.2-3.6 1-5.7 1.9-7zM4.3 13h3a15.9 15.9 0 0 0 1.3 5.7A8 8 0 0 1 4.3 13zm3-2h-3a8 8 0 0 1 4.3-5.7A15.9 15.9 0 0 0 7.3 11zM12 20c-.9-1.3-1.7-3.4-1.9-7h3.8c-.2 3.6-1 5.7-1.9 7zm2.6-1.3A15.9 15.9 0 0 0 15.9 13h3a8 8 0 0 1-4.3 5.7z",
      he: { t: "עברית · אנגלית · צרפתית", d: "כל הסיורים זמינים בשלוש השפות" },
      en: { t: "Hebrew · English · French", d: "Every tour, in all three languages" } },
    { ico: "M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z",
      he: { t: "גמיש ומותאם אישית", d: "הקצב והדגשים נקבעים לפיכם" },
      en: { t: "Flexible & tailored", d: "The pace and focus are yours" } },
  ];

  /* ---------- tours ---------- */
  const TOURS = [
    {
      img: "tour-classic.jpg", poster: "poster-intro.jpg",
      he: { dur: "כ-4 שעות", title: "סיור היכרות מקיף בפריז",
        short: "סיור לאורך גדות הסן בין אתרי החובה של פריז: נוטרדם, הפונט נף, הלובר וגני הטווילרי. עשיר בסיפורים, באווירה נעימה ומשעשעת.",
        long: "הדרך היעילה והנעימה ביותר להכיר את פריז וליפול בקסמה. סיור לאורך גדות נהר הסן, העובר במגוון אתרי החובה ומעניק לכם הבנה של הרקע ההיסטורי, התרבותי והיומיומי של העיר, והכל באווירה נינוחה ומשעשעת. כולל הפסקת קפה באמצע.",
        hl: ["גשר סן מישל והרובע הלטיני", "כנסיית נוטרדם ופאלה דה-ז'וסטיס", "הפונט נף וגשר האמנויות (“המנעולים”)", "החצר המרובעת והפירמידה בלובר", "שער הקרוסל, גני הטווילרי וכיכר הקונקורד"] },
      en: { dur: "≈ 4 hours", title: "The Ultimate Classic Intro",
        short: "A walk along the Seine through Paris's must-sees: Notre-Dame, Pont Neuf, the Louvre and the Tuileries. Rich in stories, with a relaxed, witty mood.",
        long: "The most efficient and enjoyable way to fall in love with Paris. A walk along the banks of the Seine through the city's iconic sites, giving you the historical, cultural and everyday background of Paris, all in a relaxed, entertaining atmosphere. Includes a coffee break.",
        hl: ["Saint-Michel bridge & the Latin Quarter", "Notre-Dame Cathedral & the Palais de Justice", "Pont Neuf & the Pont des Arts (the “love-locks”)", "The Louvre's Cour Carrée & glass pyramid", "Carrousel arch, Tuileries Gardens & Place de la Concorde"] },
    },
    {
      img: "tour-revolution.jpg", poster: "poster-revolution.jpg",
      he: { dur: "כ-3 שעות · כולל מטרו והפסקה", title: "בעקבות המהפכה הצרפתית ונפוליאון",
        short: "חובה לחובבי היסטוריה. נפסע בין התחנות שעיצבו את המהפכה וסימנו את עלייתו של נפוליאון בונפרטה.",
        long: "סיור חובה לחובבי היסטוריה. נפסע בין מספר תחנות שעיצבו את המהפכה הצרפתית וסימנו את עלייתו של נפוליאון. בסופו תבינו לעומק את ה-DNA של המהפכה ואת דמותו המורכבת של נפוליאון, הרבה מעבר למה שידעתם.",
        hl: ["בתי המהפכנים ז'ורז' דנטון וז'אן-פול מארה", "בית הקפה העתיק בעולם שאירח גם את נפוליאון", "הקונסיירג'רי והפאלה רויאל", "כיכר הקונקורד ומקומה של הגיליוטינה", "נסיעת מטרו אחת והפסקת קפה"] },
      en: { dur: "≈ 3 hours · incl. metro & break", title: "French Revolution & Napoleon",
        short: "A must for history lovers. We trace the stations that shaped the Revolution and marked Napoleon Bonaparte's rise.",
        long: "A must for history lovers. A narrative journey through the stations that shaped the French Revolution and marked Napoleon's rise. By the end you'll truly grasp the DNA of the Revolution and Napoleon's complex character, far better than you ever knew.",
        hl: ["Homes of revolutionaries Danton & Marat", "The oldest café in the world, which hosted Napoleon", "The Conciergerie & the Palais-Royal", "Place de la Concorde & the site of the guillotine", "One metro ride & a coffee break"] },
    },
    {
      img: "tour-montmartre.jpg", poster: "poster-montmartre.jpg",
      he: { dur: "כ-3 שעות", title: "סיור ברובע מונמרטר",
        short: "טיפוס סוחף ברחובות המתפתלים של מונמרטר עד בזיליקת הלב הקדוש, בעקבות אמנים, אהבות והמולן רוז'.",
        long: "סיור סוחף ומרגש במעלה הגבעה הנישאה מונמרטר, עד הנקודה הגבוהה בפריז, בזיליקת הלב הקדוש (Sacré-Cœur). רחובות פסטורליים וססגוניים, רומנטיקה וסיפורי אמנים גדולים. * סיור זה כולל הליכה במעלה הגבעה.",
        hl: ["צילומים ליד המולן רוז'", "אתרים מתוך הסרט “אמלי”", "סיפורי פיקאסו, מודיליאני וואן גוך", "בזיליקת הלב הקדוש (Sacré-Cœur)", "אווירה אינסטגרמית ברחובות הגבעה"] },
      en: { dur: "≈ 3 hours", title: "Bohemian Montmartre",
        short: "An evocative climb through Montmartre's winding lanes to Sacré-Cœur, in the footsteps of artists, loves and the Moulin Rouge.",
        long: "A moving, evocative climb up Montmartre's hill to the highest point in Paris, the Basilica of Sacré-Cœur. Picturesque, colourful streets, romance and the stories of great artists. * This tour involves walking uphill.",
        hl: ["Photo stop at the Moulin Rouge", "Locations from the film “Amélie”", "The stories of Picasso, Modigliani & Van Gogh", "The Basilica of Sacré-Cœur", "An Instagram-worthy atmosphere on the hill"] },
    },
    {
      img: "tour-center.jpg",
      he: { dur: "כ-3 שעות", title: "מרכז העיר, הרבעים 7 ו-8",
        short: "משער הניצחון, לאורך השאנז אליזה, אל התצפית היפה על האייפל וגשר היפה בפריז, ועד כיכר הקונקורד.",
        long: "סיור מהנה במרכז העיר. מתחילים ברחבת שער הניצחון וההיסטוריה המדהימה שלו, ממשיכים לאורך השדרה המפורסמת בעולם, ומגיעים אל כמה מהנקודות היפות ביותר בפריז.",
        hl: ["שער הניצחון וההיסטוריה שלו", "שדרות השאנז אליזה והפטיט פאלה", "התצפית היפה על האייפל בטרוקדרו", "הגשר היפה ביותר בפריז", "כיכר הקונקורד ואזור הגנים"] },
      en: { dur: "≈ 3 hours", title: "Heart of the City, the 7th & 8th",
        short: "From the Arc de Triomphe, down the Champs-Élysées, to the finest view of the Eiffel Tower and the prettiest bridge in Paris, ending at Concorde.",
        long: "An enjoyable tour through the heart of the city. We begin at the Arc de Triomphe and its astonishing history, stroll the world's most famous avenue, and reach some of the most beautiful spots in Paris.",
        hl: ["The Arc de Triomphe & its history", "The Champs-Élysées & the Petit Palais", "The finest Eiffel Tower viewpoint at Trocadéro", "The prettiest bridge in Paris", "Place de la Concorde & the gardens"] },
    },
    {
      img: "tour-perelachaise.jpg", poster: "poster-perelachaise.jpg",
      he: { dur: "כ-3 שעות", title: "בית הקברות פר לשז",
        short: "סיור מרתק ומקורי בבית הקברות האיקוני בעולם. סיפורים מפתיעים, מצבות מעוצבות ונופים מהממים. אולי הסיור הטוב שלי.",
        long: "סיור מרתק, מקורי ויחודי בבית הקברות המפורסם בעולם. בין המצבות המעוצבות והנופים המהממים נשמע סיפורים שלא תשכחו. אולי הסיור הטוב ביותר שלי.",
        hl: ["שופן, ביזה, וזמרת בארים שעלתה לגדולה", "אליל רוק אמריקאי אגדי", "מפענח כתב ההירוגליפים וכורה תעלת סואץ", "מרגל קג״ב שטמון כאן, וסיפור חיסול מבצעי", "זמרים מפורסמים ופוליטיקאים “שובבים”"] },
      en: { dur: "≈ 3 hours", title: "Père-Lachaise Cemetery",
        short: "A fascinating, original tour of the world's most iconic cemetery: surprising tales, sculpted graves and stunning scenery. Perhaps my very best tour.",
        long: "A fascinating, original and unique tour of the world's most famous cemetery. Among the sculpted graves and stunning scenery we'll hear stories you won't forget. Perhaps my very best tour.",
        hl: ["Chopin, Bizet & a cabaret singer who became a legend", "A legendary American rock idol", "The decipherer of hieroglyphs & the builder of Suez", "A KGB spy buried here & a covert assassination", "Famous singers & scandalous politicians"] },
    },
    {
      img: "tour-louvre.jpg",
      he: { dur: "שעתיים / 3 / 4-5 שעות", title: "סיור פרטי מודרך במוזיאון הלובר",
        short: "סיור איכותי ואינטימי (1-4 משתתפים) ביצירות הגדולות של המוזיאון החשוב בעולם, בלי ללכת לאיבוד. בשלוש גרסאות.",
        long: "סיור המכסה את היצירות הגדולות והמוצגים היפים במיוחד, למי שרוצים להפיק את המירב מהביקור במוזיאון הגדול בעולם, מבלי ללכת לאיבוד. מיועד ל-1-4 משתתפים בלבד, להדרכה אישית ואינטימית. ההמלצה שלי: דווקא משום שהלובר גדול ומבלבל, מסלול 3 השעות עם הפסקה קצרה נעים ורגוע יותר.",
        hl: ["“Highlights”, שעתיים: מונה ליזה, ונוס, סאמותרקי ועוד", "“Classic Louvre”, כ-3 שעות: מסלול מורחב", "“Signature Louvre”, 4-5 שעות: מעל 20 יצירות מפתח", "1-4 משתתפים בלבד, הדרכה אישית", "ההמלצה שלי: מסלול 3 השעות"] },
      en: { dur: "2 / 3 / 4-5 hours", title: "The Louvre: Private Guided Visit",
        short: "A high-quality, intimate visit (1-4 guests) to the masterpieces of the world's greatest museum, without getting lost. In three versions.",
        long: "A visit covering the great masterpieces and most beautiful exhibits, for those who want to make the most of the world's greatest museum, without getting lost. For 1-4 guests only, for personal, intimate guiding. My recommendation: precisely because the Louvre is vast and confusing, the 3-hour route with a short break feels calmer and more enjoyable.",
        hl: ["“Highlights”, 2 hrs: Mona Lisa, Venus, Samothrace & more", "“Classic Louvre”, ≈ 3 hrs: extended route", "“Signature Louvre”, 4-5 hrs: 20+ key works", "1-4 guests only, personal guiding", "My recommendation: the 3-hour route"] },
    },
    {
      img: "tour-shadows.jpg", poster: "poster-shadows.jpg",
      he: { dur: "כ-3 שעות", title: "פריז: עיר האורות והצללים",
        short: "מסע רגלי מקורי בעקבות פרשיות ריגול, חיסולים וסודות ביטחוניים ברחובות העיר היפה בעולם.",
        long: "סיור רגלי מרתק ומקורי, בעקבות פרשיות ריגול ופרשיות ביטחוניות שהתרחשו ברחובותיה של פריז. סיפורי ביון אמיתיים, מסתורין וצללים שלא תשמעו באף סיור אחר.",
        hl: ["פרשיות ריגול אמיתיות", "חיסולים וסודות ביטחוניים", "הצד הנסתר של העיר היפה בעולם", "מסע רגלי מקורי וייחודי"] },
      en: { dur: "≈ 3 hours", title: "Paris: City of Lights & Shadows",
        short: "An original walking journey through espionage affairs, covert assassinations and security secrets on the streets of the world's most beautiful city.",
        long: "A fascinating, original walking tour following espionage and security affairs that unfolded on the streets of Paris. True spy stories, mystery and shadows you won't hear on any other tour.",
        hl: ["Real-life espionage affairs", "Covert assassinations & security secrets", "The hidden side of the world's most beautiful city", "An original, one-of-a-kind walking journey"] },
    },
    {
      img: "tour-marais.jpg", poster: "poster-marais.jpg",
      he: { dur: "כ-3 שעות", title: "הרובע היהודי: לה מארה",
        short: "צלילה אל הזהות והזיכרון ברובע המארה ההיסטורי: סיפורם של אבירי הטמפלרים ושל יהדות פריז. ופלאפל חם כלול!",
        long: "סיור עומק ברובע המארה הציורי, בין סמטאות מימי הביניים, בתי קפה ובוטיקים. נכיר את ההיסטוריה של אבירי הטמפלרים ואת סיפורה של הקהילה היהודית בפריז: זהות, זיכרון וחיים. ולא נצא בלי פלאפל חם ברחוב דה רוזיֶה.",
        hl: ["סמטאות מימי הביניים וכיכר הווז'", "ההיסטוריה של אבירי הטמפלרים", "סיפורה של יהדות פריז לאורך הדורות", "רחוב דה רוזיֶה, לב הרובע", "פלאפל חם כלול בסיור"] },
      en: { dur: "≈ 3 hours", title: "Le Marais: Jewish Paris",
        short: "A deep dive into identity and memory in the historic Marais: the story of the Templar knights and of Jewish Paris. A hot falafel is included!",
        long: "An in-depth tour of the picturesque Marais, through medieval lanes, cafés and boutiques. We'll discover the history of the Templar knights and the story of the Jewish community in Paris: identity, memory and life. And we won't leave without a hot falafel on Rue des Rosiers.",
        hl: ["Medieval lanes & the Place des Vosges", "The history of the Templar knights", "The story of Jewish Paris through the ages", "Rue des Rosiers, the heart of the quarter", "A hot falafel included"] },
    },
  ];

  const TOURS_NOTE = {
    he: [
      { ico: "M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-1 7h2c1.1 0 2 .9 2 2v5h-1v5h-4v-5H9v-5c0-1.1.9-2 2-2z",
        t: "כל הסיורים, למעט מונמרטר, נגישים ומתאימים גם למתקשים בהליכה." },
      { ico: "M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h7v-2.5c0-.8.3-1.5.8-2.2C7.3 13.1 7.6 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.9 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z",
        t: "סיורים פרטיים בלבד, 1-12 מטיילים. איני מארגן קבוצות, הסיור כולו שלכם." },
    ],
    en: [
      { ico: "M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-1 7h2c1.1 0 2 .9 2 2v5h-1v5h-4v-5H9v-5c0-1.1.9-2 2-2z",
        t: "All tours, except Montmartre, are accessible and suitable for those who find walking difficult." },
      { ico: "M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.3 0-7 1.2-7 3.5V19h7v-2.5c0-.8.3-1.5.8-2.2C7.3 13.1 7.6 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.9 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z",
        t: "Private tours only, 1-12 travellers. I don't run groups, the tour is entirely yours." },
    ],
  };

  /* ---------- day trips ---------- */
  const ICON_CASTLE = "M4 21V10l2-1V6h2v2l2-1V6h2v2l2-1V6h2v3l2 1v11h-5v-4a3 3 0 0 0-6 0v4H4z";
  const ICON_PALETTE = "M12 3a9 9 0 0 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.3-9-7.3zM6.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z";
  const ICON_STAR = "M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3zm0 4.3 1.7 3.5 3.8.5-2.8 2.7.7 3.8L12 19l-3.4 1.8.7-3.8-2.8-2.7 3.8-.5L12 6.3z";
  const ICON_FLOWER = "M12 22c4.5 0 8-2 8-6 0-1.6-.9-3-2.2-3.8C18.5 11.5 19 10.3 19 9a3 3 0 0 0-5-2.2A3 3 0 0 0 9 9c0 1.3.5 2.5 1.2 3.2C8.9 13 8 14.4 8 16c0 .8.2 1.5.5 2.1C5.9 18 4 19.6 4 22h8zm0-9a2 2 0 1 1 0-4 2 2 0 0 1 0 4z";

  const TRIPS = [
    { img: "trip-normandy.jpg", size: "lg",
      he: { tag: "נורמנדי", title: "נורמנדי: אונפלור וצוקי אטרטה",
        d: "יום מלא בחופי נורמנדי: העיירה הציורית אונפלור ונמלה העתיק, וצוקי הגיר המרהיבים של אטרטה. נופים, אמנות ואוויר ים." },
      en: { tag: "Normandy", title: "Normandy: Honfleur & the Étretat Cliffs",
        d: "A full day on the Normandy coast: the picturesque town of Honfleur with its ancient harbour, and the dramatic chalk cliffs of Étretat. Landscapes, art and sea air." } },
    { img: "trip-loire.jpg", size: "lg", icon: ICON_CASTLE,
      he: { tag: "עמק הלואר", title: "טירות עמק הלואר",
        d: "מסע אל עמק הלואר, ארץ הטירות והארמונות של מלכי צרפת. אדריכלות מהאגדות, גנים מטופחים וטעמים מקומיים." },
      en: { tag: "Loire Valley", title: "Châteaux of the Loire Valley",
        d: "A journey to the Loire Valley, the land of the châteaux of the kings of France. Fairy-tale architecture, manicured gardens and local flavours." } },
    { img: "trip-troyes.jpg", size: "sm", icon: ICON_STAR,
      he: { tag: "מורשת יהודית", title: "טרואה ובית רש״י",
        d: "העיר טרואה היפהפייה ומרכזה מימי הביניים, ובלבה אתר עלייה לרגל יהודי: בית הכנסת ומרכז המורשת של רש״י." },
      en: { tag: "Jewish heritage", title: "Troyes & Rashi's House",
        d: "The beautiful medieval town of Troyes, home to a Jewish pilgrimage site: the synagogue and heritage centre of Rashi, the great commentator." } },
    { img: "trip-chantilly.jpg", size: "sm", icon: ICON_PALETTE,
      he: { tag: "אמנות", title: "שאנטיי ואובר: ואן גוך",
        d: "טירת שאנטיי המפוארת ואוסף האמנות שלה, והכפר Auvers-sur-Oise, ביתו האחרון של ואן גוך, השדות שצייר וקברו." },
      en: { tag: "Art", title: "Chantilly & Auvers: Van Gogh",
        d: "The magnificent Château de Chantilly and its art collection, and the village of Auvers-sur-Oise, Van Gogh's final home, the fields he painted and his grave." } },
    { img: "trip-giverny.jpg", size: "sm", icon: ICON_FLOWER,
      he: { tag: "גנים", title: "ג'יברני: ביתו של מונה",
        d: "ג'יברני, ביתו וגנו של קלוד מונה, בריכת חבצלות המים והגשר היפני שהיו השראה לציוריו המפורסמים." },
      en: { tag: "Gardens", title: "Giverny: Monet's House",
        d: "Giverny, Claude Monet's house and garden, the water-lily pond and the Japanese bridge that inspired his most famous paintings." } },
  ];

  /* ---------- testimonials ---------- */
  const REVIEWS = [
    { he: { q: "תודה רבה על הסיור המעניין, מאוד נהנינו.", n: "לילי ז'" },
      en: { q: "Thank you so much for the fascinating tour, we truly enjoyed it.", n: "Lily Z." } },
    { he: { q: "תודה על הסיור המאלף היום! העברת לנו חוויה שלא נשכח.", n: "אמיר ס'" },
      en: { q: "Thank you for today's truly enlightening tour! An experience we won't forget.", n: "Amir S." } },
    { he: { q: "הסיור בהדרכתך היה כניסה מושלמת לפריז. העברת לנו בדרך נעימה ומשעשעת ידע רב ומרשים. אתה מקצוען אמיתי. הרגשנו את ההשקעה ושאתה עושה זאת מכל הלב. נמליץ בחום לכל מכרינו.", n: "נדב ומיכל" },
      en: { q: "Your tour was the perfect introduction to Paris. You shared impressive knowledge in a warm and entertaining way. You're a true professional. We felt the dedication and that you do this with all your heart. We'll warmly recommend you to everyone.", n: "Nadav & Michal" } },
  ];

  /* ---------- blog teasers ---------- */
  const POSTS = [
    { img: "tour-classic.jpg", link: "https://www.facebook.com/JerryWalkerTrips/",
      he: { cat: "היסטוריה", t: "נוטרדם: מה שלא סיפרו לכם", e: "הסיפורים, הסמלים והסודות שמסתתרים בקתדרלה המפורסמת בעולם." },
      en: { cat: "History", t: "Notre-Dame: what they never told you", e: "The stories, symbols and secrets hidden in the world's most famous cathedral." } },
    { img: "gal-09.jpg", link: "https://www.facebook.com/JerryWalkerTrips/",
      he: { cat: "תרבות", t: "בית קפה פריזאי: מדריך קצר", e: "איך לשבת, מה להזמין ולמה הקפה הפריזאי הוא הרבה יותר ממשקה." },
      en: { cat: "Culture", t: "The Parisian café: a short guide", e: "How to sit, what to order, and why the Parisian café is far more than a drink." } },
    { img: "tour-montmartre.jpg", link: "https://www.facebook.com/JerryWalkerTrips/",
      he: { cat: "שכונות", t: "מונמרטר מעבר לגלויות", e: "הרחובות, האמנים והאהבות שהפכו את הגבעה לאגדה." },
      en: { cat: "Neighbourhoods", t: "Montmartre beyond the postcards", e: "The streets, artists and love affairs that turned the hill into a legend." } },
  ];

  /* ---------- gallery ---------- */
  const GALLERY = [
    "gal-05","gal-03","gal-06","gal-01","gal-02","gal-07","gal-08","gal-09",
    "gal-11","gal-12","gal-04","gal-14","gal-15","gal-10","gal-17","gal-18",
    "gal-20","gal-19","gal-16","gal-13",
  ];

  /* ============================================================
     RENDER
     ============================================================ */
  let LANG = localStorage.getItem("jw_lang") || "he";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const IMG = (f) => `assets/img/${f}`;
  const t = (k) => (I18N[LANG][k] ?? I18N.he[k] ?? k);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const svg = (path, cls) => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const arrow = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12l-5-5 1.4-1.4L21.8 12l-8.4 8.4L12 19l5-5H5z"/></svg>`;

  function renderValues() {
    $("#valueGrid").innerHTML = VALUES.map((v, i) => `
      <div class="value-card reveal" style="--rd:${i * 80}ms">
        ${svg(v.ico, "value-ico")}
        <h3>${esc(v[LANG].t)}</h3>
        <p>${esc(v[LANG].d)}</p>
      </div>`).join("");
  }

  function renderTours() {
    $("#toursGrid").innerHTML = TOURS.map((tr, i) => {
      const d = tr[LANG];
      const isPoster = !!tr.poster;
      const src = IMG(isPoster ? tr.poster : tr.img);
      const cls = isPoster ? "tour-card is-poster" : "tour-card is-photo";
      const band = isPoster ? "" : `<div class="tour-card__band"><h3>${esc(d.title)}</h3></div>`;
      return `<article class="${cls}" data-tour="${i}" tabindex="0" role="button" style="--rd:${(i % 4) * 70}ms">
        <img src="${src}" alt="${esc(d.title)}" loading="lazy">
        ${band}
        <span class="tour-card__hint">${t("ui.more")} +</span>
      </article>`;
    }).join("");
    $("#toursNote").innerHTML = TOURS_NOTE[LANG].map((n) => `
      <div class="note-pill reveal">${svg(n.ico, "")}<span>${esc(n.t)}</span></div>`).join("");
  }

  function renderTrips() {
    $("#tripsGrid").innerHTML = TRIPS.map((tp, i) => {
      const d = tp[LANG];
      const cls = `trip-card reveal ${tp.size === "lg" ? "trip-card--lg" : "trip-card--sm"} ${tp.img ? "" : "no-photo"}`;
      const bg = tp.img ? `style="background-image:url('${IMG(tp.img)}')"` : "";
      const deco = tp.img ? "" : svg(tp.icon, "trip-card__deco");
      const watermark = tp.img ? "" : svg(tp.icon, "trip-card__watermark");
      return `<article class="${cls}" style="--rd:${(i % 3) * 90}ms">
        <div class="trip-card__img" ${bg}>${watermark}</div>
        <span class="trip-card__tag">${esc(d.tag)}</span>
        <div class="trip-card__body">
          ${deco}
          <h3 class="trip-card__title">${esc(d.title)}</h3>
          <p class="trip-card__desc">${esc(d.d)}</p>
        </div>
      </article>`;
    }).join("");
  }

  function renderReviews() {
    $("#reviewsGrid").innerHTML = REVIEWS.map((r, i) => {
      const d = r[LANG];
      return `<div class="review-card reveal" style="--rd:${i * 90}ms">
        <p class="review-quote">${esc(d.q)}</p>
        <div class="review-foot">
          <span class="review-name">${esc(d.n)}</span>
          <span class="review-stars" aria-label="5 stars">★★★★★</span>
        </div>
      </div>`;
    }).join("");
  }

  function renderGallery() {
    $("#galleryGrid").innerHTML = GALLERY.map((g, i) => `
      <figure data-idx="${i}"><img src="${IMG(g + ".jpg")}" alt="Paris" loading="lazy"></figure>`).join("");
  }

  let BLOG_POSTS = [];
  function renderBlog() {
    const grid = $("#blogGrid");
    if (!grid) return;
    if (!BLOG_POSTS.length) { grid.innerHTML = `<p class="blog-empty">${t("blog.empty")}</p>`; return; }
    grid.innerHTML = BLOG_POSTS.slice(0, 3).map((p, i) => `
      <a class="blog-card reveal" href="blog.html#${p.id}" style="--rd:${i * 90}ms">
        <div class="blog-card__body">
          ${p.date ? `<span class="blog-card__cat">${JWBlog.esc(p.date)}</span>` : ""}
          <h3 class="blog-card__title">${JWBlog.esc(p.title)}</h3>
          <p class="blog-card__excerpt">${JWBlog.esc(p.excerpt)}</p>
          <span class="blog-card__link">${t("ui.readmore")} →</span>
        </div>
      </a>`).join("");
  }

  /* ---------- apply language ---------- */
  function applyStatic() {
    $$("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (I18N[LANG][k] != null) el.textContent = I18N[LANG][k];
    });
    $$("[data-wa]").forEach((a) => (a.href = waHref(LANG)));
  }

  function setLang(lang) {
    LANG = lang;
    localStorage.setItem("jw_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    applyStatic();
    renderValues(); renderTours(); renderTrips(); renderReviews(); renderBlog();
    observeReveals();
  }

  /* ============================================================
     INTERACTIONS
     ============================================================ */
  // header scroll state
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });

  // mobile nav
  const burger = $("#navBurger"), nav = $("#mainNav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  $$("#mainNav a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", false);
  }));

  // language toggle
  $("#langToggle").addEventListener("click", () => setLang(LANG === "he" ? "en" : "he"));

  // scrollspy: highlight the nav link of the section currently in view
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const links = $$("#mainNav a");
    const map = new Map();
    links.forEach((a) => map.set(a.getAttribute("href").slice(1), a));
    const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          const a = map.get(e.target.id); if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }

  // scroll reveal
  let io, revealSafety;
  function observeReveals() {
    if (io) io.disconnect();
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
    // safety: never leave content permanently hidden if the observer never fires
    clearTimeout(revealSafety);
    revealSafety = setTimeout(() => $$(".reveal").forEach((el) => el.classList.add("in")), 4000);
  }

  // tour modal
  const modal = $("#tourModal"), modalImg = $("#modalImg"), modalBody = $("#modalBody");
  function openTour(idx) {
    const tr = TOURS[idx], d = tr[LANG];
    modalImg.src = IMG(tr.img); modalImg.alt = d.title;
    modalBody.innerHTML = `
      <span class="tour-dur">${esc(d.dur)}</span>
      <h3>${esc(d.title)}</h3>
      <p>${esc(d.long)}</p>
      <h4>${t("ui.highlights")}</h4>
      <ul>${d.hl.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
      <a class="btn btn-wa btn-block btn-lg" href="${waHref(LANG)}" target="_blank" rel="noopener">
        <svg class="ico-wa" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.5 8.5 3.5 15.4c0 2.4.7 4.7 1.9 6.7L3 29l7.1-2.3c1.9 1 4 1.6 6 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm5.7 14.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.4 8.4 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5s0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4z"/></svg>
        ${t("ui.book")}
      </a>`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-tour]");
    if (card) openTour(+card.dataset.tour);
  });
  document.addEventListener("keydown", (e) => {
    const card = e.target.closest && e.target.closest("[data-tour]");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openTour(+card.dataset.tour); }
  });
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // lightbox
  const lb = $("#lightbox"), lbImg = $("#lbImg");
  let lbIdx = 0;
  function openLb(i) { lbIdx = (i + GALLERY.length) % GALLERY.length; lbImg.src = IMG(GALLERY[lbIdx] + ".jpg"); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeLb() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  $("#galleryGrid").addEventListener("click", (e) => { const f = e.target.closest("figure"); if (f) openLb(+f.dataset.idx); });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", () => openLb(lbIdx - 1));
  $("#lbNext").addEventListener("click", () => openLb(lbIdx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.classList.contains("open")) {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowRight") openLb(lbIdx + 1);
      if (e.key === "ArrowLeft") openLb(lbIdx - 1);
    }
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ---------- init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderGallery();
  setLang(LANG);
  initScrollSpy();
  onScroll();
  // load blog posts (from blog/posts.md) for the homepage teaser
  if (window.JWBlog) JWBlog.load().then((posts) => { BLOG_POSTS = posts; renderBlog(); });
})();
