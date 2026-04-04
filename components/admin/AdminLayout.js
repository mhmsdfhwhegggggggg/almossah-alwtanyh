import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FaHome, 
  FaUsers, 
  FaNewspaper, 
  FaImage, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaTachometerAlt,
  FaFileAlt,
  FaTags,
  FaEnvelope,
  FaComments
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'الرئيسية', icon: <FaTachometerAlt />, path: '/admin/dashboard' },
    { 
      name: 'المحتوى', 
      icon: <FaFileAlt />, 
      submenu: [
        { name: 'الصفحات', path: '/admin/pages' },
        { name: 'المقالات', path: '/admin/posts' },
        { name: 'التصنيفات', path: '/admin/categories' }
      ]
    },
    { 
      name: 'الوسائط', 
      icon: <FaImage />, 
      submenu: [
        { name: 'معرض الصور', path: '/admin/media' },
        { name: 'الملفات', path: '/admin/files' }
      ]
    },
    { name: 'التعليقات', icon: <FaComments />, path: '/admin/comments' },
    { name: 'الرسائل', icon: <FaEnvelope />, path: '/admin/messages' },
    { 
      name: 'المستخدمون', 
      icon: <FaUsers />, 
      submenu: [
        { name: 'قائمة المستخدمين', path: '/admin/users' },
        { name: 'الأدوار والصلاحيات', path: '/admin/roles' }
      ]
    },
    { name: 'الإعدادات', icon: <FaCog />, path: '/admin/settings' },
  ];

  const isActive = (path) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    // Implement logout logic
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-0'} 
        bg-indigo-800 text-white transition-all duration-300 overflow-hidden
        fixed lg:relative h-full z-50`}
      >
        <div className="p-4 flex items-center justify-between border-b border-indigo-700">
          <h1 className="text-xl font-bold">لوحة التحكم</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="px-2 py-1">
                {item.submenu ? (
                  <div className="mb-2">
                    <div className="flex items-center px-4 py-3 text-gray-200 hover:bg-indigo-700 rounded-lg cursor-pointer">
                      <span className="ml-2">{item.icon}</span>
                      <span className="mr-2">{item.name}</span>
                    </div>
                    <ul className="mt-1 bg-indigo-900 rounded-lg py-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className="px-4 py-2 hover:bg-indigo-800 rounded">
                          <Link href={subItem.path} className="block text-sm text-gray-200 hover:text-white">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link 
                    href={item.path}
                    className={`flex items-center px-4 py-3 ${isActive(item.path) ? 'bg-indigo-700' : 'hover:bg-indigo-700'} rounded-lg`}
                  >
                    <span className="ml-2">{item.icon}</span>
                    <span className="mr-2">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-700">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-300 hover:bg-indigo-700 rounded-lg"
          >
            <FaSignOutAlt className="ml-2" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaBars className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <span className="sr-only">الإشعارات</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0"></div>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <span>أد</span>
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">المدير</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
