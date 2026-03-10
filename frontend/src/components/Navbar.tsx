import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { authService } from '../services/auth';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">CRM</div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-sm">{user?.name}</span>
              <span className="bg-primary-600 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-primary-600 px-4 py-2 rounded transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-primary-600 rounded"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary-600">
            <div className="py-3 px-2">
              <div className="text-sm mb-3">{user?.name}</div>
              <span className="bg-primary-600 px-3 py-1 rounded-full text-xs font-semibold capitalize inline-block mb-3">
                {user?.role}
              </span>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 hover:bg-primary-600 px-3 py-2 rounded transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
