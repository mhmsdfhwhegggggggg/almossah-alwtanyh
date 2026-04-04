import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import Link from 'next/link';
import { FaChevronRight, FaChevronLeft, FaPlay } from 'react-icons/fa';

export default function Hero({ title, subtitle, imageUrl }) {
  
  // بيانات السلايدر
  const slides = [
    {
      id: 1,
      title: 'المؤسسة الوطنية للتنمية',
      subtitle: 'نعمل من أجل تنمية مستدامة ومجتمع واعٍ متكامل',
      image: imageUrl || '/images/hero-1.jpg',
      buttonText: 'تعرف علينا',
      buttonLink: '/about',
      videoId: 'video1'
    },
    {
      id: 2,
      title: 'مشاريع تنموية مستدامة',
      subtitle: 'نساهم في بناء مستقبل أفضل للأجيال القادمة',
      image: imageUrl || '/images/hero-2.jpg',
      buttonText: 'تصفح المشاريع',
      buttonLink: '/projects',
      videoId: 'video2'
    },
    {
      id: 3,
      title: 'ساهم معنا في صنع الفرق',
      subtitle: 'تبرعك يحدث تغييراً إيجابياً في حياة المحتاجين',
      image: imageUrl || '/images/hero-3.jpg',
      buttonText: 'تبرع الآن',
      buttonLink: '/donate',
      videoId: 'video3'
    }
  ];

  // تأثير الفيديو للخلفية
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const toggleVideo = (videoId) => {
    const video = document.getElementById(videoId);
    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  if (title) {
    return (
      <section className="relative h-[50vh] min-h-[300px] bg-gray-800 text-white flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={imageUrl || '/images/default-hero.jpg'} alt={title} className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          {subtitle && <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* فيديو الخلفية */}
      <div className="absolute inset-0 z-0">
        <video
          id="hero-video"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* السلايدر */}
      <div className="relative z-10 h-full">
        <Swiper
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="swiper h-full"
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="container h-full flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fadeInUp">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fadeInUp animation-delay-200">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-400">
                    <Link 
                      href={slide.buttonLink}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center"
                    >
                      {slide.buttonText}
                      <FaChevronLeft className="mr-2" />
                    </Link>
                    <button 
                      onClick={() => toggleVideo(slide.videoId)}
                      className="flex items-center text-white hover:text-primary-200 transition-colors"
                      aria-label="تشغيل الفيديو"
                    >
                      <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-2">
                        <FaPlay className="text-primary-500" />
                      </span>
                      <span>مشاهدة الفيديو</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* عناصر التحكم */}
          <div className="absolute bottom-12 left-0 right-0 z-20">
            <div className="container">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="swiper-pagination hero-pagination"></div>
                  <div className="text-white text-sm">
                    <span className="font-bold">{String(activeSlide + 1).padStart(2, '0')}</span>
                    <span className="mx-1">/</span>
                    <span className="text-gray-300">{String(slides.length).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button className="swiper-button-prev w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <FaChevronRight />
                  </button>
                  <button className="swiper-button-next w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <FaChevronLeft />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Swiper>
      </div>

      {/* فيديو مودال */}
      <div id="video-modal" className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center hidden">
        <button 
          className="absolute top-4 left-4 text-white text-2xl"
          onClick={() => {
            document.getElementById('video-modal').classList.add('hidden');
            document.querySelectorAll('video').forEach(v => v.pause());
          }}
        >
          ✕
        </button>
        <video 
          id="modal-video" 
          controls 
          className="w-full max-w-4xl h-auto max-h-[80vh]"
        >
          <source src="/videos/promo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
