import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import NewsCard from './NewsCard';

// Import Swiper with no SSR
const SwiperComponent = dynamic(
  () => import('./Swiper').then(mod => mod.default),
  { ssr: false }
);

const SwiperSlide = dynamic(
  () => import('./Swiper').then(mod => mod.SwiperSlide),
  { ssr: false }
);

export default function NewsCarousel({ news = [] }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  // Sample news data if none provided
  const defaultNews = [
    {
      id: 1,
      title: 'المؤسسة تطلق حملة العودة للمدارس',
      excerpt: 'أطلقت المؤسسة حملة العودة للمدارس لتوفير المستلزمات المدرسية لـ 1000 طالب وطالبة من الأسر المحتاجة',
      imageUrl: '/images/news/back-to-school.jpg',
      category: 'أخبار',
      date: '2023-08-15',
      author: 'فريق الإعلام',
      authorImage: '/images/team/member1.jpg'
    },
    {
      id: 2,
      title: 'حفل تكريم المتطوعين المتميزين',
      excerpt: 'احتفلت المؤسسة بتكريم 50 متطوعاً متميزاً ساهموا في نجاح أنشطتها وفعالياتها خلال العام الماضي',
      imageUrl: '/images/news/volunteers.jpg',
      category: 'فعاليات',
      date: '2023-07-28',
      author: 'قسم التطوع',
      authorImage: '/images/team/member2.jpg'
    },
    {
      id: 3,
      title: 'انطلاق مشروع سقيا الماء',
      excerpt: 'وصل عدد الآبار التي تم حفرها ضمن مشروع سقيا الماء إلى 50 بئراً في المناطق النائية',
      imageUrl: '/images/news/water-project.jpg',
      category: 'مشاريع',
      date: '2023-07-10',
      author: 'قسم المشاريع',
      authorImage: '/images/team/member3.jpg'
    },
    {
      id: 4,
      title: 'تقرير الربع الثاني 2023',
      excerpt: 'أصدرت المؤسسة تقريرها الربع سنوي عن إنجازاتها وأنشطتها خلال الربع الثاني من العام 2023',
      imageUrl: '/images/news/report.jpg',
      category: 'تقارير',
      date: '2023-06-30',
      author: 'إدارة التخطيط',
      authorImage: '/images/team/member4.jpg'
    },
  ];

  const displayNews = news.length > 0 ? news : defaultNews;

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          آخر الأخبار والفعاليات
        </h2>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button 
            onClick={() => swiperRef.current?.slidePrev()}
            className={`swiper-button-prev-news w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors ${isBeginning ? 'opacity-30 cursor-not-allowed' : ''}`}
            aria-label="السابق"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          
          <button 
            onClick={() => swiperRef.current?.slideNext()}
            className={`swiper-button-next-news w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors ${isEnd ? 'opacity-30 cursor-not-allowed' : ''}`}
            aria-label="التالي"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      <SwiperComponent
        ref={swiperRef}
        spaceBetween={30}
        slidesPerView={1}
        loop={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="pb-12 px-2"
      >
        {displayNews.map((newsItem, index) => (
          <SwiperSlide key={newsItem.id} className="pb-10">
            <NewsCard news={newsItem} index={index} />
          </SwiperSlide>
        ))}
      </SwiperComponent>

      {/* Pagination */}
      <div className="news-pagination flex items-center justify-center mt-6"></div>

      {/* View All Button */}
      <div className="text-center mt-10">
        <a 
          href="/news" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          عرض جميع الأخبار
          <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
