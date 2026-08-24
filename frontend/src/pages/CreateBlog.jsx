import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Send } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/api/blogs`, { title, content });
      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating blog');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to blogs</span>
      </Link>
      
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Create New Story</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
            <input
              type="text"
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none text-lg font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
              placeholder="What's your story about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
            <textarea
              required
              rows="12"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none resize-y text-slate-700 leading-relaxed placeholder:text-slate-400"
              placeholder="Write your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Story'}
              {!isSubmitting && <Send className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
