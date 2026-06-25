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
      "nav.blog": "בלוג", "nav.about": "אודות", "nav.contact": "צור קשר", "nav.reviews": "המלצות",
      "cta.whatsapp": "שריינו סיור בוואטסאפ", "cta.book": "שריינו סיור פרטי", "details.title": "פירוט הסיורים",
      "hero.eyebrow": "מדריך אקדמאי מוסמך · סיורים פרטיים",
      "hero.title": "לטייל וליהנות בפריז כמו מדריך מקומי",
      "hero.sub": "סיורי עומק פרטיים בפריז ומחוצה לה. היסטוריה ותרבות באווירה נעימה ומרתקת.",
      "hero.explore": "גלו את הסיורים",
      "intro.lead": "לא עוד טיול עם המון. סיור פרטי, אישי ומעמיק, שנבנה סביבכם, סביב הקצב והסקרנות שלכם, ומלא בסיפורים שלא תשמעו בשום מקום אחר.",
      "tours.kicker": "סיורים פרטיים ברחבי פריז", "tours.title": "הנה הסיורים שאני מציע:",
      "tours.sub": "לחצו על כרזה כדי לראות את פרטי הסיור.",
      "trips.kicker": "טיולי יום פרטיים מחוץ לעיר", "trips.title": "מעבר לפריז",
      "trips.sub": "טיולי יום פרטיים ומודרכים בעברית אל היעדים הקסומים שמסביב לעיר ובצפון צרפת.",
      "about.kicker": "נעים להכיר", "about.title": "כמה מילים עליי",
      "about.p1": "שמי ירון, אבל כולם קוראים לי ג'רי. אני מדריך ותיק ומנוסה. גרתי וחייתי בחו״ל שנים לא מעטות, בהן בפיליפינים, בבלגיה ובצרפת. אני מורה דרך מוסמך מטעם יד בן-צבי בירושלים, ובמהלך השנים השלמתי שני תארים מתקדמים (M.A) בהצטיינות: האחד מאוניברסיטת פריז-8 והשני מבר-אילן 🤓.",
      "about.p2": "אני פריק של טיולים וחובב מושבע של היסטוריה, ומוסמך להדרכה בארבע שפות: אנגלית, צרפתית, עברית וערבית. הדרכתי מאות סיורים ואלפי מטיילים. אני אוהב להביא למטיילים שלי את הסיפורים המרתקים ביותר על פריז, וחשוב לי שכשתחזרו ארצה תרגישו שהביקור בעיר האורות היה משודרג ומושלם. ברחבי פריז אני מדריך כמה סיורי עומק מקוריים לגמרי, מדריך בעברית במוזיאון הלובר, ומוביל גם קבוצות ומשפחות לטיולים מרהיבים מחוץ לעיר לפי בקשה.",
      "about.cta": "שלחו לי וואטסאפ", "about.badgeNum": "1-12", "about.badgeLabel": "מטיילים · פרטי בלבד",
      "reviews.kicker": "מטיילים מספרים", "reviews.title": "מה אומרים עליי המטיילים שטיילו עמי בפריז?",
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
      "nav.blog": "Blog", "nav.about": "About", "nav.contact": "Contact", "nav.reviews": "Reviews",
      "cta.whatsapp": "Book on WhatsApp", "cta.book": "Book a private tour", "details.title": "Tour details",
      "hero.eyebrow": "Certified academic guide · Private tours",
      "hero.title": "Explore and enjoy Paris like a local guide",
      "hero.sub": "Private in-depth tours in Paris and beyond. History and culture in a warm, captivating atmosphere.",
      "hero.explore": "Explore the tours",
      "intro.lead": "Not another tour with the crowd. A private, personal, in-depth experience, built around you, your pace and your curiosity, and full of stories you won't hear anywhere else.",
      "tours.kicker": "Private tours across Paris", "tours.title": "Here are the tours I offer:",
      "tours.sub": "Tap a poster to see the full tour details.",
      "trips.kicker": "Private day trips beyond the city", "trips.title": "Beyond Paris",
      "trips.sub": "Private guided day trips in Hebrew to the most magical destinations around the capital and across northern France.",
      "about.kicker": "Meet Jerry", "about.title": "A few words about me",
      "about.p1": "My name is Yaron, but everyone calls me Jerry. I am a veteran, experienced guide. I lived abroad for many years, including in the Philippines, Belgium and France. I am a certified tour guide (Yad Ben-Zvi, Jerusalem), and over the years I completed two master's degrees (M.A) with honours: one from the University of Paris-8 and one from Bar-Ilan 🤓.",
      "about.p2": "I am a travel fanatic and a die-hard history lover, certified to guide in four languages: English, French, Hebrew and Arabic. I have led hundreds of tours and thousands of travellers. I love bringing my guests the most fascinating stories about Paris, and it matters to me that when you go home you feel your visit to the City of Light was elevated and complete. Across Paris I guide several completely original in-depth tours, I guide the Louvre in Hebrew, and I also lead groups and families on stunning day trips outside the city on request.",
      "about.cta": "Send me a WhatsApp", "about.badgeNum": "1-12", "about.badgeLabel": "travellers · private only",
      "reviews.kicker": "Travellers' words", "reviews.title": "What travellers who toured Paris with me say",
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
      poster: "poster-intro.jpg", img: "tour-classic.jpg",
      he: { dur: "כ-3 שעות", title: "סיור היכרות פרטי מקיף ומרתק בפריז",
        long: "סיור עומק בלב פריז, בין איל-דה-לה-סיטה, הרובע הלטיני ושתי גדות נהר הסן. נכיר את האתרים החשובים ברובע ה-1 ובסמוך לו, נלמד כיצד התפתחה פריז, מהי הארכיטקטורה האופיינית לה ומי האנשים שעיצבו אותה. הסיור עובר במגוון אתרי חובה לאורך גדות הסן (נוטרדם, גשרי הסן, רחבת הלובר והפירמידה, שער הניצחון של הקרוסל ועוד) ומעניק היכרות עם הנופים היפים של העיר והבנה של הרקע ההיסטורי, התרבותי והיומיומי שלה." },
      en: { dur: "about 3 hours", title: "Comprehensive Private Introduction to Paris",
        long: "An in-depth walk through the heart of Paris, across the Île de la Cité, the Latin Quarter and both banks of the Seine. We get to know the key sites of the 1st arrondissement, learn how Paris grew, what its signature architecture is and who shaped it. The route passes a wealth of must-sees along the river (Notre-Dame, the Seine bridges, the Louvre plaza and pyramid, the Carrousel arch and more), with the city's finest views and a real grasp of its history, culture and daily life." } },
    {
      poster: "poster-montmartre.jpg", img: "tour-montmartre.jpg",
      he: { dur: "כ-3 שעות", title: "סיור פרטי מרתק ואינסטגרמי בשכונת המונמרטר",
        long: "סיור של כ-3 שעות בעקבות אהבות ואמנים, בין רחובות יפים המתפתלים במעלה גבעת מונמרטר ועד הנקודה הגבוהה בפריז, בזיליקת הלב הקדוש (Sacré-Cœur). נבקר ונצטלם ליד המולן רוז', נפגוש אתרים מתוך הסרט 'אמלי', ונשמע את סיפורם של האמנים הגדולים שפעלו במונמרטר ופיתחו בה את סגנונותיהם, בהם פיקאסו, מודיליאני וואן גוך. סיור סוחף ומרגש ברחובות פסטורליים וססגוניים." },
      en: { dur: "about 3 hours", title: "Captivating, Instagram-worthy Tour of Montmartre",
        long: "A 3-hour journey in the footsteps of artists and love affairs, up the pretty winding lanes of Montmartre hill to the highest point in Paris, the Basilica of Sacré-Cœur. We photograph the Moulin Rouge, find spots from the film 'Amélie', and hear the stories of the great artists who worked here, among them Picasso, Modigliani and Van Gogh. A moving, sweeping walk through colourful, picturesque streets." } },
    {
      img: "tour-louvre.jpg",
      he: { dur: "כשעתיים וחצי", title: "סיור פרטי מודרך בעברית בלובר",
        long: "סיור חובה למגיעים לפריז. הדרכה סוחפת ומרתקת בעברית בין מיטב יצירות האנושות: מהמונה ליזה ועד ונוס ממילוס, מאוצרות מצרים והמומיות ועד מצבת מישע, מהכתרת נפוליאון ועד מצבת חוקי חמורבי. כל הטוב הזה בהובלה יעילה במסדרונות המוזיאון החשוב בעולם, עם ההקשרים ההיסטוריים, התרבותיים והאמנותיים של כל יצירה. סקירה של למעלה מ-20 המוצגים המשמעותיים ביותר. כשעתיים וחצי." },
      en: { dur: "about 2.5 hours", title: "Private Guided Visit to the Louvre",
        long: "A must for anyone visiting Paris. A captivating guided walk among humanity's greatest works: from the Mona Lisa to the Venus de Milo, from the treasures and mummies of Egypt to the Mesha Stele, from Napoleon's coronation to the Code of Hammurabi. All led efficiently through the halls of the world's most important museum, with the historical, cultural and artistic context of each piece. Over 20 of the most significant exhibits. About two and a half hours." } },
    {
      poster: "poster-marais.jpg", img: "tour-marais.jpg",
      he: { dur: "כ-3 שעות", title: "סיור עומק פרטי בשכונת המארה הטרנדית",
        long: "סיור מרתק ומהנה בשכונה שהפכה לשם דבר. נחרוש את הרחובות היפים, נגלה את ההיסטוריה של בתי הרובע, נחשוף שכבה אחר שכבה ונבין את המקום ואת המורשת היהודית בשכונה השיקית בפריז. כ-3 שעות." },
      en: { dur: "about 3 hours", title: "In-depth Private Tour of the Trendy Marais",
        long: "A fascinating, enjoyable tour of the neighbourhood that became a byword for cool. We comb its beautiful streets, uncover the history of its mansions layer by layer, and come to understand the place and the Jewish heritage of the chicest quarter in Paris. About 3 hours." } },
    {
      poster: "poster-perelachaise.jpg", img: "tour-perelachaise.jpg",
      he: { dur: "כשעתיים וחצי", title: "הסיור המושלם בבית הקברות האגדי \"פר לשז\"",
        long: "סיור למתקדמים, למי שכבר ביקרו בפריז. הפנתיאון המפורסם בעולם: מסע מרתק ומרגש בין מצבות יפיפיות ועצים ירוקים בני 150 שנה במקום הקסום והנדיר הזה. נשמע על חייהם של ג'ים מוריסון סולן הדלתות, אדית פיאף, מרגלים, אנשי כמורה וראש ממשלה אחד, ועל חיסולים, אהבות ואמנים ואמניות. כשעתיים וחצי סוחפות." },
      en: { dur: "about 2.5 hours", title: "The Perfect Tour of the Legendary Père-Lachaise",
        long: "A tour for the seasoned traveller who has already seen Paris. The world's most famous cemetery: a moving, fascinating walk among gorgeous tombs and 150-year-old trees in this rare, magical place. We'll hear about the lives of Jim Morrison of The Doors, Édith Piaf, spies, clergy and one prime minister, and about assassinations, loves and artists. Two and a half captivating hours." } },
    {
      poster: "poster-revolution.jpg", img: "tour-revolution.jpg",
      he: { dur: "כ-3 שעות", title: "סיור פרטי בעקבות המהפכה הצרפתית ונפוליאון",
        long: "סיור לחובבי היסטוריה, מקורי וייחודי, העובר בין רחובות פריז ברבעים 1, 2, 5 ו-6 ומעניק חוויה היסטורית שאין שנייה לה: הבנה מלאה של תהליכי העומק שהובילו למהפכה הצרפתית ולעלייתו של נפוליאון. נבקר באתרים שבהם קרו הדברים ונבין כיצד הפכה צרפת למי שהיא היום. כ-3 שעות." },
      en: { dur: "about 3 hours", title: "Private Tour: The French Revolution & Napoleon",
        long: "An original, one-of-a-kind tour for history lovers, winding through the streets of the 1st, 2nd, 5th and 6th arrondissements and offering an unmatched historical experience: a full understanding of the deep currents that led to the French Revolution and the rise of Napoleon. We visit the places where it all happened and grasp how France became what it is today. About 3 hours." } },
    {
      poster: "poster-shadows.jpg", img: "tour-shadows.jpg",
      he: { dur: "כשעתיים וחצי", title: "סיור פרטי \"פריז - עיר האורות והצללים\"",
        long: "בעקבות פרשיות ביטחוניות, ריגול וחיסולים בעיר היפה בעולם. סיור מקורי וייחודי שאין שני לו, על הפרשיות העלומות והמוזרות ביותר שאירעו ברחובות פריז במאות השנים האחרונות. היסטוריה, מתח, אתרים יפים וקצב סוחף. כשעתיים וחצי." },
      en: { dur: "about 2.5 hours", title: "Private Tour: Paris, City of Lights & Shadows",
        long: "In the footsteps of security affairs, espionage and assassinations in the world's most beautiful city. An original, one-of-a-kind tour about the strangest, most mysterious affairs that took place on the streets of Paris over recent centuries. History, suspense, beautiful sites and a gripping pace. About two and a half hours." } },
    {
      img: "trip-daytrips.jpg",
      he: { dur: "יום / חצי יום", title: "טיולי יום פרטיים אל מחוץ לעיר",
        long: "הדרכה צמודה בעברית אל היעדים הקסומים שמסביב לפריז ובצפון צרפת. בין האפשרויות:",
        hl: ["נורמנדי עילית: אונפלור היפה, צוקי הגיר של אטרטה ואחד הכפרים היפים בצרפת", "טירת שנטיי והכפר אובר-סור-אואז, מקום מגוריו האחרון של ואן גוך", "ארמון וורסאי והגנים (כחצי יום)", "ביתו וגניו של קלוד מונה בג'יברני והעיירה האינסטגרמית La Roche-Guyon", "העיירה הימי-ביניימית Provins (כחצי יום)", "עמק הלואר, כולל ביקור בשתי טירות קסומות", "הערים ריימס, טרואה (בית רש\"י ובית הכנסת) ורואן"] },
      en: { dur: "full / half day", title: "Private Day Trips Outside the City",
        long: "Personal Hebrew-language guiding to the magical destinations around Paris and across northern France. Options include:",
        hl: ["Upper Normandy: lovely Honfleur, the chalk cliffs of Étretat and one of France's prettiest villages", "Château de Chantilly and the village of Auvers-sur-Oise, Van Gogh's final home", "The Palace of Versailles and its gardens (about half a day)", "Claude Monet's house and gardens in Giverny and the town of La Roche-Guyon", "The medieval town of Provins (about half a day)", "The Loire Valley, including two enchanting châteaux", "The cities of Reims, Troyes (Rashi's house and synagogue) and Rouen"] },
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
    { he: { q: "ג'רי, הסיור בהדרכתך היה כניסה מושלמת לפריז. העברת לנו בדרך נעימה ומשעשעת ידע רב ומרשים. אתה מקצוען אמיתי. הרגשנו את ההשקעה ושאתה עושה זאת מכל הלב. נמליץ בחום לכל מכרינו.", n: "מיכל ונדב" },
      en: { q: "Jerry, your tour was the perfect introduction to Paris. You shared impressive knowledge in a warm and entertaining way. You're a true professional. We felt the dedication and that you do this with all your heart. We'll warmly recommend you to everyone.", n: "Michal & Nadav" } },
    { he: { q: "ג'רי, תודה רבה על הסיור המעניין, מאוד נהנינו.", n: "לילי ז'" },
      en: { q: "Jerry, thank you so much for the fascinating tour, we really enjoyed it.", n: "Lily Z." } },
    { he: { q: "היינו בסיור של ג'רי בפריז, היה מצוין, מומלץ ממש! הסביר בסבלנות, סיפר סיפורים מעניינים כל הדרך, הביא הרבה ידע והיה מקצועי ביותר. שמחה מאוד שבחרנו להצטרף, בהחלט הוסיף לנו הרבה לטיול. תודה רבה!", n: "אסתר כהן" },
      en: { q: "We took Jerry's tour in Paris and it was excellent, highly recommended! He explained patiently, told interesting stories the whole way, brought a wealth of knowledge and was extremely professional. So glad we joined, it really added a lot to our trip. Thank you!", n: "Esther Cohen" } },
    { he: { q: "סיור פשוט נהדר! ג'רי מדריך נפלא, סבלני, מצחיק, ומעביר בחסד את ההיסטוריה הנפלאה של פריז! ממליצה בחום רב!", n: "גאיה פ." },
      en: { q: "Simply a wonderful tour! Jerry is a lovely guide, patient, funny, and brings the wonderful history of Paris to life with grace. Warmly recommended!", n: "Gaia P." } },
    { he: { q: "היום עשינו סיור משפחתי עם ג'רי המדריך. בהתחלה חששנו כי אנחנו צעירות שלא אוהבות היסטוריה משעממת... עשיתי הרבה סיורים בחיי אבל ג'רי באמת הצליח להפתיע אותי בתוכן בלתי נגמר ומרתק! מעניין ולא משעמם לרגע, סבלני לכל השאלות. שווה להקדיש שלוש שעות לסיור איתו, זה שווה כל שקל וכל דקה! הסיור פשוט חלף בשנייה ולא האמנו שעברו שלוש שעות!", n: "אוריה א'" },
      en: { q: "Today we did a family tour with Jerry. At first we were worried, since we're young and don't love boring history... I've done many tours in my life, but Jerry truly managed to surprise me with endless, fascinating content. Interesting and never boring for a second, patient with all our questions. It's worth dedicating three hours to a tour with him, worth every shekel and every minute! The tour just flew by, we couldn't believe three hours had passed!", n: "Oria A." } },
    { he: { q: "ממליצה בחום לכל מי שמגיע לפריז! משפחות, חברות, אחיות, זוגות! פשוט מומלץ ושווה!", n: "מירב א'" },
      en: { q: "Warmly recommended to anyone coming to Paris! Families, friends, sisters, couples! Simply recommended and worth it!", n: "Merav A." } },
    { he: { q: "ג'רי, תודה על הסיור המאלף היום!", n: "אמיר ס'" },
      en: { q: "Jerry, thank you for today's truly enlightening tour!", n: "Amir S." } },
    { he: { q: "ג'רי המדריך הכי טוב שאפשר להכיר! הייתה לנו זכות לטייל איתו יומיים בפריז, ואין לנו מילים לתאר כמה נהנינו. מהרגע הראשון הוא היה מקצועי, סבלני, אדיב ומלא ידע. הוא לקח אותנו לכל המקומות החשובים והיפים שחייבים לראות בפריז והפך את החוויה למיוחדת ומהנה הרבה יותר. מעבר לטיולים עצמם, הוא היה זמין עבורנו גם בוואטסאפ לאורך כל הדרך, ענה בשמחה על כל שאלה, נתן המלצות מצוינות ועזר בכל דבר. אם אתם מחפשים מדריך שיהפוך את הטיול לחוויה בלתי נשכחת, עם יחס אישי, אכפתיות והמון מקצועיות, אנחנו ממליצים עליו מכל הלב!", n: "מאריה ח'" },
      en: { q: "Jerry is the best guide you could ever meet! We had the privilege of touring with him for two days in Paris, and we have no words to describe how much we enjoyed it. From the first moment he was professional, patient, kind and full of knowledge. He took us to all the important, beautiful must-sees in Paris and made the experience so much more special and fun. Beyond the tours, he was available for us on WhatsApp throughout, happily answered every question, gave great recommendations and helped with everything. If you're looking for a guide who'll turn your trip into an unforgettable experience, with a personal touch, care and tons of professionalism, we recommend him with all our hearts!", n: "Maria H." } },
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
    "gal-31","gal-32","gal-33","gal-34","gal-35","gal-36","gal-37","gal-38",
    "gal-39","gal-40","gal-41","gal-42",
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

  function tourCardHTML(tr, i) {
    const d = tr[LANG];
    const isPoster = !!tr.poster;
    const src = IMG(isPoster ? tr.poster : tr.img);
    const cls = isPoster ? "tour-card is-poster" : "tour-card is-photo";
    const band = isPoster ? "" : `<div class="tour-card__band"><h3>${esc(d.title)}</h3></div>`;
    return `<article class="${cls}" data-tour="${i}" tabindex="0" role="button">
      <img src="${src}" alt="${esc(d.title)}" loading="lazy">
      ${band}
      <span class="tour-card__hint">${t("ui.more")} +</span>
    </article>`;
  }
  function renderTours() {
    $("#toursGrid").innerHTML = TOURS.map((tr, i) => tourCardHTML(tr, i)).join("");
  }

  function renderTourDetails() {
    const box = $("#tourDetails"); if (!box) return;
    box.innerHTML = TOURS.map((tr, i) => {
      const d = tr[LANG];
      const hl = d.hl ? `<ul class="det-list">${d.hl.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : "";
      return `<article class="det reveal" id="det-${i}">
        <span class="det-dur">${esc(d.dur)}</span>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.long)}</p>
        ${hl}
        <a class="btn btn-wa det-cta" href="${waHref(LANG)}" target="_blank" rel="noopener">${t("cta.book")}</a>
      </article>`;
    }).join("");
  }

  function renderReviews() {
    $("#reviewsGrid").innerHTML = REVIEWS.map((r, i) => {
      const d = r[LANG];
      return `<div class="review-card reveal" style="--rd:${i * 80}ms">
        <div class="review-stars" aria-label="5 stars">★★★★★</div>
        <p class="review-quote">${esc(d.q)}</p>
        <p class="review-name">${esc(d.n)}</p>
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
    renderTours(); renderTourDetails(); renderReviews(); renderBlog();
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

  // click a poster -> scroll down to its full details
  function gotoDetail(idx) {
    const el = document.getElementById("det-" + idx);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // correct for any layout shift from lazy images finishing mid-scroll
    setTimeout(() => el.scrollIntoView({ block: "start" }), 650);
    setTimeout(() => el.scrollIntoView({ block: "start" }), 1400);
  }
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-tour]");
    if (card) gotoDetail(+card.dataset.tour);
  });
  document.addEventListener("keydown", (e) => {
    const card = e.target.closest && e.target.closest("[data-tour]");
    if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); gotoDetail(+card.dataset.tour); }
  });

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
