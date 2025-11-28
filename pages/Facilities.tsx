
import React, { useState, useEffect } from 'react';
import { useFacilities } from '../context/FacilityContext';
import { Facility } from '../types';
import { X, Maximize2, Users, Info, Camera } from 'lucide-react';

const Facilities: React.FC = () => {
  const { facilities } = useFacilities();
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedFacility) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedFacility]);

  const openGallery = (facility: Facility) => {
    setSelectedFacility(facility);
  };

  const closeGallery = () => {
    setSelectedFacility(null);
  };

  const getImages = (facility: Facility) => {
    return [facility.image_url, ...(facility.gallery_urls || [])].filter(url => url && url.trim() !== '');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      
      {/* Full Screen Grid Gallery Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-[60] bg-sea-950/95 overflow-y-auto animate-fade-in custom-scrollbar">
          
          {/* Header & Close Button Container */}
          <div className="sticky top-0 z-10 bg-sea-950/90 backdrop-blur-md border-b border-white/10 px-4 py-4 sm:px-8 flex justify-between items-start shadow-lg">
             <div className="max-w-4xl">
                <div className="flex items-center space-x-2 mb-1">
                    <span className="h-1 w-8 bg-blue-600 inline-block rounded-full"></span>
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Fasilitas</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                    {selectedFacility.name}
                </h2>
                <p className="text-sea-200 text-sm mt-2 max-w-2xl font-light">
                    {selectedFacility.description}
                </p>
             </div>

             <button 
                onClick={closeGallery}
                className="p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all transform hover:rotate-90 hover:scale-110 ml-4 shrink-0"
                aria-label="Close Gallery"
             >
                <X size={28} />
             </button>
          </div>

          {/* Photo Grid Content */}
          <div className="max-w-7xl mx-auto p-4 sm:p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {getImages(selectedFacility).map((img, idx) => (
                    <div 
                        key={idx} 
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-800 border border-white/5 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
                    >
                        <img 
                            src={img} 
                            alt={`${selectedFacility.name} - View ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 backdrop-blur rounded">
                                Foto {idx + 1}
                            </span>
                        </div>
                    </div>
                ))}
             </div>
             
             {/* Footer Note */}
             <div className="text-center mt-12 mb-8 text-slate-500 text-sm">
                <p>Menampilkan {getImages(selectedFacility).length} foto dari fasilitas {selectedFacility.name}</p>
             </div>
          </div>
        </div>
      )}

      {/* Main Page Header */}
      <div className="bg-sea-900 dark:bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Fasilitas & Laboratorium</h1>
          <p className="text-sea-200 dark:text-slate-400 max-w-2xl mx-auto">
            Kami menyediakan peralatan berstandar industri untuk memastikan mahasiswa mendapatkan pengalaman praktis yang relevan.
          </p>
        </div>
      </div>

      {/* Facilities Card Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility) => (
                <div 
                  key={facility.id} 
                  onClick={() => openGallery(facility)}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                >
                    <div className="h-64 overflow-hidden relative">
                        <img 
                            src={facility.image_url} 
                            alt={facility.name} 
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-sea-900/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-white">
                            <Camera size={32} className="mb-2" />
                            <span className="font-bold text-lg">Lihat {1 + (facility.gallery_urls?.length || 0)} Foto</span>
                            <span className="text-xs text-sea-200 mt-1">Klik untuk membuka galeri</span>
                        </div>

                        <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur text-sea-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
                                <Users size={12} className="mr-1.5" />
                                Kapasitas {facility.capacity}
                            </span>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sea-600 dark:group-hover:text-sea-400 transition">{facility.name}</h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-2">
                            {facility.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium">
                            <span className="text-sea-600 dark:text-sea-400 flex items-center">
                                <Maximize2 size={12} className="mr-1" />
                                Galeri Tersedia
                            </span>
                            <span className="text-slate-400">Klik untuk detail</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Facilities;