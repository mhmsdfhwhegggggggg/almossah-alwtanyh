import { motion } from 'framer-motion';

export default function AboutSection() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Stats data
  const stats = [
    { value: '15+', label: 'سنوات من الخبرة', icon: '🏆' },
    { value: '50+', label: 'برنامج تعليمي', icon: '📚' },
    { value: '10,000+', label: 'مستفيد', icon: '👥' },
    { value: '200+', label: 'خبير متخصص', icon: '👨‍⚕️' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={item} className="text-center mb-16">
            <span className="inline-block px-4 py-1 text-sm font-semibold text-red-600 bg-red-100 rounded-full mb-4">
              من نحن
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">المؤسسة الوطنية للتنمية</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={item} className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/about-us.jpg" 
                  alt="فريق العمل" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-red-500 rounded-2xl -z-10"></div>
            </motion.div>

            <motion.div variants={item} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">رؤيتنا ورسالتنا</h3>
              <p className="text-gray-600 leading-relaxed">
                نؤمن في المؤسسة الوطنية للتنمية بأن التعليم الجيد والرعاية الصحية حق أساسي لكل فرد. نسعى جاهدين لتحقيق التميز في تقديم خدمات تعليمية وطبية متكاملة تسهم في بناء مجتمع متعلم وصحي.
              </p>
              <p className="text-gray-600 leading-relaxed">
                نعمل على تطوير برامج مبتكرة تلبي احتياجات المجتمع، مع التركيز على الفئات الأكثر احتياجاً، ونحرص على تقديم خدمات عالية الجودة من خلال فريق من الخبراء المتخصصين.
              </p>
              
              <div className="pt-6">
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                  اقرأ المزيد عنا
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            variants={container}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
