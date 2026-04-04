import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
  FaPhone, FaEnvelope, FaHome, FaInfoCircle, FaProjectDiagram, 
  FaNewspaper, FaEnvelopeOpenText, FaUserPlus, FaSearch, 
  FaTimes, FaChevronDown, FaChevronUp, FaFacebookF, 
  FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp,
  FaMapMarkerAlt
} from 'react-icons/fa';

// قوائم التنقل
const navItems = [
  { label: 'لوحة التحكم', href: '/admin/dashboard', isAdmin: true },
  { label: 'الرئيسية', href: '/' },
  { 
    label: 'عن المؤسسة', 
    href: '/about',
    submenu: [
      { label: 'من نحن', href: '/about' },
      { label: 'رؤيتنا ورسالتنا', href: '/about#vision' },
      { label: 'أهدافنا', href: '/about#goals' },
      { label: 'فريق العمل', href: '/about#team' },
    ]
  },
  { 
    label: 'خدماتنا', 
    href: '/services',
    submenu: [
      { label: 'الخدمات التعليمية', href: '/services/education' },
      { label: 'الخدمات الطبية', href: '/services/medical' },
      { label: 'البرامج الأكاديمية', href: '/services/academic' },
      { label: 'الدورات التدريبية', href: '/services/training' },
    ]
  },
  { 
    label: 'البرامج', 
    href: '/programs',
    submenu: [
      { label: 'المنح الدراسية', href: '/programs/scholarships' },
      { label: 'التخفيضات الجامعية', href: '/programs/discounts' },
      { label: 'برامج التأمين الطبي', href: '/programs/insurance' },
    ]
  },
  { 
    label: 'المركز الإعلامي',
    href: '/media',
    submenu: [
      { label: 'الأخبار', href: '/media/news' },
      { label: 'الفعاليات', href: '/media/events' },
    ]
  },
  { label: 'ابحث عنا', href: '/find-us' },
  { label: 'اتصل بنا', href: '/contact' },
  { 
    label: 'سجل الآن', 
    href: '/register',
    isButton: true
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // تتبع التمرير لإضافة تأثير التظليل
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // إغلاق القوائم المنسدلة عند تغيير الصفحة
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
  }, [router.pathname]);

  // منع التمرير عند فتح القائمة
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <>
      {/* شريط المعلومات العلوي */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="tel:+966123456789" className="flex items-center hover:text-yellow-300 transition-colors">
              <FaPhone className="ml-1 text-yellow-400" />
              <span>+966 12 345 6789</span>
            </a>
            <a href="mailto:info@national-institution.com" className="hidden md:flex items-center hover:text-yellow-300 transition-colors">
              <FaEnvelope className="ml-1 text-yellow-400" />
              <span>info@national-institution.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <FaYoutube />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* الهيدر الرئيسي */}
      <header className={`sticky top-0 z-40 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* الشعار */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center">
                <div className="text-2xl md:text-3xl font-bold">
                  <span className="text-red-700">الو</span>
                  <span className="text-yellow-500">ط</span>
                  <span className="text-green-600">نية</span>
                </div>
                <div className="mr-2 text-right">
                  <div className="text-lg md:text-xl font-bold text-gray-800">المؤسسة</div>
                  <div className="text-xs text-gray-600">للتعليم والرعاية الطبية</div>
                </div>
              </div>
            </Link>

            {/* القائمة الرئيسية */}
            <nav className="hidden lg:flex items-center space-x-1 space-x-reverse">
{navItems.filter(item => !item.isAdmin).map((item, index) => (
                <div key={index} className="relative group">
                  <Link 
                    href={item.href}
                    className={`px-4 py-2 flex items-center font-medium transition-colors ${
                      item.isButton 
                        ? 'bg-primary-600 hover:bg-primary-700 text-white rounded-md px-4 py-2 mx-2' 
                        : `text-gray-700 hover:text-primary-600 ${router.pathname === item.href ? 'text-primary-600' : ''}`
                    }`}
                  >
                    {item.isButton && <FaUserPlus className="ml-2" />}
                    {item.label}
                    {item.submenu && !item.isButton && (
                      <span className="mr-1">
                        <FaChevronDown className="text-xs mt-1" />
                      </span>
                    )}
                  </Link>
                  
                  {item.submenu && (
                    <div className="absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* أزرار إضافية */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="بحث"
              >
                {isSearchOpen ? <FaTimes /> : <FaSearch />}
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
                aria-label="القائمة"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>

          {/* شريط البحث */}
          {isSearchOpen && (
            <div className="py-3 border-t">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="ابحث في الموقع..."
                  className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaSearch />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* القائمة الجانبية للموبايل */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <div className="h-12 w-12 relative">
                    <Image 
                      src="/logo.png" 
                      alt="شعار المؤسسة الوطنية" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <span className="mr-2 font-bold text-lg">القائمة</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-2">
                <nav className="space-y-1">
                  {navItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100">
                      <div 
                        className="flex justify-between items-center px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer"
                        onClick={() => item.submenu ? toggleSubmenu(index) : router.push(item.href)}
                      >
                        <span className="flex items-center">
                          {item.label === 'الرئيسية' && <FaHome className="ml-2" />}
                          {item.label === 'عن المؤسسة' && <FaInfoCircle className="ml-2" />}
                          {item.label === 'مشاريعنا' && <FaProjectDiagram className="ml-2" />}
                          {item.label === 'المركز الإعلامي' && <FaNewspaper className="ml-2" />}
                          {item.label === 'التبرعات' && <FaDonate className="ml-2" />}
                          {item.label === 'ابحث عنا' && <FaMapMarkerAlt className="ml-2" />}
                          {item.label === 'اتصل بنا' && <FaEnvelopeOpenText className="ml-2" />}
                          {item.label}
                        </span>
                        {item.submenu && (
                          <span className="text-gray-400">
                            {openSubmenu === index ? <FaChevronUp /> : <FaChevronDown />}
                          </span>
                        )}
                      </div>
                      
                      {item.submenu && openSubmenu === index && (
                        <div className="bg-gray-50 py-2">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary-600"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                
                <div className="p-4 border-t mt-4">
                  <Link 
                    href="/register" 
                    className="flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-md font-medium transition-colors mb-3"
                  >
                    <FaUserPlus className="ml-2" />
                    سجل الآن
                  </Link>
                  
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="فيسبوك">
                      <FaFacebookF size={18} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="تويتر">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="انستغرام">
                      <FaInstagram size={18} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary-600" aria-label="يوتيوب">
                      <FaYoutube size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
