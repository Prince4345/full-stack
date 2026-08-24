import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-700 hover:text-primary-600 transition-colors">
          <BookOpen className="w-8 h-8" />
          <span>LuminaBlog</span>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/create" className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 font-medium transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>Write</span>
              </Link>
              <Link to="/my-blogs" className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 font-medium transition-colors">
                <UserIcon className="w-5 h-5" />
                <span>My Blogs</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
              <Link to="/register" className="px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
