
import React, { useState } from 'react';
import { useAcademic } from '../../context/AcademicContext';
import { Lecturer } from '../../types';
import { Plus, Pencil, Trash2, X, Save, Link as LinkIcon, Minus, Image as ImageIcon } from 'lucide-react';

const LecturerManager: React.FC = () => {
  const { lecturers, addLecturer, updateLecturer, deleteLecturer } = useAcademic();
  const [isEditing, setIsEditing] = useState(false);
  
  // Initial empty state
  const initialLecturer: Lecturer = { 
      id: '', 
      name: '', 
      title: '', 
      specialization: '', 
      email: '', 
      email_secondary: '',
      image_url: '',
      nik: '',
      program_study: '',
      last_education: '',
      education_history: [],
      social_links: {
          others: []
      } 
  };
  const [currentLecturer, setCurrentLecturer] = useState<Lecturer>(initialLecturer);
  const [eduHistoryText, setEduHistoryText] = useState('');
  
  // State for adding custom links
  const [newLink, setNewLink] = useState({ label: '', url: '' });

  const resetForm = () => {
    setCurrentLecturer(initialLecturer);
    setEduHistoryText('');
    setNewLink({ label: '', url: '' });
    setIsEditing(false);
  };

  const handleEdit = (lecturer: Lecturer) => {
    // Ensure social_links object exists
    const safeLecturer = {
        ...lecturer,
        social_links: {
            others: [],
            ...lecturer.social_links
        }
    };
    setCurrentLecturer(safeLecturer);
    setEduHistoryText(lecturer.education_history ? lecturer.education_history.join('\n') : '');
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentLecturer({ ...initialLecturer, id: Date.now().toString() });
    setEduHistoryText('');
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data dosen ini?')) {
      deleteLecturer(id);
    }
  };

  const addCustomLink = () => {
      if (newLink.label && newLink.url) {
          const updatedOthers = [...(currentLecturer.social_links?.others || []), newLink];
          setCurrentLecturer({
              ...currentLecturer,
              social_links: {
                  ...currentLecturer.social_links,
                  others: updatedOthers
              }
          });
          setNewLink({ label: '', url: '' });
      }
  };

  const removeCustomLink = (index: number) => {
      const updatedOthers = [...(currentLecturer.social_links?.others || [])];
      updatedOthers.splice(index, 1);
      setCurrentLecturer({
          ...currentLecturer,
          social_links: {
              ...currentLecturer.social_links,
              others: updatedOthers
          }
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLecturer.name) return;

    // Process textarea for education history
    const eduList = eduHistoryText.split('\n').filter(line => line.trim() !== '');

    const lecturerData = {
        ...currentLecturer,
        education_history: eduList,
        image_url: currentLecturer.image_url || 'https://via.placeholder.com/400x400?text=Foto+Dosen'
    };

    if (lecturers.some(l => l.id === lecturerData.id)) {
        updateLecturer(lecturerData);
    } else {
        addLecturer(lecturerData);
    }
    resetForm();
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">
            {lecturers.some(l => l.id === currentLecturer.id) ? 'Edit Dosen' : 'Tambah Dosen'}
          </h2>
          <button onClick={resetForm} className="text-slate-500 hover:text-slate-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Main Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                    type="text"
                    required
                    value={currentLecturer.name}
                    onChange={e => setCurrentLecturer({...currentLecturer, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                    placeholder="Contoh: Dr. Eng. Budi Santoso, M.T."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">NIK</label>
                <input
                    type="text"
                    value={currentLecturer.nik || ''}
                    onChange={e => setCurrentLecturer({...currentLecturer, nik: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                    placeholder="Nomor Induk Karyawan"
                />
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan (Title)</label>
                <input
                  type="text"
                  required
                  value={currentLecturer.title}
                  onChange={e => setCurrentLecturer({...currentLecturer, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                  placeholder="e.g. Kepala Jurusan"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Utama</label>
                <input
                  type="email"
                  required
                  value={currentLecturer.email}
                  onChange={e => setCurrentLecturer({...currentLecturer, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                  placeholder="email@polibatam.ac.id"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Tambahan (Opsional)</label>
                <input
                  type="email"
                  value={currentLecturer.email_secondary || ''}
                  onChange={e => setCurrentLecturer({...currentLecturer, email_secondary: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                  placeholder="e.g. email.pribadi@gmail.com"
                />
             </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Program Studi</label>
                <input
                  type="text"
                  value={currentLecturer.program_study || ''}
                  onChange={e => setCurrentLecturer({...currentLecturer, program_study: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                  placeholder="Teknologi Rekayasa Pembangkit Energi"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pendidikan Terakhir</label>
                <input
                  type="text"
                  value={currentLecturer.last_education || ''}
                  onChange={e => setCurrentLecturer({...currentLecturer, last_education: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                  placeholder="e.g. Magister (S2)"
                />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Bidang Keahlian (Spesialisasi)</label>
            <input
                type="text"
                required
                value={currentLecturer.specialization}
                onChange={e => setCurrentLecturer({...currentLecturer, specialization: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                placeholder="Pisahkan dengan koma: Thermodynamics, Renewable Energy, Fluid Mechanics"
            />
            <p className="text-xs text-slate-500 mt-1">Akan ditampilkan sebagai 'Badges' pada halaman publik.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Riwayat Pendidikan (Timeline)</label>
            <textarea
                rows={4}
                value={eduHistoryText}
                onChange={e => setEduHistoryText(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none font-mono text-sm"
                placeholder="Sarjana Teknik (S1) - Teknik Mesin - Univ. Indonesia&#10;Magister Teknik (S2) - Sistem Energi - TU Delft"
            />
            <p className="text-xs text-slate-500 mt-1">Gunakan enter untuk baris baru. Format disarankan: Jenjang - Jurusan - Universitas</p>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">URL Foto Profil</label>
             <div className="flex flex-col md:flex-row gap-4">
                 <div className="flex-1">
                     <div className="flex">
                        <input
                            type="text"
                            value={currentLecturer.image_url}
                            onChange={e => setCurrentLecturer({...currentLecturer, image_url: e.target.value})}
                            className="flex-1 px-4 py-2 rounded-l-lg border border-slate-300 focus:ring-2 focus:ring-sea-500 outline-none"
                            placeholder="https://..."
                        />
                         <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 text-slate-500">
                            <ImageIcon size={18} />
                        </span>
                     </div>
                     <p className="text-xs text-slate-500 mt-1">Disarankan foto rasio portrait/kotak resolusi tinggi.</p>
                 </div>
                 <div className="w-24 h-32 border border-slate-200 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                    {currentLecturer.image_url ? (
                         <img src={currentLecturer.image_url} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs text-slate-400 text-center p-2">Preview Foto</span>
                    )}
                 </div>
             </div>
          </div>

          {/* Social Media & Academic Links Section */}
          <div className="pt-6 border-t border-slate-200">
             <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center">
                <LinkIcon size={18} className="mr-2" /> Profil Akademik & Sosial Media
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 {/* Academic Column */}
                 <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Akademik</h4>
                     
                     <div>
                        <label className="text-xs font-medium text-slate-600">SINTA ID / URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.sinta || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, sinta: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link Profil SINTA"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600">Scopus URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.scopus || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, scopus: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link Scopus"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600">Google Scholar URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.google_scholar || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, google_scholar: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link Google Scholar"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600">LinkedIn URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.linkedin || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, linkedin: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link LinkedIn"
                        />
                     </div>
                 </div>

                 {/* Social Column */}
                 <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                     <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Sosial Media</h4>
                     
                     <div>
                        <label className="text-xs font-medium text-slate-600">Instagram URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.instagram || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, instagram: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link Instagram"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600">Facebook URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.facebook || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, facebook: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link Facebook"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600">Twitter (X) URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.twitter || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, twitter: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link Twitter"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-600">TikTok URL</label>
                        <input
                            type="text"
                            value={currentLecturer.social_links?.tiktok || ''}
                            onChange={e => setCurrentLecturer({...currentLecturer, social_links: {...currentLecturer.social_links, tiktok: e.target.value}})}
                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 focus:ring-1 focus:ring-sea-500 outline-none"
                            placeholder="Link TikTok"
                        />
                     </div>
                 </div>
             </div>

             {/* Custom Links Repeater */}
             <div className="p-4 bg-white border border-slate-200 rounded-lg">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Link Alternatif / Lainnya</h4>
                 
                 {currentLecturer.social_links?.others && currentLecturer.social_links.others.length > 0 && (
                     <div className="space-y-2 mb-4">
                         {currentLecturer.social_links.others.map((link, idx) => (
                             <div key={idx} className="flex items-center space-x-2">
                                 <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs font-medium min-w-[100px] text-center">{link.label}</span>
                                 <span className="text-xs text-slate-500 truncate flex-1">{link.url}</span>
                                 <button 
                                    type="button" 
                                    onClick={() => removeCustomLink(idx)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                 >
                                     <Minus size={14} />
                                 </button>
                             </div>
                         ))}
                     </div>
                 )}

                 <div className="flex space-x-2">
                     <input 
                        type="text"
                        placeholder="Label (e.g. Blog, Portfolio)"
                        value={newLink.label}
                        onChange={e => setNewLink({...newLink, label: e.target.value})}
                        className="w-1/3 px-3 py-1.5 text-sm rounded border border-slate-300 focus:ring-1 focus:ring-sea-500 outline-none"
                     />
                     <input 
                        type="text"
                        placeholder="URL (https://...)"
                        value={newLink.url}
                        onChange={e => setNewLink({...newLink, url: e.target.value})}
                        className="flex-1 px-3 py-1.5 text-sm rounded border border-slate-300 focus:ring-1 focus:ring-sea-500 outline-none"
                     />
                     <button 
                        type="button"
                        onClick={addCustomLink}
                        disabled={!newLink.label || !newLink.url}
                        className="px-3 py-1.5 bg-sea-600 text-white rounded text-sm font-medium hover:bg-sea-700 disabled:opacity-50"
                     >
                         Tambah
                     </button>
                 </div>
             </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 space-x-3">
             <button 
                type="button" 
                onClick={resetForm}
                className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
             >
                Batal
             </button>
             <button 
                type="submit" 
                className="px-6 py-2 rounded-lg bg-sea-600 text-white font-bold hover:bg-sea-700 transition flex items-center"
             >
                <Save size={18} className="mr-2" />
                Simpan
             </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Dosen & Staff</h1>
        <button 
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-sea-600 text-white rounded-lg hover:bg-sea-700 transition font-medium shadow-sm"
        >
            <Plus size={20} className="mr-2" />
            Tambah Dosen
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nama & NIK</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Jabatan</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Bidang Keahlian</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Pendidikan</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Kontak</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lecturers.map((lecturer) => (
                <tr key={lecturer.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                        <img 
                            src={lecturer.image_url} 
                            alt="" 
                            className="w-10 h-10 rounded-full object-cover mr-3 bg-slate-200 border border-slate-200"
                        />
                        <div>
                            <div className="font-semibold text-slate-800 text-sm">{lecturer.name}</div>
                            <div className="text-xs text-slate-500">{lecturer.nik || '-'}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="bg-sea-50 text-sea-700 px-2 py-1 rounded-md text-xs font-bold uppercase block w-fit mb-1">
                        {lecturer.title}
                    </span>
                    <span className="text-xs text-slate-400">{lecturer.program_study}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                          {lecturer.specialization.split(',').slice(0, 3).map((spec, i) => (
                              <span key={i} className="px-2 py-0.5 bg-sea-50 text-sea-700 text-[10px] rounded border border-sea-100 font-medium">
                                  {spec.trim()}
                              </span>
                          ))}
                          {lecturer.specialization.split(',').length > 3 && (
                              <span className="text-[10px] text-slate-400 self-center">+more</span>
                          )}
                      </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                      {lecturer.last_education}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                      <div>{lecturer.email}</div>
                      {lecturer.email_secondary && (
                          <div className="text-xs text-slate-400 mt-1 italic">{lecturer.email_secondary}</div>
                      )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                        onClick={() => handleEdit(lecturer)}
                        className="p-1.5 text-sea-600 hover:bg-sea-50 rounded transition" 
                        title="Edit"
                    >
                        <Pencil size={18} />
                    </button>
                    <button 
                        onClick={() => handleDelete(lecturer.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded transition" 
                        title="Hapus"
                    >
                        <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {lecturers.length === 0 && (
                <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        Belum ada data dosen.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturerManager;
