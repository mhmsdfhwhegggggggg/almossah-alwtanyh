import { FaBookOpen, FaHandHoldingWater, FaSeedling, FaShieldAlt, FaBriefcase, FaFirstAid, FaPeace } from 'react-icons/fa'

const fields = [
  {
    name: 'الإغاثة الإنسانية',
    description: 'استجابة سريعة للاحتياجات العاجلة في أوقات الأزمات.',
    Icon: FaFirstAid,
  },
  {
    name: 'التمكين الاقتصادي',
    description: 'مشاريع مدرة للدخل وتدريب مهني لتحقيق الاستدامة.',
    Icon: FaBriefcase,
  },
  {
    name: 'التعليم',
    description: 'دعم الطلاب والمدارس لضمان استمرارية العملية التعليمية.',
    Icon: FaBookOpen,
  },
  {
    name: 'المياه والبيئة',
    description: 'تنفيذ مشاريع مياه الشرب وحفر الآبار للحفاظ على البيئة.',
    Icon: FaHandHoldingWater,
  },
  {
    name: 'الحماية',
    description: 'برامج دعم نفسي واجتماعي للفئات الأكثر ضعفًا.',
    Icon: FaShieldAlt,
  },
  {
    name: 'التنمية وبناء السلام',
    description: 'مبادرات مجتمعية لتعزيز التماسك الاجتماعي وبناء السلام.',
    Icon: FaPeace,
  },
]

export default function WorkFields() {
  return (
    <div className="py-16 my-8">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">مجالات عملنا</h2>
          <p className="mt-4 text-lg text-gray-600">نركز جهودنا على القطاعات الأكثر تأثيرًا في حياة الناس.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {fields.map((field) => (
            <div key={field.name} className="group text-center p-8 bg-white rounded-lg border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 group-hover:bg-brand-primary mx-auto mb-6 transition-colors duration-300">
                <field.Icon className="h-8 w-8 text-brand-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand-primary transition-colors duration-300">
                {field.name}
              </h3>
              <p className="mt-2 text-base text-gray-600">{field.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}