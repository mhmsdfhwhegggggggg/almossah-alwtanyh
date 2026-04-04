import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NewsCard({ news, index = 0 }) {
  // Format date in Arabic
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: 'islamic-umalqura',
      numberingSystem: 'arab'
    };
    
    // If dateString is not provided, return current date
    const date = dateString ? new Date(dateString) : new Date();
    
    return new Intl.DateTimeFormat('ar-SA', options).format(date);
  };

  return (
    <motion.article 
      className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden h-48">
        <Image
          src={news.imageUrl || '/images/news-placeholder.jpg'}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        {news.category && (
          <span className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            {news.category}
          </span>
        )}
        
        {/* Date Overlay */}
        <div className="absolute bottom-0 right-0 bg-primary-700 text-white text-sm font-medium px-3 py-1 rounded-tl-lg">
          {formatDate(news.date)}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {news.title || 'عنوان الخبر'}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {news.excerpt || 'ملخص موجز عن الخبر أو المقال المذكور في هذه البطاقة...'}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            {/* Author Info */}
            <div className="flex items-center">
              {news.authorImage && (
                <div className="w-8 h-8 rounded-full overflow-hidden ml-2">
                  <Image 
                    src={news.authorImage} 
                    alt={news.author || 'كاتب الخبر'} 
                    width={32} 
                    height={32}
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-sm text-gray-600">
                {news.author || 'فريق المؤسسة'}
              </span>
            </div>
            
            {/* Read More Link */}
            <Link 
              href={`/news/${news.id || '#'}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors"
            >
              اقرأ المزيد
              <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
