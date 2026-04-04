import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Partners({ partners = [] }) {
  // Sample partners data if none provided
  const defaultPartners = [
    {
      id: 1,
      name: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      logo: '/images/partners/mrsd.png',
      type: 'حكومي',
      since: '2018'
    },
    {
      id: 2,
      name: 'بنك التنمية الاجتماعية',
      logo: '/images/partners/sdb.png',
      type: 'مصرفي',
      since: '2019'
    },
    {
      id: 3,
      name: 'جمعية البر بالمنطقة الشرقية',
      logo: '/images/partners/berr.png',
      type: 'جمعية خيرية',
      since: '2020'
    },
    {
      id: 4,
      name: 'أرامكو السعودية',
      logo: '/images/partners/aramco.png',
      type: 'قطاع خاص',
      since: '2021'
    },
    {
      id: 5,
      name: 'الغرفة التجارية بالمنطقة الشرقية',
      logo: '/images/partners/chamber.png',
      type: 'قطاع خاص',
      since: '2019'
    },
    {
      id: 6,
      name: 'هيئة الهلال الأحمر السعودي',
      logo: '/images/partners/srca.png',
      type: 'إنساني',
      since: '2020'
    },
  ];

  const displayPartners = partners.length > 0 ? partners : defaultPartners;
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...displayPartners, ...displayPartners];

  if (displayPartners.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            شركاء النجاح
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            نفتخر بشراكتنا مع أبرز المؤسسات والهيئات المحلية والدولية لتحقيق أهدافنا المشتركة في خدمة المجتمع
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
          <div 
            ref={containerRef}
            className={`flex items-center space-x-8 rtl:space-x-reverse ${isMobile ? 'overflow-x-auto pb-6' : 'overflow-hidden'}`}
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
              WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
            }}
          >
            {!isMobile ? (
              // Desktop: Animated marquee
              <div 
                className={`flex items-center ${isHovered ? 'pause-animation' : ''}`}
                style={{
                  animation: 'marquee 40s linear infinite',
                  animationPlayState: isHovered ? 'paused' : 'running',
                }}
              >
                {duplicatedPartners.map((partner, index) => (
                  <motion.div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 mx-4 md:mx-8 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    style={{ width: '180px', height: '120px' }}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, 180px"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-xs text-gray-500">{partner.type}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Mobile: Scrollable list
              <div className="flex space-x-8 rtl:space-x-reverse px-4">
                {displayPartners.map((partner) => (
                  <motion.div
                    key={partner.id}
                    className="flex-shrink-0 bg-white p-4 rounded-xl shadow-sm"
                    style={{ width: '140px', height: '100px' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain p-1"
                        sizes="(max-width: 768px) 140px, 100%"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {!isMobile && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-gray-500 text-sm">
              يمكنك التمرير أفقيًا لعرض جميع شركائنا
            </p>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* For Webkit-based browsers (Chrome, Safari and Opera) */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* For IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Pause animation on hover */
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}