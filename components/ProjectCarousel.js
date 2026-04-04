import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ProjectCard from './ProjectCard';

// Import Swiper with no SSR
const SwiperComponent = dynamic(
  () => import('./Swiper').then(mod => mod.default),
  { ssr: false }
);

const SwiperSlide = dynamic(
  () => import('./Swiper').then(mod => mod.SwiperSlide),
  { ssr: false }
);

export default function ProjectCarousel({ projects = [] }) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  // Sample projects if none provided
  const defaultProjects = [
    {
      id: 1,
      title: 'كفالة الأيتام',
      excerpt: 'رعاية متكاملة للأيتام وتأمين مستقبلهم التعليمي والمعيشي',
      imageUrl: '/images/projects/orphan-care.jpg',
      category: 'رعاية اجتماعية',
      progress: 75,
      tags: ['كفالات', 'تعليم', 'رعاية'],
      donated: 375000,
      target: 500000
    },
    {
      id: 2,
      title: 'سقيا الماء',
      excerpt: 'حفر الآبار وتوفير مياه الشرب النظيفة للمجتمعات الفقيرة',
      imageUrl: '/images/projects/water-well.jpg',
      category: 'إغاثة',
      progress: 100,
      tags: ['مياه', 'إغاثة', 'تنمية'],
      duration: 'مكتمل'
    },
    {
      id: 3,
      title: 'التمكين الاقتصادي',
      excerpt: 'تمكين الأسر الفقيرة من خلال المشاريع الصغيرة',
      imageUrl: '/images/projects/empowerment.jpg',
      category: 'تنمية',
      progress: 45,
      tags: ['تمويل', 'تدريب', 'أسر'],
      donated: 225000,
      target: 500000
    },
    {
      id: 4,
      title: 'كفالة الطلاب',
      excerpt: 'دعم تعليمي متكامل للطلاب المتفوقين غير القادرين',
      imageUrl: '/images/projects/education.jpg',
      category: 'تعليم',
      progress: 30,
      tags: ['تعليم', 'طلاب', 'منح']
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="relative">
      <SwiperComponent
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
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
        {displayProjects.map((project, index) => (
          <SwiperSlide key={project.id} className="pb-10">
            <ProjectCard project={project} index={index} />
          </SwiperSlide>
        ))}
      </SwiperComponent>

      {/* أزرار التنقل المخصصة */}
      <div className="swiper-pagination !relative !mt-8"></div>
      <div className="swiper-button-prev !left-0"></div>
      <div className="swiper-button-next !right-0"></div>
    </div>
  )
}