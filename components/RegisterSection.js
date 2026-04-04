import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';

const RegisterSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    education: '',
    birthDate: '',
    programType: '',
    university: '',
    specialization: '',
    academicYear: '',
    trainingInterest: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to the API endpoint
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء إرسال الطلب');
      }
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        programType: '',
        university: '',
        specialization: '',
        academicYear: '',
        trainingInterest: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">سجل الآن</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              سجل الآن للاستفادة من برامجنا التعليمية والتدريبية والمنح الدراسية
            </p>
          </div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h3>
              <p className="text-gray-600 mb-6">
                شكراً لتسجيلك معنا. سنقوم بالاتصال بك قريباً لتأكيد طلبك وتزويدك بالمزيد من التفاصيل.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                تقديم طلب جديد
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* الاسم الكامل */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                    placeholder="الاسم الكامل"
                    required
                  />
                </div>

                {/* البريد الإلكتروني */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                    placeholder="البريد الإلكتروني"
                    required
                  />
                </div>

                {/* رقم الجوال */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaPhone />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                    placeholder="رقم الجوال"
                    required
                  />
                </div>

                {/* المدينة */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaMapMarkerAlt />
                  </div>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5 appearance-none"
                    required
                  >
                    <option value="">اختر المدينة</option>
                    <option value="صنعاء">صنعاء</option>
                    <option value="عدن">عدن</option>
                    <option value="تعز">تعز</option>
                    <option value="الحديدة">الحديدة</option>
                    <option value="حضرموت">حضرموت</option>
                    <option value="إب">إب</option>
                    <option value="ذمار">ذمار</option>
                    <option value="المحويت">المحويت</option>
                    <option value="البيضاء">البيضاء</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                {/* نوع البرنامج */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaGraduationCap />
                  </div>
                  <select
                    id="programType"
                    name="programType"
                    value={formData.programType}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5 appearance-none"
                    required
                  >
                    <option value="">اختر نوع البرنامج</option>
                    <option value="منحة دراسية كاملة">منحة دراسية كاملة</option>
                    <option value="تخفيض دراسي">تخفيض دراسي</option>
                    <option value="دورات تدريبية">دورات تدريبية</option>
                    <option value="برامج تأهيلية">برامج تأهيلية</option>
                  </select>
                </div>

                {/* الجامعة أو الكلية */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaGraduationCap />
                  </div>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                    placeholder="اسم الجامعة أو الكلية"
                    required
                  />
                </div>

                {/* التخصص */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaGraduationCap />
                  </div>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                    placeholder="التخصص"
                    required
                  />
                </div>

                {/* السنة الدراسية */}
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FaCalendarAlt />
                  </div>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5 appearance-none"
                  >
                    <option value="">اختر السنة الدراسية</option>
                    <option value="الأولى">الأولى</option>
                    <option value="الثانية">الثانية</option>
                    <option value="الثالثة">الثالثة</option>
                    <option value="الرابعة">الرابعة</option>
                    <option value="الخمسية+">الخامسة فأعلى</option>
                  </select>
                </div>

                {/* اهتمامات التدريب (اختياري) */}
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 right-0 flex items-start pr-3 pt-2 pointer-events-none text-gray-400">
                    <FaGraduationCap />
                  </div>
                  <input
                    type="text"
                    id="trainingInterest"
                    name="trainingInterest"
                    value={formData.trainingInterest}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 p-2.5"
                    placeholder="مجالات الدورات التدريبية التي تهمك (اختياري)"
                  />
                </div>

                {/* ملاحظات إضافية (اختياري) */}
                <div className="relative md:col-span-2">
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="ملاحظات إضافية (اختياري)"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الإرسال...
                    </>
                  ) : (
                    'تسجيل الآن'
                  )}
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-gray-500">
                سنقوم بالاتصال بك قريباً لتأكيد طلبك وتزويدك بالمزيد من التفاصيل.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterSection;
