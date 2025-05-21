import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  FileText, 
  Calendar, 
  BookOpen, 
  LifeBuoy, 
  User, 
  LogOut, 
  Zap 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  closeMobile: () => void;
}

const Sidebar = ({ closeMobile }: SidebarProps) => {
  const navItems = [
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Mes projets', path: '/dashboard/projects', icon: ClipboardList },
    { name: 'Mes devis', path: '/dashboard/quotes', icon: FileText },
    { name: 'Rendez-vous', path: '/dashboard/appointments', icon: Calendar },
    { name: 'Ressources', path: '/dashboard/resources', icon: BookOpen },
    { name: 'Support', path: '/dashboard/support', icon: LifeBuoy },
    { name: 'Mon profil', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b">
        <Zap className="h-6 w-6 text-primary-600" />
        <span className="font-bold text-lg">Zdec</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 pb-2 text-xs uppercase tracking-wider text-gray-500 font-semibold">
          Menu principal
        </div>
        <nav className="mt-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={closeMobile}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <button className="w-full flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors">
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;