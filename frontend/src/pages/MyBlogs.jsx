import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../context/AuthContext';
import { PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        // Filter blogs by the logged-in user
        const userBlogs = res.data.filter(blog => blog.author?._id === user._id);
        setBlogs(userBlogs);
      } catch (error) {
        console.error('Error fetching blogs', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">My Stories</h1>
          <p className="text-slate-600">Manage and view all your published blogs.</p>
        </div>
        <Link 
          to="/create" 
          className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5"
        >
          <PenTool className="w-5 h-5" />
          Write New
        </Link>
      </div>
      
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">You haven't written any stories yet</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Share your thoughts, experiences, and ideas with the world.</p>
          <Link 
            to="/create" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
          >
            Start Writing
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
