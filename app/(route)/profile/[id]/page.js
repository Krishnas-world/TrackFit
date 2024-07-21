"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { BarChartBig, ChevronLeft, ChevronRight, Home, User, Users } from 'lucide-react';
import ProfilePage from './profilePage';
import MyWorkouts from './_components/MyWorkouts';
import Progress from './_components/ProgressComp';
import Community from './_components/Community';

const DashboardLayout = () => {
  const [activeCategory, setActiveCategory] = useState('Profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  useEffect(() => {
    if (tab) {
      switch (tab) {
        case 'my-workouts':
          setActiveCategory('My Workouts');
          break;
        case 'progress':
          setActiveCategory('Progress');
          break;
        case 'community':
          setActiveCategory('Community');
          break;
        default:
          setActiveCategory('Profile');
          break;
      }
    }
  }, [tab]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'Profile':
        return <ProfilePage />;
      case 'My Workouts':
        return <MyWorkouts />;
      case 'Progress':
        return <Progress />;
      case 'Community':
        return <Community />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-1/4' : 'w-16'} bg-black text-white flex flex-col`}>
        <button onClick={toggleSidebar} className="p-4 bg-gray-800 hover:bg-gray-700 transition duration-200">
          {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </button>
        {isSidebarOpen && (
          <nav className="p-4">
            <ul className="space-y-4">
              <li onClick={() => handleCategoryClick('Profile')} className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200 ${activeCategory === 'Profile' ? 'bg-gray-700' : ''}`}>
                <User className="h-6 w-6 mr-3" />
                <span>Profile</span>
              </li>
              <li onClick={() => handleCategoryClick('My Workouts')} className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200 ${activeCategory === 'My Workouts' ? 'bg-gray-700' : ''}`}>
                <Home className="h-6 w-6 mr-3" />
                <span>My Workouts</span>
              </li>
              <li onClick={() => handleCategoryClick('Progress')} className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200 ${activeCategory === 'Progress' ? 'bg-gray-700' : ''}`}>
                <BarChartBig className="h-6 w-6 mr-3" />
                <span>Progress</span>
              </li>
              <li onClick={() => handleCategoryClick('Community')} className={`flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200 ${activeCategory === 'Community' ? 'bg-gray-700' : ''}`}>
                <Users className="h-6 w-6 mr-3" />
                <span>Community</span>
              </li>
            </ul>
          </nav>
        )}
        {!isSidebarOpen && (
          <nav className="p-4">
            <ul className="space-y-4">
              <li onClick={() => handleCategoryClick('Profile')} className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200">
                <User className="h-6 w-6" />
              </li>
              <li onClick={() => handleCategoryClick('My Workouts')} className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200">
                <Home className="h-6 w-6" />
              </li>
              <li onClick={() => handleCategoryClick('Progress')} className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200">
                <BarChartBig className="h-6 w-6" />
              </li>
              <li onClick={() => handleCategoryClick('Community')} className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-700 transition duration-200">
                <Users className="h-6 w-6" />
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLayout;
