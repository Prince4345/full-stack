import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          <span className="font-medium text-slate-700">{blog.author?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>
      <Link to={`/blogs/${blog._id}`}>
        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
          {blog.title}
        </h2>
      </Link>
      <p className="text-slate-600 line-clamp-3 mb-6 leading-relaxed">
        {blog.content}
      </p>
      <div className="flex items-center justify-between">
        <Link 
          to={`/blogs/${blog._id}`} 
          className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1"
        >
          Read full post <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
