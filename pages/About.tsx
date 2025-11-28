
import React from 'react';
import { Target, Eye, CheckCircle, Download } from 'lucide-react';
import { ACCREDITATION_CERT_URL } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-sea-900 dark:bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Profil Program Studi</h1>
          <p className="text-sea-200 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat visi, misi, dan sejarah Teknologi Rekayasa Pembangkit Energi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 sm:p-12 mb-12 border border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b dark:border-slate-700 pb-4">Sejarah Singkat</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <p className="mb-4">
                    Program Studi Sarjana Terapan (D4) Teknologi Rekayasa Pembangkit Energi didirikan pada tahun 2015 sebagai respon terhadap kebutuhan mendesak industri energi nasional akan tenaga ahli terampil. 
                    Berlokasi di Batam, pusat industri strategis, kami berkolaborasi erat dengan berbagai PLTU, PLTG, dan industri manufaktur energi.
                </p>
                <p>
                    Kurikulum kami dirancang berbasis "Dual System" yang mengintegrasikan teori di kelas dan praktik intensif di laboratorium serta industri, memastikan lulusan siap kerja sejak hari pertama (Day One Ready).
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Visi */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border-l-4 border-sea-500">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-sea-50 dark:bg-slate-800 rounded-lg text-sea-600 dark:text-sea-400 mr-4">
                        <Eye size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Visi</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "Menjadi program studi vokasi unggulan di bidang pembangkit energi yang diakui secara internasional dan berkontribusi pada kemandirian energi nasional pada tahun 2030."
                </p>
            </div>

            {/* Misi */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border-l-4 border-amber-500">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-lg text-amber-600 dark:text-amber-500 mr-4">
                        <Target size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Misi</h2>
                </div>
                <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start">
                        <CheckCircle size={20} className="text-amber-500 mr-3 mt-1 shrink-0" />
                        <span>Menyelenggarakan pendidikan vokasi berkualitas di bidang teknologi pembangkit.</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle size={20} className="text-amber-500 mr-3 mt-1 shrink-0" />
                        <span>Melaksanakan penelitian terapan yang solutif bagi permasalahan industri energi.</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle size={20} className="text-amber-500 mr-3 mt-1 shrink-0" />
                        <span>Mengembangkan kerjasama strategis dengan industri energi nasional dan global.</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Akreditasi Section Updated */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Image & Download */}
                <div className="flex flex-col items-center">
                    <div className="relative group w-full max-w-md shadow-2xl border-8 border-white dark:border-slate-800 rounded-lg overflow-hidden mb-6 transform transition hover:scale-[1.02]">
                        <img 
                            src={ACCREDITATION_CERT_URL} 
                            alt="Sertifikat Akreditasi" 
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
                    </div>
                    <a 
                        href={ACCREDITATION_CERT_URL} 
                        download="Sertifikat_Akreditasi_RPE.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-sea-600 hover:bg-sea-700 text-white font-bold rounded-lg shadow-lg shadow-sea-600/20 transition-all transform hover:-translate-y-1"
                    >
                        <Download size={20} className="mr-2" />
                        Unduh Sertifikat
                    </a>
                </div>

                {/* Right: Text Content */}
                <div className="text-left">
                    <h2 className="text-3xl font-extrabold text-sea-500 dark:text-sea-400 mb-6 uppercase tracking-wide">
                        Akreditasi Program Studi
                    </h2>
                    <div className="prose prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 mb-8">
                        <p>
                            Akreditasi program studi adalah proses penilaian dan evaluasi secara sistematis terhadap mutu dan kelayakan suatu program studi oleh lembaga yang berwenang, seperti BAN-PT (Badan Akreditasi Nasional Perguruan Tinggi) atau LAM (Lembaga Akreditasi Mandiri). Tujuannya adalah untuk memastikan bahwa program studi tersebut memenuhi standar mutu pendidikan tinggi, baik dari sisi kurikulum, dosen, fasilitas, manajemen, hingga lulusan.
                        </p>
                        <p>
                            Berdasarkan keputusan LAM Teknik No. 0026/SK/LAM Teknik/VST/IV/2025, menyatakan bahwa Program Studi Teknologi Rekayasa Konstruksi Perkapalan pada Program Sarjana Terapan Politeknik Negeri Batam terakreditasi dengan peringkat Baik Sekali sejak tanggal 21 April 2025 hingga 20 Agustus 2029.
                        </p>
                    </div>
                    
                    <div className="inline-block bg-sea-50 dark:bg-slate-800 px-8 py-4 rounded-xl shadow-sm border border-sea-200 dark:border-slate-700">
                        <span className="text-3xl font-extrabold text-sea-700 dark:text-sea-400">BAIK SEKALI</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold uppercase tracking-wider">
                            LAM Teknik (Lembaga Akreditasi Mandiri Teknik)
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
