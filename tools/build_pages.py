# -*- coding: utf-8 -*-
"""
Builds the static, crawlable pages of jerrywalkertrips.com:
  /<tour-slug>/            one page per tour (8)
  /about-jerry-walker/     About
  /faq/                    FAQ
  /contact/                Contact
  sitemap.xml, robots.txt
and pre-renders the tour + review cards inside index.html (so crawlers that do
not run JavaScript still see them).

Run from the site root:   python3 tools/build_pages.py
Tour titles/descriptions come from assets/js/main.js (TOURS, REVIEWS), so edit
them there and re-run this script.
"""
import html, io, json, os, re, subprocess, sys, datetime

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SITE = "https://jerrywalkertrips.com"
TODAY = datetime.date.today().isoformat()
WA = "972504981145"
PHONE_DISPLAY = "050-498-1145"
PHONE_INTL = "+972504981145"
EMAIL = "jerrywalkertrips@gmail.com"
FB = "https://www.facebook.com/JerryWalkerTrips/"
IG = "https://www.instagram.com/jerrywalkertours/"
GOOGLE = "https://maps.app.goo.gl/8Wr8nkBKFtFrFZjH7"
PERSON_ID = SITE + "/about-jerry-walker/#jerry"
BRAND = "Jerry Walker Trips"
IDENTITY = "ג'רי ווקר - מדריך ישראלי לסיורים פרטיים בעברית בפריז"
IDENTITY_LONG = ("ג'רי ווקר הוא מדריך ישראלי מוסמך המתגורר בפריז ומוביל סיורי עומק פרטיים בעברית "
                 "לזוגות, משפחות וקבוצות קטנות בפריז ובסביבתה.")

e = lambda s: html.escape(str(s), quote=True)


# ------------------------------------------------------------------ data
def load_js_data():
    js = os.path.join(ROOT, "assets/js/main.js")
    script = r'''
    const src = require("fs").readFileSync(%s, "utf8");
    const grab = (name) => eval(src.match(new RegExp("const " + name + " = (\\[[\\s\\S]*?\\n  \\]);"))[1]);
    console.log(JSON.stringify({ TOURS: grab("TOURS"), REVIEWS: grab("REVIEWS") }));
    ''' % json.dumps(js)
    out = subprocess.run(["node", "-e", script], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


DATA = load_js_data()
TOURS, REVIEWS = DATA["TOURS"], DATA["REVIEWS"]

# per-tour SEO copy. Facts only: everything below comes from the tour descriptions
# on the site; logistics that are not fixed (meeting point, tickets, price) are
# described as "agreed when booking".
PAGES = {
 "private-paris-tour-hebrew": dict(
   h1="סיור היכרות פרטי בעברית בפריז",
   title="סיור פרטי בעברית בפריז | Jerry Walker",
   meta="סיור היכרות פרטי בעברית בפריז עם ג'רי ווקר. מסלול אישי לזוגות, משפחות וקבוצות קטנות המשלב היסטוריה, תרבות וסיפורים מפריז.",
   short="סיור היכרות עם פריז",
   intro="סיור ההיכרות הוא נקודת ההתחלה המושלמת לביקור הראשון בפריז. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל סיור עומק פרטי בעברית בלב העיר, בין איל-דה-לה-סיטה, הרובע הלטיני ושתי גדות נהר הסן. הסיור מיועד לזוגות, למשפחות ולקבוצות קטנות, והוא נבנה סביבכם: בקצב שלכם ועם הסיפורים שמעניינים אתכם. נכיר את האתרים החשובים ברובע ה-1 ובסמוך לו, נלמד כיצד התפתחה פריז, מהי הארכיטקטורה האופיינית לה ומי האנשים שעיצבו אותה. בסיום תהיה לכם תמונה ברורה של העיר, של ההיסטוריה שלה ושל המקומות שכדאי לחזור אליהם בהמשך הביקור.",
   see=["נוטרדם וגשרי הסן", "רחבת הלובר והפירמידה", "שער הניצחון של הקרוסל", "איל-דה-לה-סיטה והרובע הלטיני", "הנופים היפים לאורך גדות הסן"],
   special="הסיור לא מסתפק ברשימת אתרים. הוא מסביר את הרקע ההיסטורי, התרבותי והיומיומי של פריז, כיצד התפתחה העיר ומי האנשים שעיצבו אותה. מכיוון שהסיור פרטי לגמרי, אפשר לשאול, לעצור ולהתעכב היכן שמעניין אתכם.",
   who="מתאים במיוחד למי שמבקרים בפריז בפעם הראשונה, וגם למי שרוצים הבנה כללית של העיר לפני שצוללים לסיורי העומק האחרים. מתאים לזוגות, למשפחות ולקבוצות קטנות.",
   faq=[("האם הסיור מתאים לביקור ראשון בפריז?", "כן. זה בדיוק מה שהוא נועד לו: היכרות רחבה עם לב העיר, ההיסטוריה שלה והאתרים המרכזיים שלה.")],
 ),
 "montmartre-tour-hebrew": dict(
   h1="סיור פרטי בעברית במונמארטר",
   title="סיור במונמארטר בעברית | Jerry Walker Paris",
   meta="סיור פרטי בעברית במונמארטר: אמנים, בוהמה, היסטוריה וסיפורי השכונה עם מדריך ישראלי המתגורר בפריז.",
   short="סיור במונמארטר",
   intro="מונמארטר היא אחת השכונות האהובות והצבעוניות ביותר בפריז, ואת הסיפור שלה כדאי לשמוע מאדם שמכיר אותה לעומק. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל סיור פרטי בעברית של כ-3 שעות בעקבות אהבות ואמנים, בין רחובות יפים המתפתלים במעלה הגבעה ועד הנקודה הגבוהה בפריז, בזיליקת הלב הקדוש (Sacré-Cœur). נבקר ונצטלם ליד המולן רוז', נפגוש אתרים מתוך הסרט 'אמלי' ונשמע את סיפורם של האמנים הגדולים שפעלו כאן ופיתחו בשכונה את סגנונותיהם. הסיור פרטי ונעים, מתאים לזוגות, למשפחות ולקבוצות קטנות, ומשלב היסטוריה, אמנות ותמונות מרהיבות.",
   see=["הרחובות המתפתלים במעלה גבעת מונמארטר", "בזיליקת הלב הקדוש (Sacré-Cœur), הנקודה הגבוהה בפריז", "המולן רוז'", "אתרים מתוך הסרט 'אמלי'", "סיפורי האמנים: פיקאסו, מודיליאני וואן גוך"],
   special="זה סיור אינסטגרמי ורגשי כאחד: רחובות פסטורליים וססגוניים, אהבות ואמנים, וסיפורים על האנשים שהפכו את הגבעה למקום אגדי. הסיפורים נמסרים בעברית, בקצב שלכם.",
   who="מתאים לזוגות רומנטיים, לחובבי אמנות וצילום, למשפחות ולכל מי שרוצה לראות את פריז הציורית שבגלויות. הסיור כולל הליכה במעלה גבעה.",
   faq=[("האם הסיור כולל את בזיליקת הלב הקדוש?", "כן. הסיור מגיע עד בזיליקת הלב הקדוש (Sacré-Cœur), הנקודה הגבוהה בפריז."),
        ("אפשר להצטלם במקומות המפורסמים?", "בהחלט. הסיור כולל עצירות צילום, למשל ליד המולן רוז'.")],
 ),
 "louvre-tour-hebrew": dict(
   h1="סיור פרטי בעברית במוזיאון הלובר",
   title="סיור פרטי בלובר בעברית | Jerry Walker Paris",
   meta="סיור פרטי בעברית במוזיאון הלובר עם ג'רי ווקר, מדריך מוסמך. יצירות המופת, הסיפורים וההיסטוריה בסיור אישי ומעמיק.",
   short="סיור בלובר",
   intro="הלובר הוא אחד המוזיאונים הגדולים והחשובים בעולם, וקל מאוד להסתבך בו בלי הדרכה. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מדריך בעברית בלובר ומוביל אתכם בסיור פרטי של כשעתיים וחצי בין מיטב יצירות האנושות. הסיור עובר בין יצירות המופת, מהמונה ליזה ועד ונוס ממילוס, מאוצרות מצרים והמומיות ועד מצבת מישע, מהכתרת נפוליאון ועד מצבת חוקי חמורבי. ההובלה במסדרונות המוזיאון יעילה וברורה, וכל יצירה מוצגת עם ההקשר ההיסטורי, התרבותי והאמנותי שלה. זהו סיור חובה לכל מי שמגיע לפריז, והוא מתאים לזוגות, למשפחות ולקבוצות קטנות.",
   see=["המונה ליזה ונוס ממילוס", "אוצרות מצרים והמומיות", "מצבת מישע", "הכתרת נפוליאון", "מצבת חוקי חמורבי", "סקירה של למעלה מ-20 המוצגים המשמעותיים ביותר"],
   special="במקום להתפזר בין אלפי יצירות, הסיור מתמקד במוצגים המשמעותיים ביותר ובהובלה יעילה ביניהם, כך שיוצאים עם הבנה ועם סיפורים ולא עם עייפות. ההדרכה ניתנת בעברית.",
   who="מתאים לכל מי שמבקר בפריז ורוצה לראות את הלובר בצורה מסודרת: זוגות, משפחות עם ילדים גדולים וקבוצות קטנות. אפשר לבקש התאמות לפי תחומי העניין שלכם.",
   faq=[("האם ההדרכה בלובר היא בעברית?", "כן. ג'רי מדריך בעברית בלובר, וניתן להתאים את הסיור גם לאנגלית או לצרפתית."),
        ("כמה יצירות רואים בסיור?", "הסיור סוקר למעלה מ-20 מהמוצגים המשמעותיים ביותר במוזיאון."),
        ("מה לגבי כרטיסי הכניסה ללובר?", "פרטי הכרטיסים והתיאום מפורטים בעת ההזמנה בוואטסאפ, כדי שהכול יהיה מסודר לפני הסיור.")],
   google_reviews=[("Gil Ben-Artzy", "My 13 year old nephew and I had an AMAZING private tour in the Louvre with Jerry. It was interesting & fun, and time just flew by! I highly recommend Jerry and will definitely go another tour next time I'm in town."),
                   ("Ana & Shaul", "we did 2 tours with jerry walker. one in the mare quarter and one at louvre museum. the both tours were great. jerry has lots of knowledge and made enjoyable tours. we highly recommend to do tours with jerry walker.")],
 ),
 "marais-tour-hebrew": dict(
   h1="סיור פרטי בעברית ברובע המארה בפריז",
   title="סיור במארה בעברית | סיור פרטי בפריז",
   meta="סיור עומק פרטי בעברית ברובע המארה עם ג'רי ווקר: היסטוריה, יהדות, אדריכלות, תרבות וסיפורים באחת השכונות המרתקות בפריז.",
   short="סיור במארה",
   intro="המארה היא אחת השכונות השיקיות והמסקרנות ביותר בפריז, ושכבות ההיסטוריה שלה נראות בכל רחוב. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל סיור עומק פרטי בעברית של כ-3 שעות ברובע, סיור מרתק ומהנה בשכונה שהפכה לשם דבר. נחרוש את הרחובות היפים, נגלה את ההיסטוריה של בתי הרובע, נחשוף שכבה אחר שכבה ונבין את המקום ואת המורשת היהודית בשכונה. בסיור נגיע לכל הפינות הקסומות והיפות של המארה ונבין כיצד המהפכה הצרפתית שינתה את גורלם של יהודי צרפת. הסיור פרטי, ומתאים לזוגות, למשפחות ולקבוצות קטנות.",
   see=["הרחובות היפים של המארה", "בתי הרובע וההיסטוריה שלהם", "המורשת היהודית בשכונה", "הפינות הקסומות של המארה", "כיצד המהפכה הצרפתית שינתה את גורלם של יהודי צרפת"],
   special="הסיור משלב היסטוריה, אדריכלות, תרבות ומורשת יהודית במקום אחד, ונבנה שכבה אחר שכבה כך שמבינים לא רק מה רואים אלא גם למה המקום נראה כפי שהוא נראה.",
   who="מתאים למי שמתעניינים בהיסטוריה יהודית ובהיסטוריה של פריז, לחובבי אדריכלות ולמי שרוצים להכיר שכונה יפה ושיקית מעבר למסלולים הרגילים. מתאים לזוגות, למשפחות ולקבוצות קטנות.",
   faq=[("האם הסיור עוסק במורשת היהודית של המארה?", "כן. המורשת היהודית בשכונה היא חלק מרכזי בסיור, וכן הסיפור של השפעת המהפכה הצרפתית על יהודי צרפת.")],
   google_reviews=[("Ana & Shaul", "we did 2 tours with jerry walker. one in the mare quarter and one at louvre museum. the both tours were great. jerry has lots of knowledge and made enjoyable tours. we highly recommend to do tours with jerry walker.")],
 ),
 "pere-lachaise-tour-hebrew": dict(
   h1="סיור פרטי בעברית בבית הקברות פר לשז",
   title="סיור פר לשז בעברית | Jerry Walker Paris",
   meta="סיור פרטי בעברית בפר לשז עם סיפורי הדמויות, האמנים, המהפכנים והקברים המפורסמים בבית הקברות האגדי של פריז.",
   short="סיור בפר לשז",
   lead="תשכחו כל מה שאתם יודעים או מדמיינים על בתי קברות!",
   intro="זהו סיור למתקדמים, למי שכבר ביקרו בפריז. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל סיור פרטי בעברית של כשעתיים וחצי בפר לשז, בית הקברות האגדי של העיר ואחד הפנתיאונים המפורסמים בעולם. זהו מסע מרתק ומרגש בין מצבות יפיפיות ועצים ירוקים בני 150 שנה במקום הקסום והנדיר הזה. נשמע על חייהם של ג'ים מוריסון סולן הדלתות ואדית פיאף, של מרגלים, אנשי כמורה וראש ממשלה אחד, ועל חיסולים, אהבות, אמנים ואמניות. הסיור כולל גם ביקור במצבתו של מולייר, ומתאים לזוגות ולקבוצות קטנות.",
   see=["מצבות יפיפיות ועצים בני 150 שנה", "סיפורי חייהם של ג'ים מוריסון, סולן הדלתות, ושל אדית פיאף", "ביקור במצבתו של מולייר", "סיפורים על מרגלים, אנשי כמורה, ראש ממשלה אחד וחיסולים"],
   special="זה לא סיור עצוב אלא סיפורי, מפתיע ומלא חיים: אהבות, אמנים, מהפכנים ופרשיות שאפשר לשמוע רק כשעומדים ליד המצבה. הוא מיועד למי שכבר ביקרו בפריז ורוצים חוויה אחרת.",
   who="מתאים למבקרים חוזרים בפריז, לחובבי היסטוריה, תרבות ומוזיקה, ולמי שמחפשים סיור שונה ומפתיע. הסיור כולל הליכה בשטח פתוח.",
   faq=[("האם הסיור בפר לשז מתאים גם למי שלא אוהב בתי קברות?", "כן, ובדיוק בשביל זה הוא נבנה. זה סיור של סיפורים, אמנות והיסטוריה, ולא סיור קודר."),
        ("מי קבורים בפר לשז?", "בסיור שומעים על ג'ים מוריסון, אדית פיאף ומולייר, ועל דמויות נוספות: מרגלים, אנשי כמורה וראש ממשלה אחד.")],
 ),
 "french-revolution-tour-hebrew": dict(
   h1="סיור בעקבות המהפכה הצרפתית ונפוליאון בפריז",
   title="סיור המהפכה הצרפתית בעברית | Jerry Walker",
   meta="סיור פרטי בעברית בעקבות המהפכה הצרפתית ונפוליאון. המקומות, האנשים והאירועים ששינו את צרפת ואת אירופה.",
   short="סיור המהפכה הצרפתית ונפוליאון",
   intro="המהפכה הצרפתית ועלייתו של נפוליאון שינו את צרפת ואת אירופה כולה, ובפריז אפשר לעמוד בדיוק במקומות שבהם הדברים קרו. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל סיור פרטי בעברית של כ-3 שעות לחובבי היסטוריה. זהו סיור מקורי וייחודי, העובר בין רחובות פריז ברבעים 1, 2, 5 ו-6 ומעניק חוויה היסטורית שאין שנייה לה: הבנה מלאה של תהליכי העומק שהובילו למהפכה ולעלייתו של נפוליאון. נבקר באתרים שבהם קרו הדברים ונבין כיצד הפכה צרפת למי שהיא היום. הסיור מתאים לזוגות, למשפחות עם בני נוער ולקבוצות קטנות.",
   see=["אתרים ברבעים 1, 2, 5 ו-6 של פריז", "המקומות שבהם התרחשו אירועי המהפכה", "הסיפור של עלייתו של נפוליאון", "תהליכי העומק שעיצבו את צרפת המודרנית"],
   special="במקום לשמוע רשימת תאריכים, מבינים את הרצף: מה הוביל למהפכה, איך היא התפתחה ולמה היא הובילה לנפוליאון, והכול בעמידה במקום האירועים עצמו.",
   who="מתאים לחובבי היסטוריה, לזוגות ולמשפחות עם בני נוער, וגם למי שכבר ביקרו בפריז ורוצים להבין לעומק את העיר.",
   faq=[("האם צריך ידע קודם בהיסטוריה צרפתית?", "לא. הסיור מתחיל מהיסוד ובונה את התמונה בהדרגה, ומתאים גם למי שלא למד את התקופה.")],
 ),
 "paris-6th-arrondissement-tour-hebrew": dict(
   h1="סודות הרובע השישי - סיור פרטי בעברית בפריז",
   title="סודות הרובע השישי בפריז | סיור פרטי בעברית",
   meta="סיור פרטי בעברית ברובע השישי בפריז: סמטאות עתיקות, בתי קפה איקוניים, כנסיות, פרשיות היסטוריות ופינות חמד נסתרות עם ג'רי ווקר.",
   short="סודות הרובע השישי",
   intro="הרובע השישי הוא אחד האזורים האלגנטיים, היפים והמסקרנים ביותר בפריז. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל סיור פרטי בעברית של כשעתיים וחצי בין סמטאות עתיקות, כיכרות ציוריות ובתי קפה איקוניים, וביקור בכנסיות מרשימות המסתירות סודות. בדרך נחשוף סיפורים שלא יאומנו, פרשיות היסטוריות מסעירות, מזימות וריגול בינלאומי, מהפכנים, פילוסופים, אמנים ואישים שעיצבו את פניה של צרפת. נגלה פינות חמד נסתרות שרוב המבקרים כלל אינם מגיעים אליהן ונקנח באחד הגנים היפים באירופה. הסיור מתאים לזוגות, למשפחות ולקבוצות קטנות.",
   see=["סמטאות עתיקות וכיכרות ציוריות", "בתי קפה איקוניים", "כנסיות מרשימות המסתירות סודות", "פינות חמד נסתרות שרוב המבקרים לא מגיעים אליהן", "אחד הגנים היפים באירופה, בסיום הסיור"],
   special="זה סיור של סיפורים: פרשיות היסטוריות, מזימות וריגול בינלאומי, מהפכנים, פילוסופים ואמנים. הוא מוביל אל מקומות שרוב המבקרים מפספסים, ומסתיים בגן יפהפה.",
   who="מתאים למבקרים חוזרים בפריז ולמי שאוהבים סיפורים, אדריכלות ואווירה, וגם לביקור ראשון עם רצון לראות משהו מעבר לאתרי החובה. מתאים לזוגות, למשפחות ולקבוצות קטנות.",
   faq=[("איפה נמצא הרובע השישי?", "הרובע השישי (Saint-Germain-des-Prés והסביבה) נמצא בגדה השמאלית של הסן, והוא ידוע בסמטאותיו, בבתי הקפה ההיסטוריים ובגנים שלו.")],
 ),
 "day-trips-from-paris-hebrew": dict(
   h1="טיולי יום פרטיים בעברית מחוץ לפריז",
   title="טיולי יום פרטיים מפריז בעברית | Jerry Walker",
   meta="טיולי יום פרטיים בעברית מפריז: נורמנדי, שנטיי, ורסאי, ג'יברני, פרובאן, עמק הלואר, ריימס, טרואה ורואן, עם ג'רי ווקר.",
   short="טיולי יום מפריז",
   intro="יש הרבה מה לראות מחוץ לפריז, ואפשר להגיע לכל היעדים הקסומים בטיול יום פרטי ומודרך בעברית. ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז, מוביל זוגות, משפחות וקבוצות קטנות להדרכה צמודה אל היעדים שמסביב לפריז ובצפון צרפת, ביום שלם או בחצי יום, לפי היעד. בוחרים יעד, ג'רי מתאים את המסלול ואתם נהנים בלי לדאוג ללוגיסטיקה של התחבורה והמסלול. מנורמנדי ועד עמק הלואר ומארמון ורסאי ועד גנו של מונה, כל טיול נבנה סביב הרצונות שלכם. אפשר גם לשלב כמה יעדים באותו יום, לפי התאמה.",
   special="מאחר שהטיולים פרטיים, אפשר להתאים את היעד, את הקצב ואת המסלול. היעדים מגוונים: טירות, כפרים, גנים, ערים עתיקות וחוף הים של נורמנדי.",
   who="מתאים למי שכבר ראו את פריז ורוצים לצאת מהעיר, לזוגות, למשפחות ולקבוצות קטנות שמעדיפות הדרכה בעברית ותכנון אישי.",
   dest=[
     ("נורמנדי עלית", "העיירה אונפלור היפה, צוקי הגיר של אֶטְרֶטַה (מנופים היפים באירופה), ולקינוח ביקור בכפר Veules-les-Roses, אחד היפים ביותר בצרפת. יום שלם.", "blog.html#post-20", "קראו על צוקי אטרטה"),
     ("שנטיי ואובר-סור-אואז", "טירת שנטיי והכפר אובר-סור-אואז, מקום מגוריו האחרון של ואן גוך.", None, None),
     ("ארמון וורסאי", "ארמון וורסאי והגנים. כחצי יום.", None, None),
     ("ג'יברני ו-La Roche-Guyon", "ביתו וגניו של קלוד מונה בג'יברני והעיירה האינסטגרמית La Roche-Guyon, וסיור קניות באאוטלט המותגים הנחשב והמוצלח בג'יברני, McArthur Glen.", "blog.html#post-19", "קראו על ג'יברני"),
     ("פרובאן", "העיירה הימי-ביניימית Provins. כחצי יום.", "blog.html#post-3", "קראו על פרובאן"),
     ("עמק הלואר", "עמק הלואר, כולל ביקור בשתי טירות קסומות.", None, None),
     ("ריימס, טרואה ורואן", "הערים ריימס, טרואה (בית רש\"י ובית הכנסת) ורואן.", None, None),
   ],
   faq=[("כמה זמן נמשך טיול יום?", "תלוי ביעד: חלק מהטיולים הם חצי יום (למשל ורסאי ופרובאן) וחלקם יום שלם (למשל נורמנדי)."),
        ("אפשר לבחור יעד אחר שלא מופיע ברשימה?", "אפשר להתייעץ בוואטסאפ. ג'רי יגיד אם היעד מתאים ויתכנן אתכם מסלול.")],
 ),
}

# order of tours = order in main.js
TOUR_BY_SLUG = {t["slug"]: t for t in TOURS}
SLUGS = [t["slug"] for t in TOURS]


# ------------------------------------------------------------------ shared pieces
SVG_WA = '<svg class="ico-wa" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.5 8.5 3.5 15.4c0 2.4.7 4.7 1.9 6.7L3 29l7.1-2.3c1.9 1 4 1.6 6 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3zm0 22.6c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.2 1.4 1.4-4.1-.2-.4a10.2 10.2 0 0 1-1.6-5.5c0-5.7 4.6-10.3 10.3-10.3S26.3 9.7 26.3 15.4 21.7 25.6 16 25.6zm5.7-7.7c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.4 8.4 0 0 1-2.5-1.5 9.3 9.3 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5s0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/></svg>'
SVG_G = ('<svg class="g-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>')


def head(title, desc, path, og_img, jsonld, depth=1, robots=None):
    up = "../" * depth
    url = SITE + path
    img = SITE + "/assets/img/" + og_img
    ld = "\n".join('  <script type="application/ld+json">%s</script>' % json.dumps(j, ensure_ascii=False) for j in jsonld)
    return f'''<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{e(title)}</title>
  <meta name="description" content="{e(desc)}" />
  <link rel="canonical" href="{url}" />
  {('<meta name="robots" content="%s" />' % robots) if robots else ''}
  <meta name="theme-color" content="#ffffff" />
  <link rel="icon" href="{up}assets/img/logo-dark.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="{BRAND}" />
  <meta property="og:locale" content="he_IL" />
  <meta property="og:title" content="{e(title)}" />
  <meta property="og:description" content="{e(desc)}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{img}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{e(title)}" />
  <meta name="twitter:description" content="{e(desc)}" />
  <meta name="twitter:image" content="{img}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{up}assets/css/styles.css?v=@V@" />
{ld}
</head>
'''


def header(depth=1):
    up = "../" * depth
    return f'''<body class="subpage">
  <header class="site-header scrolled" id="siteHeader">
    <div class="container header-inner">
      <a href="{up}" class="brand" aria-label="Jerry Walker">
        <img src="{up}assets/img/logo-h-dark.png" alt="Jerry Walker Trips" class="brand-logo" width="170" height="46" />
      </a>
      <div class="header-cluster">
        <nav class="main-nav" id="mainNav" aria-label="ניווט ראשי">
          <a href="{up}#tours">הסיורים</a>
          <a href="{up}#reviews">המלצות</a>
          <a href="{up}about-jerry-walker/">אודות</a>
          <a href="{up}blog.html">בלוג</a>
          <a href="{up}faq/">שאלות נפוצות</a>
          <a href="{up}contact/">צור קשר</a>
        </nav>
        <span class="header-divider" aria-hidden="true"></span>
        <a class="btn btn-wa header-wa" data-wa target="_blank" rel="noopener">{SVG_WA}<span>שריינו סיור פרטי</span></a>
        <button class="nav-burger" id="navBurger" aria-label="תפריט" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
'''


def footer(depth=1):
    up = "../" * depth
    return f'''
  <a class="wa-float" data-wa target="_blank" rel="noopener" aria-label="WhatsApp">{SVG_WA}</a>

  <footer class="site-footer">
    <div class="container footer-inner">
      <img src="{up}assets/img/logo-h-dark.png" alt="Jerry Walker Trips" class="footer-logo" width="170" height="46" />
      <p class="footer-brand">{BRAND}</p>
      <p class="footer-tag">{IDENTITY}</p>
      <nav class="footer-links" aria-label="קישורי תחתית">
        <a href="{up}#tours">סיורים</a><a href="{up}about-jerry-walker/">אודות</a><a href="{up}faq/">שאלות נפוצות</a><a href="{up}blog.html">בלוג</a><a href="{up}contact/">צור קשר</a>
      </nav>
      <p class="footer-copy">&copy; <span id="year"></span> {BRAND}</p>
    </div>
  </footer>

  <script src="{up}assets/js/ref.js?v=@V@"></script>
  <script src="{up}assets/js/page.js?v=@V@"></script>
</body>
</html>
'''


def breadcrumbs(items, depth=1):
    """items: [(label, href|None)] -> html + JSON-LD"""
    up = "../" * depth
    parts, ld = [], []
    for i, (label, href) in enumerate(items, 1):
        if href is None:
            parts.append(f'<span aria-current="page">{e(label)}</span>')
        else:
            parts.append(f'<a href="{up}{href}">{e(label)}</a>')
        el = {"@type": "ListItem", "position": i, "name": label}
        if href is not None:
            el["item"] = SITE + "/" + href
        ld.append(el)
    nav = '<nav class="breadcrumbs" aria-label="פירורי לחם">' + ' <span class="sep" aria-hidden="true">&lsaquo;</span> '.join(parts) + '</nav>'
    return nav, {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": ld}


def more_tours(current=None, depth=1):
    up = "../" * depth
    items = "".join(
        f'<li><a href="{up}{t["slug"]}/">{e(PAGES[t["slug"]]["short"])}</a></li>'
        for t in TOURS if t["slug"] != current)
    return f'<section class="block"><h2>סיורים נוספים של ג\'רי ווקר</h2><ul class="link-list">{items}</ul></section>'


def cta_band(text="לבדיקת זמינות וקבלת פרטים, כתבו לי בוואטסאפ ואחזור אליכם עם הכול."):
    return f'''<section class="cta-band">
      <p>{e(text)}</p>
      <a class="btn btn-wa btn-lg" data-wa data-book target="_blank" rel="noopener">{SVG_WA}<span>בדקו זמינות בוואטסאפ</span></a>
    </section>'''


def person_ld():
    return {
        "@context": "https://schema.org", "@type": "Person", "@id": PERSON_ID,
        "name": "ג'רי ווקר", "alternateName": ["Jerry Walker", "Yaron"],
        "url": SITE + "/about-jerry-walker/",
        "image": SITE + "/assets/img/jerry-portrait.jpg",
        "jobTitle": "מדריך ישראלי לסיורים פרטיים בעברית בפריז",
        "description": IDENTITY_LONG,
        "knowsLanguage": ["he", "en", "fr", "ar"],
        "knowsAbout": ["סיורים בפריז", "היסטוריה של פריז", "מוזיאון הלובר", "המארה", "המהפכה הצרפתית", "טיולי יום מפריז"],
        "alumniOf": [{"@type": "CollegeOrUniversity", "name": "Université Paris 8"},
                     {"@type": "CollegeOrUniversity", "name": "Bar-Ilan University"}],
        "worksFor": {"@id": SITE + "/#org"},
        "sameAs": [FB, IG, GOOGLE],
    }


def org_ref():
    return {"@type": "Organization", "@id": SITE + "/#org", "name": BRAND, "url": SITE + "/"}


def write(path, content, version):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    io.open(full, "w", encoding="utf-8").write(content.replace("@V@", str(version)))


def current_version():
    m = re.search(r"styles\.css\?v=(\d+)", io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read())
    return m.group(1) if m else "1"


# ------------------------------------------------------------------ tour pages
def booking_line(P):
    return (f"כדי להזמין את {P['short']}, שלחו הודעה קצרה בוואטסאפ עם התאריכים האפשריים ומספר המשתתפים, "
            "ונבדוק יחד זמינות ונתאים את הסיור אליכם.")


def tour_page(slug, version):
    t = TOUR_BY_SLUG[slug]
    P = PAGES[slug]
    h = t["he"]
    path = f"/{slug}/"
    img_name = t.get("poster") or t["img"]
    is_poster = bool(t.get("poster"))
    w, hh = (800, 1000) if is_poster else (900, 1350)
    if img_name == "poster-perelachaise.jpg" or img_name == "poster-revolution.jpg":
        w, hh = 667, 999
    if img_name == "poster-secrets6.jpg":
        w, hh = 750, 1000
    nav, bc_ld = breadcrumbs([("דף הבית", ""), ("סיורים", "#tours"), (P["short"], None)])

    dur = h["dur"]
    facts = [
        ("סוג הסיור", "פרטי בלבד"),
        ("שפה", "עברית (אפשר גם באנגלית או בצרפתית)"),
        ("משך משוער", dur),
        ("מתאים ל", "זוגות, משפחות וקבוצות קטנות (1 עד 12 מטיילים)"),
        ("נקודת מפגש", "נקבעת בתיאום מראש בוואטסאפ"),
        ("התאמה אישית", "כן, הסיור נבנה סביבכם"),
    ]
    facts_html = "".join(f"<div><dt>{e(a)}</dt><dd>{e(b)}</dd></div>" for a, b in facts)

    lead = f'<p class="lead-strong">{e(P["lead"])}</p>' if P.get("lead") else ""

    if slug == "day-trips-from-paris-hebrew":
        dest_html = ""
        for name, desc, href, label in P["dest"]:
            link = f' <a href="../{href}">{e(label)}</a>' if href else ""
            dest_html += f"<article class='dest'><h3>{e(name)}</h3><p>{e(desc)}{link}</p></article>"
        see_block = f'<section class="block"><h2>יעדים לטיולי יום</h2>{dest_html}</section>'
    else:
        see_block = '<section class="block"><h2>מה נראה בסיור</h2><ul class="check">' + "".join(f"<li>{e(x)}</li>" for x in P["see"]) + "</ul></section>"

    faq = P["faq"] + [
        ("כמה זמן נמשך הסיור?", f"משך הסיור הוא {dur}."),
        ("איך מזמינים?", f"שולחים הודעה בוואטסאפ למספר {PHONE_DISPLAY}, בודקים זמינות ומתאמים את הפרטים. הסיור פרטי, ולכן הזמן והמסלול מותאמים אליכם."),
    ]
    faq_html = "".join(f"<h3>{e(q)}</h3><p>{e(a)}</p>" for q, a in faq)

    rev_html = ""
    if P.get("google_reviews"):
        cards = "".join(
            f'<blockquote class="quote"><p lang="en" dir="ltr">&ldquo;{e(txt)}&rdquo;</p><footer>{e(name)}, ביקורת בגוגל</footer></blockquote>'
            for name, txt in P["google_reviews"])
        rev_html = f'<section class="block"><h2>מה אומרים מטיילים על הסיור</h2>{cards}<p><a href="{GOOGLE}" target="_blank" rel="noopener">לכל הביקורות בגוגל</a></p></section>'

    body = f'''
  <main class="page">
    <div class="container">
      {nav}
      <div class="page-grid">
        <div class="page-main prose">
          <span class="kicker">סיור פרטי בעברית · פריז</span>
          <h1>{e(P["h1"])}</h1>
          {lead}
          <p class="lede">{e(P["intro"])} {e(booking_line(P))}</p>
          <p><a class="btn btn-wa btn-lg" data-wa data-book target="_blank" rel="noopener">{SVG_WA}<span>בדקו זמינות בוואטסאפ</span></a></p>

          <section class="facts" aria-label="בקצרה"><h2>בקצרה</h2><dl>{facts_html}</dl></section>

          {see_block}

          <section class="block"><h2>מה מיוחד בסיור</h2><p>{e(P["special"])}</p></section>
          <section class="block"><h2>למי מתאים הסיור</h2><p>{e(P["who"])}</p></section>
          <section class="block"><h2>מי מדריך את הסיור</h2>
            <p>הסיור מונחה על ידי <a href="../about-jerry-walker/">ג'רי ווקר</a>, מדריך ישראלי מוסמך המתגורר בפריז, בעל שני תארים מתקדמים (M.A) ומורה דרך מוסמך מטעם יד בן-צבי בירושלים. ג'רי מדריך בארבע שפות ומוביל סיורי עומק פרטיים בפריז ובסביבתה.</p></section>
          {rev_html}
          <section class="block"><h2>שאלות נפוצות על הסיור</h2>{faq_html}
            <p>עוד תשובות בעמוד <a href="../faq/">שאלות נפוצות על סיורים פרטיים בעברית בפריז</a>.</p></section>

          {cta_band()}
          {more_tours(slug)}
        </div>
        <aside class="page-aside">
          <img src="../assets/img/{img_name}" alt="{e(P["h1"])}, כרזת הסיור של ג'רי ווקר" width="{w}" height="{hh}" fetchpriority="high" />
        </aside>
      </div>
    </div>
  </main>
'''
    service = {
        "@context": "https://schema.org", "@type": "Service",
        "name": P["h1"], "serviceType": "סיור פרטי מודרך בעברית",
        "description": P["meta"], "url": SITE + path,
        "image": SITE + "/assets/img/" + img_name,
        "provider": {"@id": PERSON_ID},
        "areaServed": {"@type": "Place", "name": "Paris, France"},
        "availableLanguage": ["he", "en", "fr"],
    }
    page = head(P["title"], P["meta"], path, img_name, [service, bc_ld], depth=1)
    page = page.replace("<body", "<body") + header() + body + footer()
    # tour-specific WhatsApp message
    page = page.replace('<body class="subpage">', f'<body class="subpage" data-tour="{e(h["title"])}">', 1)
    return page


# ------------------------------------------------------------------ about / faq / contact
def about_page():
    path = "/about-jerry-walker/"
    nav, bc = breadcrumbs([("דף הבית", ""), ("אודות ג'רי", None)])
    revs = "".join(
        f'<blockquote class="quote"><p>&ldquo;{e(r["he"]["q"])}&rdquo;</p><footer>{e(r["he"]["n"])}</footer></blockquote>'
        for r in REVIEWS[:3])
    tours_list = "".join(f'<li><a href="../{t["slug"]}/">{e(PAGES[t["slug"]]["h1"])}</a></li>' for t in TOURS)
    body = f'''
  <main class="page">
    <div class="container">
      {nav}
      <div class="page-grid">
        <div class="page-main prose">
          <span class="kicker">נעים להכיר</span>
          <h1>ג'רי ווקר - מדריך ישראלי בפריז</h1>
          <p class="lede">{e(IDENTITY_LONG)} שמי ירון, אבל כולם קוראים לי ג'רי.</p>

          <section class="block"><h2>מי אני</h2>
            <p>אני מדריך ותיק ומנוסה. גרתי וחייתי בחו"ל שנים לא מעטות, בהן בפיליפינים, בבלגיה ובצרפת. אני מורה דרך מוסמך מטעם יד בן-צבי בירושלים, ובמהלך השנים השלמתי שני תארים מתקדמים (M.A) בהצטיינות: האחד מאוניברסיטת פריז-8 והשני מאוניברסיטת בר-אילן.</p>
            <p>אני פריק של טיולים וחובב מושבע של היסטוריה. הדרכתי מאות סיורים ואלפי מטיילים, ואני אוהב להביא למטיילים שלי את הסיפורים המרתקים ביותר על פריז. חשוב לי שכשתחזרו ארצה תרגישו שהביקור בעיר האורות היה משודרג ומושלם.</p></section>

          <section class="block"><h2>שפות ההדרכה</h2>
            <p>אני מוסמך להדרכה בארבע שפות: עברית, אנגלית, צרפתית וערבית. הסיורים באתר מתקיימים בעברית, ואפשר לתאם גם באנגלית או בצרפתית.</p></section>

          <section class="block"><h2>תחומי התמחות</h2>
            <ul class="check">
              <li>סיורי עומק פרטיים בפריז: היסטוריה, תרבות, אמנות ואדריכלות</li>
              <li>הדרכה בעברית במוזיאון הלובר</li>
              <li>שכונות פריז: המארה, מונמארטר, הרובע השישי, פר לשז</li>
              <li>המהפכה הצרפתית ונפוליאון</li>
              <li>טיולי יום פרטיים מחוץ לפריז, מנורמנדי ועד עמק הלואר</li>
            </ul></section>

          <section class="block"><h2>הסיורים שאני מוביל</h2><ul class="link-list">{tours_list}</ul></section>

          <section class="block"><h2>מה אומרים המטיילים</h2>
            {revs}
            <p><a href="{GOOGLE}" target="_blank" rel="noopener">{SVG_G} קראו את כל הביקורות בגוגל</a></p></section>

          <section class="block"><h2>הפרופילים הרשמיים שלי</h2>
            <ul class="link-list">
              <li><a href="{FB}" target="_blank" rel="noopener me">פייסבוק: Jerry Walker Trips</a></li>
              <li><a href="{IG}" target="_blank" rel="noopener me">אינסטגרם: jerrywalkertours</a></li>
              <li><a href="{GOOGLE}" target="_blank" rel="noopener me">הפרופיל שלי בגוגל</a></li>
            </ul></section>

          {cta_band("רוצים להכיר את פריז דרך הסיפורים? כתבו לי ונתאים לכם את הסיור המושלם.")}
          <p>לשאלות נפוצות: <a href="../faq/">שאלות נפוצות על סיורים פרטיים בעברית בפריז</a>. ליצירת קשר: <a href="../contact/">צור קשר</a>.</p>
        </div>
        <aside class="page-aside">
          <img src="../assets/img/jerry-portrait.jpg" alt="ג'רי ווקר, מדריך ישראלי בפריז, מדריך סיור פרטי בעברית" width="1200" height="1200" fetchpriority="high" />
        </aside>
      </div>
    </div>
  </main>
'''
    profile = {"@context": "https://schema.org", "@type": "ProfilePage", "url": SITE + path,
               "name": "ג'רי ווקר - מדריך ישראלי בפריז | אודות",
               "dateModified": TODAY, "mainEntity": person_ld()}
    title = "ג'רי ווקר - מדריך ישראלי בפריז | אודות"
    meta = "הכירו את ג'רי ווקר, מדריך ישראלי מוסמך המתגורר בפריז ומוביל סיורים פרטיים בעברית בפריז, בלובר וביעדים מחוץ לעיר."
    return head(title, meta, path, "jerry-portrait.jpg", [profile, bc]) + header() + body + footer()


FAQ = [
 ("האם הסיורים של ג'רי ווקר פרטיים?", "כן. כל הסיורים פרטיים בלבד, רק אתם והמדריך, ללא הצטרפות של מטיילים זרים."),
 ("האם הסיורים מתקיימים בעברית?", "כן. ההדרכה בעברית. ג'רי מוסמך להדרכה גם באנגלית, בצרפתית ובערבית, ואפשר לתאם סיור בשפות אלה."),
 ("כמה אנשים יכולים להשתתף?", "בין מטייל אחד ל-12 מטיילים. הסיורים מתאימים במיוחד לזוגות, למשפחות ולקבוצות קטנות."),
 ("כמה זמן נמשך סיור פרטי בפריז?", "רוב הסיורים בעיר נמשכים בין כשעתיים וחצי לכ-3 שעות. טיולי יום מחוץ לפריז נמשכים חצי יום או יום שלם, לפי היעד."),
 ("האם אפשר להזמין סיור זוגי?", "כן. הסיורים הפרטיים מתאימים מאוד לזוגות, והמסלול והקצב מותאמים לשניכם."),
 ("האם הסיורים מתאימים למשפחות?", "כן. אפשר לבחור סיור שמתאים לגילאי הילדים, ולהתאים את הקצב והתוכן. מומלץ לציין בהודעה את גילאי המשתתפים."),
 ("האם אפשר להזמין סיור בלובר בעברית?", "כן. ג'רי מדריך בעברית במוזיאון הלובר. זהו סיור של כשעתיים וחצי שסוקר למעלה מ-20 מהמוצגים המשמעותיים ביותר."),
 ("אילו סיורים קיימים בפריז?", "סיור היכרות עם פריז, מונמארטר, הלובר, המארה, פר לשז, המהפכה הצרפתית ונפוליאון, סודות הרובע השישי וטיולי יום מחוץ לפריז. ראו את הרשימה המלאה למטה."),
 ("האם ניתן להתאים את המסלול אישית?", "כן. הסיורים נבנים סביב הקצב והסקרנות שלכם. כתבו בוואטסאפ מה מעניין אתכם ונתאים את הסיור."),
 ("האם ג'רי מדריך גם מחוץ לפריז?", "כן. ג'רי מוביל טיולי יום פרטיים לנורמנדי, שנטיי, ורסאי, ג'יברני, פרובאן, עמק הלואר, ריימס, טרואה ורואן."),
 ("איך מזמינים?", f"שולחים הודעה בוואטסאפ למספר {PHONE_DISPLAY} (או מייל ל-{EMAIL}), מציינים תאריך, מספר משתתפים וסיור מבוקש, ומקבלים פרטים ומחיר."),
 ("כמה זמן מראש מומלץ להזמין?", "כמה שיותר מוקדם, במיוחד בעונות העמוסות. הזמינות נבדקת בוואטסאפ ואפשר לשאול גם על תאריכים קרובים."),
 ("האם מחיר הכניסה לאתרים כלול?", "המחיר נקבע לפי הסיור והרכב המטיילים. לגבי כרטיסי כניסה לאתרים בתשלום (כמו הלובר), ג'רי מפרט בעת ההזמנה מה כלול ומה לא."),
]


def faq_page():
    path = "/faq/"
    nav, bc = breadcrumbs([("דף הבית", ""), ("שאלות נפוצות", None)])
    qa = "".join(f"<section class='qa'><h2>{e(q)}</h2><p>{e(a)}</p></section>" for q, a in FAQ)
    tours_list = "".join(f'<li><a href="../{t["slug"]}/">{e(PAGES[t["slug"]]["h1"])}</a></li>' for t in TOURS)
    body = f'''
  <main class="page">
    <div class="container">
      {nav}
      <div class="page-single prose">
        <span class="kicker">שאלות ותשובות</span>
        <h1>שאלות נפוצות על סיורים פרטיים בעברית בפריז</h1>
        <p class="lede">כאן תמצאו תשובות קצרות לשאלות שמתקבלות הכי הרבה על הסיורים של <a href="../about-jerry-walker/">ג'רי ווקר</a>, מדריך ישראלי מוסמך המתגורר בפריז. לא מצאתם תשובה? כתבו בוואטסאפ.</p>
        {qa}
        <section class="block"><h2>הסיורים שלנו</h2><ul class="link-list">{tours_list}</ul></section>
        {cta_band()}
      </div>
    </div>
  </main>
'''
    title = "שאלות נפוצות על סיורים פרטיים בעברית בפריז | Jerry Walker"
    meta = "תשובות לשאלות נפוצות על סיורים פרטיים בעברית בפריז עם ג'רי ווקר: משך, מחיר, הזמנה, התאמה אישית, משפחות, לובר וטיולי יום."
    return head(title, meta, path, "hero-jerry.jpg", [bc]) + header() + body + footer()


def contact_page():
    path = "/contact/"
    nav, bc = breadcrumbs([("דף הבית", ""), ("צור קשר", None)])
    body = f'''
  <main class="page">
    <div class="container">
      {nav}
      <div class="page-single prose">
        <span class="kicker">בואו נתכנן את פריז שלכם</span>
        <h1>יצירת קשר עם ג'רי ווקר</h1>
        <p class="lede"><strong>{BRAND}</strong> - {IDENTITY}. הדרך המהירה ביותר לקבל פרטים, מחירים ובדיקת זמינות היא הודעת וואטסאפ. אני בדרך כלל זמין ועונה מהר.</p>
        <p><a class="btn btn-wa btn-lg" data-wa data-book target="_blank" rel="noopener">{SVG_WA}<span>שלחו לי וואטסאפ</span></a></p>
        <section class="block"><h2>פרטי התקשרות</h2>
          <dl class="contact-list">
            <div><dt>וואטסאפ וטלפון</dt><dd><a href="tel:{PHONE_INTL}">{PHONE_DISPLAY}</a></dd></div>
            <div><dt>אימייל</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
            <div><dt>פייסבוק</dt><dd><a href="{FB}" target="_blank" rel="noopener me">Jerry Walker Trips</a></dd></div>
            <div><dt>אינסטגרם</dt><dd><a href="{IG}" target="_blank" rel="noopener me">jerrywalkertours</a></dd></div>
            <div><dt>ביקורות בגוגל</dt><dd><a href="{GOOGLE}" target="_blank" rel="noopener">הפרופיל שלנו בגוגל</a></dd></div>
          </dl></section>
        <section class="block"><h2>מה כדאי לכתוב בהודעה</h2>
          <ul class="check"><li>איזה סיור מעניין אתכם (או "לא בטוחים, תמליץ")</li><li>תאריכים אפשריים</li><li>כמה משתתפים, ואם יש ילדים באיזה גילאים</li></ul></section>
        <p>עוד מידע: <a href="../about-jerry-walker/">אודות ג'רי</a> · <a href="../faq/">שאלות נפוצות</a> · <a href="../#tours">כל הסיורים</a></p>
      </div>
    </div>
  </main>
'''
    contact_ld = {"@context": "https://schema.org", "@type": "ContactPage", "url": SITE + path,
                  "name": "יצירת קשר עם ג'רי ווקר",
                  "about": {"@id": SITE + "/#org"}}
    title = "צור קשר | ג'רי ווקר - מדריך ישראלי בפריז"
    meta = "יצירת קשר עם ג'רי ווקר, מדריך ישראלי לסיורים פרטיים בעברית בפריז: וואטסאפ, טלפון, אימייל, פייסבוק ואינסטגרם."
    return head(title, meta, path, "hero-jerry.jpg", [contact_ld, bc]) + header() + body + footer()


# ------------------------------------------------------------------ index prerender, sitemap, robots
def prerender_index(version):
    p = os.path.join(ROOT, "index.html")
    s = io.open(p, encoding="utf-8").read()

    def card(t, i):
        h = t["he"]
        is_poster = bool(t.get("poster"))
        src = "assets/img/" + (t["poster"] if is_poster else t["img"])
        cls = "tour-card is-poster" if is_poster else "tour-card is-photo"
        cta = ""
        if t.get("trip"):
            cta = f'<a class="btn btn-wa tour-card__cta" href="https://wa.me/{WA}" target="_blank" rel="noopener">הזמן טיול פרטי</a>'
        band = "" if is_poster else f'<div class="tour-card__band"><h3>{e(h["title"])}</h3>{cta}</div>'
        return (f'<article class="{cls}"><a class="tour-card__cover" href="{t["slug"]}/" data-tour-en="{i}" aria-label="{e(h["title"])}"></a>'
                f'<img src="{src}" alt="{e(h["title"])}" loading="lazy" width="{800 if is_poster else 900}" height="{1000 if is_poster else 1350}">'
                f'{band}<span class="tour-card__hint">לפרטים נוספים +</span></article>')

    cards = "".join(card(t, i) for i, t in enumerate(TOURS))
    s = re.sub(r"<!--SEO:TOURS-->.*?<!--/SEO:TOURS-->", lambda m: "<!--SEO:TOURS-->" + cards + "<!--/SEO:TOURS-->", s, flags=re.S)

    rev = "".join(
        f'<div class="review-card"><div class="review-stars" aria-label="5 stars">★★★★★</div><p class="review-quote">{e(r["he"]["q"])}</p><p class="review-name">{e(r["he"]["n"])}</p></div>'
        for r in REVIEWS)
    s = re.sub(r"<!--SEO:REVIEWS-->.*?<!--/SEO:REVIEWS-->", lambda m: "<!--SEO:REVIEWS-->" + rev + "<!--/SEO:REVIEWS-->", s, flags=re.S)
    io.open(p, "w", encoding="utf-8").write(s)


def sitemap():
    urls = [("/", "1.0"), ("/about-jerry-walker/", "0.9")] + \
           [("/%s/" % t["slug"], "0.9") for t in TOURS] + \
           [("/faq/", "0.7"), ("/contact/", "0.6"), ("/blog.html", "0.7")]
    rows = "".join(f"  <url><loc>{SITE}{u}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>\n" for u, pr in urls)
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + rows + "</urlset>\n"


ROBOTS = f"""User-agent: *
Allow: /

# ChatGPT Search visibility
User-agent: OAI-SearchBot
Allow: /

Sitemap: {SITE}/sitemap.xml
"""


def main():
    v = current_version()
    for t in TOURS:
        write(f'{t["slug"]}/index.html', tour_page(t["slug"], v), v)
    write("about-jerry-walker/index.html", about_page(), v)
    write("faq/index.html", faq_page(), v)
    write("contact/index.html", contact_page(), v)
    write("sitemap.xml", sitemap(), v)
    write("robots.txt", ROBOTS, v)
    prerender_index(v)
    print("built", len(TOURS), "tour pages + about + faq + contact + sitemap + robots (v=%s)" % v)


if __name__ == "__main__":
    main()
