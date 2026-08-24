import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Explore the Latest Stories</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Discover insights, ideas, and perspectives from our community of writers.</p>
      </div>
      
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">No blogs found</h2>
          <p className="text-slate-500">Be the first to share a story!</p>
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

export default Home;
