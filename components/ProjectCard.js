import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article 
      className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-transparent hover:border-primary-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1 
      }}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 w-full">
          <Image 
            src={project.imageUrl || '/images/project-placeholder.jpg'}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Project Category Badge */}
        {project.category && (
          <span className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {project.category}
          </span>
        )}
        
        {/* Progress Bar (for ongoing projects) */}
        {project.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-100">
            <motion.div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            ></motion.div>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          {project.icon && (
            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center ml-3">
              {project.icon}
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 flex-grow">
          {project.excerpt || 'مشروع تنموي يساهم في تحسين حياة المجتمع'}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            {project.donated && project.target ? (
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {new Intl.NumberFormat('ar-SA').format(project.donated)} ر.س
                </div>
                <div className="text-gray-500">
                  من {new Intl.NumberFormat('ar-SA').format(project.target)} ر.س
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {project.duration || 'مشروع مستمر'}
              </div>
            )}
            
            <Link 
              href={`/projects/${project.id || '#'}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-800 font-semibold transition-colors group-hover:gap-2"
            >
              اقرأ المزيد
              <FaArrowLeft className="mr-1 transition-transform group-hover:translate-x-[-4px]" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
