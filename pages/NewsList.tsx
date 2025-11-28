
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const NewsList: React.FC = () => {
  const { news } = useNews();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-sea-900 dark:bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Berita & Kegiatan</h1>
          <p className="text-sea-200 dark:text-slate-400 max-w-2xl mx-auto">
            Informasi terkini mengenai prestasi mahasiswa, agenda akademik, dan perkembangan teknologi di lingkungan RPE.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              {/* Image */}
              <div className="h-56 overflow-hidden relative group">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                     item.category === 'Academic' ? 'bg-blue-500/90 text-white' :
                     item.category === 'Event' ? 'bg-amber-500/90 text-white' :
                     item.category === 'Student' ? 'bg-green-500/90 text-white' :
                     'bg-sea-600/90 text-white'
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-3 space-x-3">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{item.published_at}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1" />
                    <span>{item.author_name}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 hover:text-sea-600 dark:hover:text-sea-400 transition-colors">
                  <Link to={`/news/${item.id}`}>
                    {item.title}
                  </Link>
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
                  {item.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link 
                    to={`/news/${item.id}`} 
                    className="inline-flex items-center text-sm font-semibold text-sea-600 dark:text-sea-400 hover:text-sea-700 dark:hover:text-sea-300 transition"
                  >
                    Baca Selengkapnya <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p>Belum ada berita yang diterbitkan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;