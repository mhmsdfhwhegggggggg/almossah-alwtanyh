
import Hero from '../components/Hero'
import AnimatedSection from '../components/AnimatedSection'
import { FaCameraRetro, FaVideo } from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function GalleryById() {
	const router = useRouter()
	const { id } = router.query

	const title = id === 'photos' ? 'معرض الصور' : id === 'videos' ? 'معرض الفيديو' : 'المعرض'
	const subtitle = id === 'photos' ? 'لحظات من الميدان توثق قصص الأمل والعطاء.' : 'شاهد أثر مساهماتكم من خلال قصص مرئية ملهمة.'
	const Icon = id === 'photos' ? FaCameraRetro : FaVideo;

	return (
		<>
			<Hero title={title} subtitle={subtitle} />
			<AnimatedSection>
				<div className="py-20 text-center bg-gray-50 rounded-lg">
					<Icon className="mx-auto text-5xl text-brand-secondary mb-6" />
					<h2 className="text-3xl font-bold text-gray-800 mb-4">قريباً...</h2>
					<p className="text-lg text-gray-600 max-w-md mx-auto">نعمل حاليًا على تجهيز هذه الصفحة بأجمل اللقطات والقصص. ترقبوا عودتنا!</p>
				</div>
			</AnimatedSection>
		</>
	)
}
