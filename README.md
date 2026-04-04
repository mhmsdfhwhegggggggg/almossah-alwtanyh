# الموسسة الوطنية — واجهة أولية (نسخة تجريبية)

هذا المشروع هو سكافولد واجهة موقع عربي (RTL) مستوحى من بنية موقع موسسة الحمدي.
المحتوى الحالي تجريبي (نصوص وصور مؤقتة). الهدف هو إنشاء موقع يمكنك تعديله وربطه لاحقًا بنظام إدارة محتوى (CMS) مثل Strapi أو Sanity.

## ما يحتويه المشروع
- Next.js صفحات: `index`, `about`, `projects`, `posts`, `donate`, `contact`
- Tailwind CSS مُهيأ (ملفات التكوين موجودة)
- بيانات تجريبية في `data/sample.json`

## تشغيل محلي (Windows PowerShell)
1. افتح نافذة PowerShell في مجلد المشروع: `c:\Users\mohammd alkmaliy\Pictures\موقع الموسسه الوطنية`
2. ثبت الحزم:

```powershell
npm install
```

المشروع يستخدم المكتبات التالية، تأكد من تثبيتها:
```powershell
npm install react-markdown framer-motion react-intersection-observer
npm install
```

3. شغّل بيئة التطوير:

```powershell
npm run dev
```

ثم افتح http://localhost:3000

## ربط مع CMS لاحقًا
للبقاء متوافقين مع طلبك (وجود نظام إدارة محتوى):

- يمكنك نشر Strapi (أو أي CMS headless) واستبدال القراءة من `data/sample.json` باستدعاءات API من الـ CMS داخل `getStaticProps` أو `getServerSideProps`.
- سأقدّم لاحقًا ملف تعريف Strapi (نماذج Content Types مثل Project, Post, Donation) وملف `env.example` لتكوين مفاتيح الـ API.

## تشغيل Strapi (لوحة إدارة المحتوى)
يمكنك تشغيل Strapi محليًا بسرعة عبر Docker Compose الموجود في `cms/docker-compose.yml`.

1. افتح PowerShell داخل المجلد `cms` ثم شغّل:

```powershell
cd .\cms
docker compose up -d
```

2. بعد تشغيل الحاوية اذهب إلى: `http://localhost:1337/admin` لإنشاء حساب المشرف.

3. ضع عنوان Strapi في `.env` المشروع الجذري أو قم بإنشاء ملف `.env.local` داخل مجلد المشروع وأضف:

```text
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

4. أعد تشغيل واجهة Next.js إن كانت تعمل حتى تبدأ بقراءة البيانات من Strapi تلقائيًا.

ملاحظة: الحاوية تستخدم قاعدة بيانات SQLite داخل `cms/data` لذا المحتوى سيُحفظ محليًا داخل مجلد المشروع.

## خطوات مقترحة لاحقًا (أقوم بها عند تأكيدك)
1. إعداد Strapi أو Sanity وتكوين Content Types.
2. ربط صفحات البيانات (مشاريع/أخبار/تبرعات) باستدعاءات API حقيقية.
3. إضافة نظام دفع (Stripe/PayPal أو بوابة محلية) وتأمين endpoints.
4. تحسين التصميم، إضافة صور وشعار، وضبط SEO والـ accessibility.

إذا تريد أبدأ الآن بربط Strapi وأعد لوحة إدارة يمكنك استخدامها لإدخال المحتوى — أخبرني وأهيئ لك الباك‑إند أو أزوّدك تعليمات النشر.
