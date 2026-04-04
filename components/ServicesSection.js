import { motion } from 'framer-motion';

const services = [
  {
    title: 'البرامج التعليمية',
    description: 'نقدم برامج تعليمية متكاملة تشمل المناهج الدراسية والأنشطة اللاصفية لضمان تعليم شامل ومتكامل.',
    icon: '🎓',
    color: 'bg-red-100 text-red-600',
    delay: 0.1
  },
  {
    title: 'الرعاية الصحية',
    description: 'خدمات طبية شاملة تشمل الكشف المبكر والعلاج والمتابعة المستمرة لضمان صحة أفضل للمستفيدين.',
    icon: '🏥',
    color: 'bg-yellow-100 text-yellow-600',
    delay: 0.2
  },
  {
    title: 'التدريب المهني',
    description: 'برامج تدريبية متخصصة تهدف إلى تطوير المهارات وزيادة فرص التوظيف للشباب.',
    icon: '🔧',
    color: 'bg-green-100 text-green-600',
    delay: 0.3
  },
  {
    title: 'الدعم النفسي',
    description: 'جلسات إرشادية وبرامج دعم نفسي لتحسين الصحة النفسية للمستفيدين.',
    icon: '💆',
    color: 'bg-blue-100 text-blue-600',
    delay: 0.4
  }
];

export default function ServicesSection() {
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
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا المتميزة</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات المتميزة التي تلبي احتياجات عملائنا بجودة عالية وكفاءة منقطعة النظير.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${service.color} bg-opacity-20 backdrop-blur-sm`}
              transition={{ delay: service.delay, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className={`w-16 h-16 ${service.color} bg-opacity-30 rounded-xl flex items-center justify-center text-3xl mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <button className="text-red-600 font-medium flex items-center hover:text-red-700 transition-colors">
                المزيد من التفاصيل
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
