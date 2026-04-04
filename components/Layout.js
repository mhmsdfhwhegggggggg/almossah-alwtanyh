import { useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children, pageTitle = 'المؤسسة الوطنية للتنمية' }) {
  const router = useRouter();

  // Add smooth scroll behavior
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add smooth scroll behavior for anchor links
      const handleAnchorClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
          e.preventDefault();
          const id = target.getAttribute('href');
          if (id === '#') return;
          
          const element = document.querySelector(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      return () => document.removeEventListener('click', handleAnchorClick);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{`${pageTitle} | المؤسسة الوطنية للتعليم والرعاية الطبية`}</title>
        <meta name="description" content="المؤسسة الوطنية للتعليم والرعاية الطبية - نقدم خدمات تعليمية وطبية متميزة لبناء مستقبل أفضل" />
        <meta name="keywords" content="تعليم, رعاية طبية, منح دراسية, عيادات, برامج تعليمية, رعاية صحية" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#1E40AF" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="المؤسسة الوطنية للتعليم والرعاية الطبية" />
        <meta property="og:url" content={`https://yourdomain.com${router.asPath}`} />
        <meta property="og:title" content={`${pageTitle} | المؤسسة الوطنية للتعليم والرعاية الطبية`} />
        <meta property="og:description" content="المؤسسة الوطنية للتعليم والرعاية الطبية - نقدم خدمات تعليمية وطبية متميزة لبناء مستقبل أفضل" />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://yourdomain.com${router.asPath}`} />
        <meta property="twitter:title" content={`${pageTitle} | المؤسسة الوطنية للتعليم والرعاية الطبية`} />
        <meta property="twitter:description" content="المؤسسة الوطنية للتعليم والرعاية الطبية - نقدم خدمات تعليمية وطبية متميزة لبناء مستقبل أفضل" />
        <meta property="twitter:image" content="/images/og-image.jpg" />
      </Head>

      {/* Announcement Bar */}
      <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm">
        <div className="container mx-auto">
          <p>🎓 التقديم مفتوح الآن للبرامج التعليمية والمنح الدراسية للعام 2024-2025</p>
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
        aria-label="تواصل معنا على واتساب"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.498 14.382v-.002c-.301-.15-1.767-.87-2.04-.966-.273-.1-.473-.148-.673.15-.197.295-.771.961-.944 1.16-.175.196-.35.22-.646.075-.3-.15-1.27-.47-2.39-1.475-.888-.795-1.484-1.77-1.66-2.07-.17-.3-.02-.465.13-.615.137-.135.3-.345.45-.523.15-.18.2-.3.3-.5.1-.195.05-.36-.025-.51-.075-.15-.673-1.63-.922-2.21-.24-.61-.487-.51-.673-.52-.172-.01-.371-.01-.571-.01-.2 0-.52.075-.79.36-.274.3-1.046 1.02-1.046 2.49s1.07 2.88 1.22 3.08c.15.195 2.1 3.2 5.08 4.48.714.3 1.27.48 1.71.63.714.227 1.36.195 1.87.12.574-.08 1.77-.72 2.02-1.43.25-.71.25-1.32.17-1.43-.07-.105-.23-.166-.53-.316m-5.45 7.113h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.878 9.878 0 01-1.52-5.26c.01-5.45 4.4-9.885 9.84-9.885 2.64 0 5.145 1.035 7.02 2.91 1.875 1.86 2.91 4.35 2.895 6.99-.01 5.444-4.395 9.884-9.84 9.884M20.52 3.45C18.24 1.14 15.24 0 12.03 0 5.645-.01.525 5.09.525 11.45c0 1.95.505 3.87 1.47 5.56L0 24l7.26-1.92c1.65.89 3.51 1.365 5.39 1.37h.005c6.385 0 11.505-5.1 11.505-11.46 0-3.21-1.25-6.24-3.525-8.52"/>
        </svg>
      </a>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 z-50"
        aria-label="العودة للأعلى"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
