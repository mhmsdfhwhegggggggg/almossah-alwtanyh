import Link from 'next/link';
import { 
  FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaGraduationCap, FaUserMd, FaBook
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media links
  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <FaYoutube size={20} />, href: '#', label: 'YouTube' },
    { icon: <FaLinkedin size={20} />, href: '#', label: 'LinkedIn' },
  ];

  // Quick links
  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'عن المؤسسة', href: '/about' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'برامجنا', href: '/programs' },
    { name: 'الأخبار والفعاليات', href: '/news' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  // Work sectors
  const workSectors = [
    { 
      name: 'المنح الدراسية', 
      href: '/programs/scholarships', 
      icon: <FaGraduationCap className="ml-2" /> 
    },
    { 
      name: 'التخفيضات الجامعية', 
      href: '/programs/discounts', 
      icon: <FaGraduationCap className="ml-2" /> 
    },
    { 
      name: 'التأمين الصحي', 
      href: '/programs/insurance', 
      icon: <FaUserMd className="ml-2" /> 
    },
    { 
      name: 'الدورات التدريبية', 
      href: '/services/training', 
      icon: <FaBook className="ml-2" /> 
    },
    { 
      name: 'البرامج الأكاديمية', 
      href: '/services/academic', 
      icon: <FaBook className="ml-2" /> 
    },
  ];

  // Contact info
  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt className="flex-shrink-0" />, 
      text: 'اليمن - صنعاء',
      href: 'https://maps.google.com'
    },
    { 
      icon: <FaPhone className="flex-shrink-0" />, 
      text: '+967 1 234 5678',
      href: 'tel:+96712345678'
    },
    { 
      icon: <FaWhatsapp className="flex-shrink-0" />, 
      text: '+967 7 123 4567',
      href: 'https://wa.me/96771234567'
    },
    { 
      icon: <FaEnvelope className="flex-shrink-0" />, 
      text: 'info@national-institution.com',
      href: 'mailto:info@national-institution.com'
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">
                <span className="text-red-400">الو</span>
                <span className="text-yellow-400">ط</span>
                <span className="text-white">نية</span>
              </div>
              <h3 className="text-xl font-bold">المؤسسة</h3>
            </div>
            <p className="text-gray-200">
              نقدم خدمات تعليمية وطبية متميزة لبناء مستقبل أفضل للأجيال القادمة من خلال برامج ومنح دراسية وخدمات طبية متكاملة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors flex items-center"
                  >
                    <span className="ml-2">•</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Sectors */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">مجالات عملنا</h3>
            <ul className="space-y-2">
              {workSectors.map((sector, index) => (
                <li key={index}>
                  <Link 
                    href={sector.href}
                    className="text-gray-200 hover:text-white transition-colors flex items-center"
                  >
                    {sector.icon}
                    <span>{sector.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">اتصل بنا</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-400 mt-1 ml-2">
                    {info.icon}
                  </span>
                  <a 
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {info.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} المؤسسة الوطنية. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
