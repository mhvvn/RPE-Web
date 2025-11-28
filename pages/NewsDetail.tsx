
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Tag, FileText, Download, ExternalLink, Image as ImageIcon, Film, FileSpreadsheet, FileType } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { news } = useNews();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  const article = news.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Artikel Tidak Ditemukan</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link to="/news" className="px-6 py-2 bg-sea-600 text-white rounded-lg hover:bg-sea-700 transition">
          Kembali ke Berita
        </Link>
      </div>
    );
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return <FileText className="text-red-500" />;
    if (mimeType.includes('sheet') || mimeType.includes('csv') || mimeType.includes('excel')) return <FileSpreadsheet className="text-green-500" />;
    if (mimeType.includes('word') || mimeType.includes('document')) return <FileType className="text-blue-500" />;
    if (mimeType.startsWith('video/')) return <Film className="text-purple-500" />;
    if (mimeType.startsWith('image/')) return <ImageIcon className="text-amber-500" />;
    return <FileText className="text-slate-500" />;
  };

  const videos = article.attachments?.filter(a => a.type === 'video') || [];
  const documents = article.attachments?.filter(a => a.type === 'document') || [];
  // Merge gallery URLs and uploaded images
  const allImages = [
      ...(article.gallery_urls || []),
      ...(article.attachments?.filter(a => a.type === 'image').map(a => a.url) || [])
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      {/* Lightbox Overlay */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setActiveImage(null)}>
            <button className="absolute top-4 right-4 text-white hover:text-amber-500">
                <span className="text-4xl">&times;</span>
            </button>
            <img src={activeImage} alt="Fullscreen" className="max-w-full max-h-[90vh] rounded shadow-2xl" />
        </div>
      )}

      {/* Hero Image */}
      <div className="w-full h-[400px] lg:h-[500px] relative group">
        <img 
          src={article.image_url} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sea-950/90 via-sea-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 md:p-12">
            <div className="max-w-6xl mx-auto">
                <Link to="/news" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition">
                    <ArrowLeft size={20} className="mr-2" /> Kembali ke Daftar Berita
                </Link>
                <div className="flex flex-wrap gap-2 mb-4">
                     <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-sea-950 shadow-lg">
                        {article.category}
                     </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                    {article.title}
                </h1>
                <div className="flex flex-wrap items-center text-sea-100 text-sm gap-6 border-t border-white/20 pt-6">
                    <div className="flex items-center">
                        <User size={18} className="mr-2 text-amber-400" />
                        <span className="font-medium">{article.author_name}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-amber-400" />
                        <span className="font-medium">{article.published_at}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Column */}
            <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100 dark:border-slate-800">
                    {/* Summary Block */}
                    <div className="bg-sea-50 dark:bg-slate-800 border-l-4 border-sea-500 p-6 mb-8 rounded-r-lg">
                        <p className="text-lg text-sea-800 dark:text-sea-200 font-medium italic leading-relaxed">
                            "{article.summary}"
                        </p>
                    </div>

                    {/* Main Text Content */}
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                        {article.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-6 leading-8">
                                {paragraph || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
                            </p>
                        ))}
                    </div>

                    {/* Embedded Videos */}
                    {videos.length > 0 && (
                        <div className="mt-8 mb-8">
                            <h3 className="flex items-center text-xl font-bold text-slate-800 dark:text-white mb-6">
                                <Film className="mr-2 text-purple-600 dark:text-purple-400" /> Video Dokumentasi
                            </h3>
                            <div className="space-y-6">
                                {videos.map((vid) => (
                                    <div key={vid.id} className="w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 bg-black">
                                        <video controls className="w-full">
                                            <source src={vid.url} type={vid.mimeType} />
                                            Browser Anda tidak mendukung tag video.
                                        </video>
                                        <div className="p-3 bg-white dark:bg-slate-800">
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{vid.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Section */}
                    {allImages.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <h3 className="flex items-center text-xl font-bold text-slate-800 dark:text-white mb-6">
                                <ImageIcon className="mr-2 text-sea-600 dark:text-sea-400" /> Galeri Foto
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {allImages.map((url, idx) => (
                                    <div 
                                        key={idx} 
                                        className="relative group cursor-pointer overflow-hidden rounded-xl h-48 shadow-sm border border-slate-200 dark:border-slate-700"
                                        onClick={() => setActiveImage(url)}
                                    >
                                        <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-center justify-center">
                                            <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">Lihat Foto</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Tags & Share */}
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                            <Tag size={18} />
                            <span className="text-sm font-medium">Tag: RPE, Polibatam, {article.category}, Teknologi</span>
                        </div>
                        <button className="flex items-center space-x-2 text-sea-600 dark:text-sea-400 font-bold hover:text-sea-700 dark:hover:text-sea-300 transition px-4 py-2 bg-sea-50 dark:bg-slate-800 rounded-lg">
                            <Share2 size={18} />
                            <span>Bagikan Artikel</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* Legacy & New Documents Download Section */}
                {(article.pdf_url || documents.length > 0) && (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6">
                        <h3 className="flex items-center text-lg font-bold text-slate-800 dark:text-white mb-4">
                            <FileText className="mr-2 text-red-500" /> Dokumen Lampiran
                        </h3>
                        
                        {/* Legacy PDF */}
                        {article.pdf_url && (
                             <div className="mb-4">
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-2 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                                        <span className="truncate max-w-[150px] font-medium text-slate-700 dark:text-slate-200">{article.pdf_name || "Dokumen Utama.pdf"}</span>
                                        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">PDF</span>
                                    </div>
                                </div>
                                <a 
                                    href={article.pdf_url} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-sea-600 hover:bg-sea-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center shadow-lg shadow-sea-600/20 text-sm"
                                >
                                    <Download size={16} className="mr-2" />
                                    Unduh Dokumen Utama
                                </a>
                            </div>
                        )}

                        {/* New Attachments */}
                        {documents.length > 0 && (
                            <div className="space-y-3 mt-4">
                                {documents.map((doc) => (
                                    <div key={doc.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 transition">
                                        <div className="flex items-start mb-2">
                                            <div className="mt-0.5 mr-3 p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-600">
                                                {getFileIcon(doc.mimeType)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{doc.name}</p>
                                                <p className="text-xs text-slate-500">{(doc.size ? (doc.size / 1024).toFixed(0) + ' KB' : 'File')}</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={doc.url} 
                                            download={doc.name}
                                            className="flex items-center justify-center w-full py-2 bg-white dark:bg-slate-600 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-500 rounded text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-500 transition"
                                        >
                                            <Download size={12} className="mr-1.5" /> Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* External Links */}
                {article.related_links && article.related_links.length > 0 && (
                     <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 p-6">
                        <h3 className="flex items-center text-lg font-bold text-slate-800 dark:text-white mb-4">
                            <ExternalLink className="mr-2 text-amber-500" /> Tautan Terkait
                        </h3>
                        <ul className="space-y-3">
                            {article.related_links.map((link, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={link.url} 
                                        target={link.url.startsWith('/') ? '_self' : '_blank'}
                                        rel="noreferrer"
                                        className="flex items-start p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                                    >
                                        <div className="mt-1 mr-3 text-sea-400 group-hover:text-sea-600 dark:group-hover:text-sea-400">
                                            <ExternalLink size={16} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-sea-700 dark:group-hover:text-sea-400 line-clamp-2">
                                            {link.title}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                     </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
