import { motion } from 'framer-motion';
import Counter from './Counter';

export default function Stats({ stats = [] }) {
  // Default stats if none provided
  const defaultStats = [
    { id: 1, name: 'مشروع منجز', value: 150, suffix: '+', icon: '🏗️' },
    { id: 2, name: 'متطوع', value: 500, suffix: '+', icon: '👥' },
    { id: 3, name: 'مستفيد', value: 10000, suffix: '+', icon: '🙌' },
    { id: 4, name: 'ساعة تطوع', value: 50000, suffix: '+', icon: '⏱️' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-200 opacity-10 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-secondary-200 opacity-20 rounded-full -z-0"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-4 py-2 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
            إنجازاتنا
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            أرقامنا تتحدث عنا
          </h2>
          <p className="text-lg text-gray-600">
            نفتخر بما حققناه بفضل الله ثم دعمكم وثقتكم الغالية
          </p>
        </div>

        <motion.dl 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {displayStats.map((stat) => (
            <motion.div 
              key={stat.id} 
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              variants={item}
            >
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                {stat.icon || '📊'}
              </div>
              <dt className="text-4xl font-bold text-primary-700 mb-2">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix || ''}
                  prefix={stat.prefix || ''}
                  decimals={stat.decimals || 0}
                  duration={2.5}
                />
              </dt>
              <dd className="text-gray-600 text-lg">{stat.name}</dd>
              
              {/* Progress bar for some stats */}
              {stat.progress && (
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, stat.progress)}%` }}
                  ></div>
                </div>
              )}
              
              {stat.description && (
                <p className="mt-3 text-sm text-gray-500">{stat.description}</p>
              )}
            </motion.div>
          ))}
        </motion.dl>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a 
            href="/achievements" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
          >
            اكتشف المزيد من إنجازاتنا
            <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}