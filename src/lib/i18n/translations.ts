export type Locale = "en" | "he";

export const RTL_LOCALES: readonly Locale[] = ["he"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  he: "עב",
};

/** Label for the language the user will switch *to* (shown on the toggle button). */
export function getToggleLocaleLabel(currentLocale: Locale): string {
  return LOCALE_LABELS[currentLocale === "en" ? "he" : "en"];
}

/**
 * English text -> Hebrew translation dictionary.
 * Lookup is by exact source string so components can call
 * `t("Some English Text")` without introducing separate key namespaces.
 */
export const he: Record<string, string> = {
  // Header / Nav
  Home: "בית",
  "Book a Ride": "הזמן נסיעה",
  "Service Areas": "אזורי שירות",
  FAQ: "שאלות נפוצות",
  Contact: "צור קשר",
  "Manage Booking": "ניהול הזמנה",
  "Book Now": "הזמן עכשיו",
  Language: "שפה",

  // Footer
  "Premium airport transfers and taxi rides across Israel. Reliable, punctual, professional.":
    "הסעות שדה תעופה פרימיום ונסיעות מונית ברחבי ישראל. אמינות, בזמן ומקצועיות.",
  "Quick Links": "קישורים מהירים",
  Services: "שירותים",
  Support: "תמיכה",
  Cities: "ערים",
  "Fare Calculator": "מחשבון מחיר",
  "Airport Pickup": "איסוף משדה התעופה",
  "Airport Drop-off": "הורדה בשדה התעופה",
  "City Taxi": "מונית עירונית",
  "Route Pricing": "תמחור מסלולים",
  "Contact Us": "צור קשר",
  "Terms of Service": "תנאי שימוש",
  "Privacy Policy": "מדיניות פרטיות",
  "Tel Aviv": "תל אביב",
  Jerusalem: "ירושלים",
  Haifa: "חיפה",
  "All Areas": "כל האזורים",
  "© 2026 FLYTAXI. All rights reserved. Israel's premium airport taxi service.":
    "© 2026 FLYTAXI. כל הזכויות שמורות. שירות מוניות הפרימיום לשדה התעופה בישראל.",

  // Hero
  "Ben Gurion Airport Transfer": "הסעה לנתב״ג",
  "Your Premium Transfer To & From Ben Gurion Airport":
    "ההסעה הפרימיום שלך אל ומ שדה התעופה בן גוריון",
  "Fixed fares. No surprises. Book in minutes.":
    "מחירים קבועים. בלי הפתעות. הזמנה תוך דקות.",
  "Fixed fares, no surprises": "מחירים קבועים, בלי הפתעות",
  "No login required": "לא נדרשת הרשמה",
  "Instant price": "מחיר מיידי",
  "Scroll to explore": "גלול לעוד",
  "Get it on": "השיגו את זה ב",
  "Google Play": "גוגל פליי",
  "Apple Store": "אפל סטור",

  // Booking widget
  "To Ben Gurion Airport": "לשדה התעופה בן גוריון",
  "From Ben Gurion Airport": "משדה התעופה בן גוריון",
  "To Airport": "לשדה התעופה",
  "From Airport": "משדה התעופה",
  "Pickup: Ben Gurion Airport, Terminal 3":
    "איסוף: שדה התעופה בן גוריון, טרמינל 3",
  "Destination: Ben Gurion Airport, Terminal 3":
    "יעד: שדה התעופה בן גוריון, טרמינל 3",
  "Flight Number": "מספר טיסה",
  "e.g. LY315": "לדוגמה LY315",
  "We track your flight and adjust pickup time for delays":
    "אנו עוקבים אחר הטיסה שלך ומתאימים את שעת האיסוף בהתאם לעיכובים",
  "Drop-off Address": "כתובת הורדה",
  "Pickup Address": "כתובת איסוף",
  "Search or enter address": "חפש או הזן כתובת",
  "Use Current Location": "השתמש במיקום הנוכחי",
  "Arrival Date": "תאריך נחיתה",
  "Pickup Date": "תאריך איסוף",
  "Arrival Time": "שעת נחיתה",
  "Pickup Time": "שעת איסוף",
  Passengers: "נוסעים",
  Luggage: "מזוודות",
  "Vehicle Type": "סוג רכב",
  "Calculate Price": "חשב מחיר",
  "Please enter flight number, drop-off address, date and time":
    "אנא הזן מספר טיסה, כתובת הורדה, תאריך ושעה",
  "Please enter address, date and time": "אנא הזן כתובת, תאריך ושעה",
  "Trolley / Carry-on suitcase": "מזוודת יד / טרולי",
  "Large suitcase": "מזוודה גדולה",
  "Standard Sedan": "סדאן סטנדרטי",
  "Premium Sedan": "סדאן פרימיום",
  "Van / Minibus": "ואן / מיניבוס",
  Standard: "סטנדרטי",
  Premium: "פרימיום",

  // Stats bar
  "Always available": "זמינים תמיד",
  "Rides completed": "נסיעות שהושלמו",
  "Average rating": "דירוג ממוצע",
  "Avg. pickup time": "זמן איסוף ממוצע",

  // How it works
  "3 Simple Steps": "3 שלבים פשוטים",
  "How It Works": "איך זה עובד",
  "From first click to confirmed booking in minutes":
    "מהקלקה הראשונה ועד הזמנה מאושרת תוך דקות",
  "Enter Your Trip": "הזן את הנסיעה שלך",
  "Choose To or From Ben Gurion Airport and provide your pickup address, date, and time.":
    "בחר אל או משדה התעופה בן גוריון וספק את כתובת האיסוף, התאריך והשעה.",
  "See Your Fare Instantly": "צפה במחיר באופן מיידי",
  "Get your fixed fare immediately — no registration, no hidden fees, no surprises.":
    "קבל את המחיר הקבוע שלך באופן מיידי — ללא הרשמה, ללא עמלות נסתרות, ללא הפתעות.",
  "Confirm Your Booking": "אשר את ההזמנה שלך",
  "Complete your details, choose your payment method, and receive instant confirmation.":
    "השלם את הפרטים שלך, בחר אמצעי תשלום, וקבל אישור מיידי.",
  "Calculate Your Fare Now": "חשב את המחיר שלך עכשיו",

  // Services
  "Airport Transfer Services": "שירותי הסעות שדה תעופה",
  "Direct, fixed-price transfers to and from Ben Gurion Airport":
    "הסעות ישירות במחיר קבוע אל ומשדה התעופה בן גוריון",
  "On-time pickup from your door. Fixed fare, professional driver, stress-free departure.":
    "איסוף בזמן מהבית שלך. מחיר קבוע, נהג מקצועי, יציאה ללא לחץ.",
  "Door-to-terminal service": "שירות מהדלת לטרמינל",
  "Fixed confirmed price": "מחיר קבוע ומאושר",
  "Flight details optional": "פרטי טיסה אופציונליים",
  "Track from your phone": "מעקב מהטלפון שלך",
  "Book To Airport": "הזמן לשדה התעופה",
  "Driver waiting for you at arrivals. We monitor your flight and adjust for delays.":
    "הנהג ממתין לך בהגעות. אנו עוקבים אחר הטיסה שלך ומתאימים לעיכובים.",
  "Meet & greet at arrivals": "קבלת פנים בהגעות",
  "Flight number collection": "איסוף לפי מספר טיסה",
  "Name sign service": "שירות שלט עם שם",
  "Help with luggage": "עזרה עם המזוודות",
  "Book From Airport": "הזמן משדה התעופה",

  // Popular routes
  "Popular Routes": "מסלולים פופולריים",
  "Click any route to pre-fill your booking":
    "לחץ על כל מסלול כדי למלא מראש את ההזמנה שלך",
  Netanya: "נתניה",
  "Beer Sheva": "באר שבע",
  "Ben Gurion Airport": "שדה התעופה בן גוריון",
  "Live fare": "מחיר חי",

  // Why choose
  "Why Choose FLYTAXI?": "למה לבחור ב-FLYTAXI?",
  "Fixed Fares": "מחירים קבועים",
  "No surge pricing. The price you see is the price you pay.":
    "ללא תמחור עומס. המחיר שאתה רואה הוא המחיר שתשלם.",
  "Instant Price": "מחיר מיידי",
  "Calculate your fare before booking, no account needed.":
    "חשב את המחיר שלך לפני ההזמנה, ללא צורך בחשבון.",
  "Professional Drivers": "נהגים מקצועיים",
  "Licensed, vetted drivers with airport transfer experience.":
    "נהגים מורשים ומאומתים עם ניסיון בהסעות שדה תעופה.",
  "Easy Booking": "הזמנה קלה",
  "Book in minutes, manage your rides, track your driver.":
    "הזמן תוך דקות, נהל את הנסיעות שלך, עקוב אחר הנהג שלך.",

  // Final CTA
  "Ready to Book Your Transfer?": "מוכנים להזמין את ההסעה שלכם?",
  "Get your fixed fare in seconds. No registration required.":
    "קבלו את המחיר הקבוע שלכם תוך שניות. אין צורך בהרשמה.",
  "Get Your Fare Now": "קבל את המחיר שלך עכשיו",

  // FAQ page
  "Get in Touch": "צור קשר",
  "Frequently Asked Questions": "שאלות נפוצות",
  "Everything you need to know about FLYTAXI transfers":
    "כל מה שצריך לדעת על הסעות FLYTAXI",
  All: "הכל",
  Booking: "הזמנה",
  Payment: "תשלום",
  Airport: "שדה תעופה",
  Cancellation: "ביטול",
  "How do I book a transfer?": "איך מזמינים הסעה?",
  "Enter your pickup and drop-off details in the booking widget on our homepage, choose your vehicle type, and click Calculate Price. Once you see your fixed fare, complete your details and confirm — no account required.":
    "הזן את פרטי האיסוף וההורדה בווידג'ט ההזמנה בדף הבית שלנו, בחר את סוג הרכב ולחץ על חשב מחיר. לאחר שתראה את המחיר הקבוע, השלם את הפרטים שלך ואשר — לא נדרש חשבון.",
  "Do I need to create an account?": "האם עלי ליצור חשבון?",
  "No. You can calculate your fare and complete a booking without creating an account. We'll send confirmation details to your email or phone.":
    "לא. תוכל לחשב את המחיר שלך ולהשלים הזמנה מבלי ליצור חשבון. נשלח לך פרטי אישור לדוא״ל או לטלפון שלך.",
  "Is the quoted price fixed?": "האם המחיר המצוטט קבוע?",
  "Yes. All airport transfer fares shown on FlyTaxi are fixed. The price you see before booking is the price you pay — no surge pricing and no hidden fees.":
    "כן. כל מחירי ההסעות לשדה התעופה המוצגים ב-FlyTaxi הם קבועים. המחיר שאתה רואה לפני ההזמנה הוא המחיר שתשלם — ללא תמחור עומס וללא עמלות נסתרות.",
  "What payment methods are accepted?": "אילו אמצעי תשלום מתקבלים?",
  "We accept major credit and debit cards. Some routes also support cash payment to the driver — payment options are shown at checkout.":
    "אנו מקבלים כרטיסי אשראי וחיוב מרכזיים. חלק מהמסלולים תומכים גם בתשלום מזומן לנהג — אפשרויות התשלום מוצגות בקופה.",
  "Can I cancel my booking?": "האם ניתן לבטל את ההזמנה שלי?",
  "Free cancellation up to 3 hours before scheduled pickup. Cancellations within 3 hours may incur a fee depending on vehicle assignment status. Use Manage Booking to cancel or modify.":
    "ביטול חינם עד 3 שעות לפני האיסוף המתוכנן. ביטולים בתוך 3 שעות עשויים לגרור עמלה בהתאם לסטטוס שיוך הרכב. השתמש בניהול הזמנה כדי לבטל או לשנות.",
  "How will I find my driver at the airport after my flight lands?":
    "איך אמצא את הנהג שלי בשדה התעופה לאחר נחיתת הטיסה שלי?",
  "Your driver meets you in the Terminal 3 arrivals hall after baggage claim, holding a name sign with your name. You'll receive driver contact details before pickup.":
    "הנהג שלך יפגוש אותך באולם ההגעות של טרמינל 3 לאחר איסוף המזוודות, כשהוא מחזיק שלט עם שמך. תקבל את פרטי הקשר של הנהג לפני האיסוף.",
  "Can I request a specific vehicle type?": "האם ניתן לבקש סוג רכב מסוים?",
  "Yes. Choose from Standard Sedan, Premium Sedan, or Van / Minibus when booking. Vehicle options are shown in the booking widget with capacity details.":
    "כן. בחר מבין סדאן סטנדרטי, סדאן פרימיום או ואן / מיניבוס בעת ההזמנה. אפשרויות הרכב מוצגות בווידג'ט ההזמנה עם פרטי קיבולת.",
  "What if my flight is delayed and I need help coordinating pickup?":
    "מה קורה אם הטיסה שלי מתעכבת ואני צריך עזרה בתיאום האיסוף?",
  "We monitor your flight number and adjust pickup time automatically. One hour of waiting time from landing is included at no extra charge. Contact support if you need additional help.":
    "אנו עוקבים אחר מספר הטיסה שלך ומתאימים את שעת האיסוף באופן אוטומטי. שעה אחת של המתנה מרגע הנחיתה כלולה ללא עלות נוספת. צור קשר עם התמיכה אם אתה זקוק לעזרה נוספת.",
  "Do you charge extra for luggage?": "האם יש תוספת תשלום עבור מזוודות?",
  "Standard luggage is included. Use the luggage counters in the booking widget to add extra bags — any additional charges are shown before you confirm.":
    "מזוודות סטנדרטיות כלולות. השתמש בספירת המזוודות בווידג'ט ההזמנה כדי להוסיף תיקים נוספים — כל תוספת תשלום תוצג לפני האישור.",
  "Is the service available 24/7?": "האם השירות זמין 24/7?",
  "We operate 24/6 with transfers available around the clock. Book online anytime and we'll confirm your driver details before pickup.":
    "אנו פועלים 24/6 עם הסעות זמינות מסביב לשעון. הזמן אונליין בכל עת ואנו נאשר את פרטי הנהג לפני האיסוף.",
  "Can I add additional stops?": "האם ניתן להוסיף עצירות נוספות?",
  "Additional stops may be available depending on your route. Contact our support team before booking or mention it in your message when requesting a custom quote.":
    "עצירות נוספות עשויות להיות זמינות בהתאם למסלול שלך. צור קשר עם צוות התמיכה שלנו לפני ההזמנה או ציין זאת בהודעה שלך בעת בקשת הצעת מחיר מותאמת אישית.",
  "How far in advance can I book?": "כמה זמן מראש ניתן להזמין?",
  "You can book transfers weeks in advance. We recommend booking at least 24 hours ahead for airport transfers, though same-day availability is often available.":
    "ניתן להזמין הסעות שבועות מראש. אנו ממליצים להזמין לפחות 24 שעות מראש עבור הסעות לשדה התעופה, אם כי לרוב קיימת זמינות גם באותו יום.",
  "Still have questions?": "עדיין יש לך שאלות?",
  "Our team is here to help.": "הצוות שלנו כאן כדי לעזור.",
  "Book a Transfer": "הזמן הסעה",

  // Contact page
  "Contact FLYTAXI": "צור קשר עם FLYTAXI",
  "Questions, special requests, or need help with a booking?":
    "שאלות, בקשות מיוחדות, או צריך עזרה עם הזמנה?",
  "Contact Information": "פרטי יצירת קשר",
  Phone: "טלפון",
  Email: "דוא״ל",
  "Service Area": "אזור שירות",
  "24/6 support": "תמיכה 24/6",
  "We reply within hours": "אנו עונים תוך שעות",
  "All of Israel": "כל ישראל",
  "To & From Ben Gurion Airport": "אל ומ שדה התעופה בן גוריון",
  "Quick Actions": "פעולות מהירות",
  "View FAQ": "צפה בשאלות נפוצות",
  "Send a Message": "שלח הודעה",
  "Full Name": "שם מלא",
  "David Cohen": "דוד כהן",
  "+972 50 000 0000": "‎+972 50 000 0000",
  Message: "הודעה",
  "How can we help you?": "איך נוכל לעזור לך?",
  "Send Message": "שלח הודעה",

  // Booking flow — shared
  Back: "חזור",
  "No account or payment required at this stage.":
    "אין צורך בחשבון או בתשלום בשלב זה.",
  Direction: "כיוון",
  Pickup: "איסוף",
  Destination: "יעד",
  Date: "תאריך",
  Time: "שעה",
  Flight: "טיסה",
  Vehicle: "רכב",
  From: "מאיפה",
  To: "לאן",
  Edit: "עריכה",
  "Continue →": "המשך ←",

  // Step 1 — Fare
  "Your fare is ready": "המחיר שלך מוכן",
  "Your Fare": "המחיר שלך",
  "Fixed price, no surprises, no surge pricing":
    "מחיר קבוע, בלי הפתעות, בלי תמחור עומס",
  "TOTAL FARE": "סה״כ מחיר",
  "Fixed price · No credit card surcharge": "מחיר קבוע · ללא עמלת אשראי",
  "TRIP DETAILS": "פרטי הנסיעה",
  "Included in your fare": "כלול במחיר שלך",
  "Luggage assistance": "סיוע במזוודות",
  "No waiting time charge": "ללא חיוב זמן המתנה",
  "VAT included": "כולל מע״מ",
  "Flight number helps coordinate pickup": "מספר טיסה מסייע בתיאום האיסוף",
  "Continue Booking →": "המשך בהזמנה ←",
  "Edit Trip": "ערוך נסיעה",

  // Step 2 — Details
  "Complete Your Booking": "השלם את ההזמנה שלך",
  "Review and complete your trip details": "בדוק והשלם את פרטי הנסיעה שלך",
  ROUTE: "מסלול",
  "DATE & TIME": "תאריך ושעה",
  "PICKUP DATE": "תאריך איסוף",
  "PICKUP TIME": "שעת איסוף",
  "PASSENGERS & VEHICLE": "נוסעים ורכב",
  PASSENGERS: "נוסעים",
  "TROLLEY / CARRY-ON": "טרולי / מזוודת יד",
  "LARGE SUITCASE": "מזוודה גדולה",
  "VEHICLE TYPE": "סוג רכב",

  // Step 3 — Review
  "Review Your Booking": "בדוק את ההזמנה שלך",
  "Please confirm all details before continuing": "אנא אשר את כל הפרטים לפני שתמשיך",
  "Fixed price · VAT included": "מחיר קבוע · כולל מע״מ",

  // Step 4 — Passenger details
  "Your Details": "הפרטים שלך",
  "Complete your booking as a guest — no account required":
    "השלם את ההזמנה שלך כאורח — לא נדרש חשבון",
  "Guest Booking — No password needed": "הזמנת אורח — לא נדרשת סיסמה",
  "FULL NAME": "שם מלא",
  "PHONE NUMBER": "מספר טלפון",
  "EMAIL ADDRESS (OPTIONAL)": "כתובת דוא״ל (אופציונלי)",
  "We'll send a verification code to this number": "נשלח קוד אימות למספר זה",
  "For booking confirmation and receipt": "לאישור ההזמנה וקבלה",
  "Booking total": "סה״כ הזמנה",

  // Step 5 — Verify
  "Verify Your Number": "אמת את המספר שלך",
  "We sent a 6-digit code to": "שלחנו קוד בן 6 ספרות אל",
  "Resend code in": "שלח קוד שוב בעוד",
  "Resend code": "שלח קוד שוב",
  "Verify & Continue": "אמת והמשך",
  "SMS verification is used to confirm your identity and associate this booking with your phone number for future access. No password is required.":
    "אימות SMS משמש לאישור זהותך ולשיוך הזמנה זו למספר הטלפון שלך לגישה עתידית. אין צורך בסיסמה.",

  // Payment
  "Select Payment Method": "בחר אמצעי תשלום",
  "Choose how you'd like to pay for your transfer": "בחר כיצד תרצה לשלם עבור ההסעה שלך",
  "BOOKING TOTAL": "סה״כ הזמנה",
  "PAY DIRECTLY TO DRIVER": "שלם ישירות לנהג",
  "SECURE ONLINE PAYMENT": "תשלום מקוון מאובטח",
  "Cash to Driver": "מזומן לנהג",
  "Pay in cash directly to your driver": "שלם במזומן ישירות לנהג שלך",
  Bit: "ביט",
  "Pay via Bit app directly to driver": "שלם באפליקציית ביט ישירות לנהג",
  PayBox: "פייבוקס",
  "Pay via PayBox directly to driver": "שלם באמצעות פייבוקס ישירות לנהג",
  "Credit Card": "כרטיס אשראי",
  "Secure online payment to FLYTAXI": "תשלום מקוון מאובטח ל-FLYTAXI",
  "Direct to driver": "ישירות לנהג",
  "Online to FLYTAXI": "מקוון ל-FLYTAXI",
  "Continue to Payment →": "המשך לתשלום ←",

  // Bit payment
  "Pay with Bit": "שלם עם ביט",
  "Pay directly to your driver via Bit app": "שלם ישירות לנהג שלך באמצעות אפליקציית ביט",
  "AMOUNT TO PAY VIA BIT": "סכום לתשלום דרך ביט",
  "Paid directly to driver via Bit": "משולם ישירות לנהג דרך ביט",
  "How Bit payment works": "איך תשלום ביט עובד",
  "Your booking is confirmed immediately": "ההזמנה שלך מאושרת מיידית",
  "Driver's Bit payment details will be shared before the ride":
    "פרטי התשלום בביט של הנהג יישלחו לפני הנסיעה",
  "Send": "שלח",
  "via Bit to your driver": "דרך ביט לנהג שלך",
  "Payment goes directly to the driver": "התשלום מועבר ישירות לנהג",
  "Confirm Booking with Bit": "אשר הזמנה עם ביט",

  // Confirm
  "Booking Confirmed!": "ההזמנה אושרה!",
  "Your transfer has been booked successfully": "ההסעה שלך הוזמנה בהצלחה",
  "Pay driver via Bit ·": "שלם לנהג דרך ביט ·",
  "Bit — Payment to driver": "ביט — תשלום לנהג",
  "CUSTOMER DETAIL": "פרטי הלקוח",
  "Total Fare": "סה״כ מחיר",
  "Name:": "שם:",
  "Phone no:": "מספר טלפון:",
  "Payment:": "תשלום:",
  Guest: "אורח",
  "View Booking": "צפה בהזמנה",
  "Back to Home": "חזרה לדף הבית",
  "A confirmation has been sent to": "אישור נשלח אל",

  // My Rides
  "My Rides": "הנסיעות שלי",
  Upcoming: "קרובות",
  History: "היסטוריה",
  "Date & Time": "תאריך ושעה",
  "View Details": "צפה בפרטים",
  "Book Another Transfer": "הזמן הסעה נוספת",
  Confirmed: "מאושר",
  Completed: "הושלם",
  Cancelled: "בוטל",

  // Ride details
  "Driver Assigned": "נהג שובץ",
  "Your driver is confirmed": "הנהג שלך אושר",
  "YOUR DRIVER": "הנהג שלך",
  "Verified Driver": "נהג מאומת",
  Color: "צבע",
  License: "רישיון",
  "Payment Method": "אמצעי תשלום",
  "Track Driver": "עקוב אחר הנהג",

  // Track driver
  "Track Your Driver": "עקוב אחר הנהג שלך",
  "RIDE STATUS": "סטטוס נסיעה",
  Assigned: "שובץ",
  "On the Way": "בדרך",
  Arrived: "הגיע",
  "In Progress": "בתהליך",
  "View History": "צפה בהיסטוריה",
  "~12 min away": "‎~12 דקות מרחק",
  "Trip Completed": "הנסיעה הושלמה",
  trips: "נסיעות",
  "Ride not found.": "הנסיעה לא נמצאה.",
  "Back to My Rides": "חזרה לנסיעות שלי",
  "Back to ride details": "חזרה לפרטי הנסיעה",
};

export function translate(text: string, locale: Locale): string {
  if (locale === "he") {
    return he[text] ?? text;
  }
  return text;
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
