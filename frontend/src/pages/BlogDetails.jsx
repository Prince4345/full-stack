import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_URL}/api/blogs/${id}`);
        navigate('/');
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting blog');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Blog not found'}</h2>
        <Link to="/" className="text-primary-600 hover:underline">Go back home</Link>
      </div>
    );
  }

  const isOwner = user && blog.author && user._id === blog.author._id;

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to blogs</span>
      </Link>
      
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{blog.title}</h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-6 text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                {blog.author?.name ? blog.author.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{blog.author?.name || 'Unknown'}</div>
                <div className="text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
          
          {isOwner && (
            <div className="flex items-center gap-3">
              <Link 
                to={`/edit/${blog._id}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-primary-600 whitespace-pre-wrap">
        {blog.content}
      </div>
    </article>
  );
};

export default BlogDetails;
