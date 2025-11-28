import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Pesan terkirim! (Mockup)");
        setFormState({ name: '', email: '', message: '' });
    };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="bg-sea-900 dark:bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-sea-200 dark:text-slate-400">
            Punya pertanyaan seputar pendaftaran atau kerjasama? Kami siap membantu.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Informasi Kontak</h2>
                <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-sea-100 dark:bg-slate-800 text-sea-600 dark:text-sea-400 rounded-lg">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Alamat Kampus</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                Gedung Utama Polibatam,<br />
                                Jl. Ahmad Yani, Batam Kota,<br />
                                Kota Batam, Kepulauan Riau 29461
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-sea-100 dark:bg-slate-800 text-sea-600 dark:text-sea-400 rounded-lg">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Telepon & Fax</h3>
                            <p className="text-slate-600 dark:text-slate-300">+62 778 469856</p>
                            <p className="text-slate-600 dark:text-slate-300">+62 778 469860 (Fax)</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-sea-100 dark:bg-slate-800 text-sea-600 dark:text-sea-400 rounded-lg">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                            <p className="text-slate-600 dark:text-slate-300">info.rpe@polibatam.ac.id</p>
                            <p className="text-slate-600 dark:text-slate-300">admissions@polibatam.ac.id</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.057865682855!2d104.04838407425624!3d1.1186795622792612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98921856ddfab%3A0xf9d9fc65ca00c9d!2sPoliteknik%20Negeri%20Batam!5e0!3m2!1sen!2sid!4v1716300000000!5m2!1sen!2sid" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        loading="lazy"
                        title="Map"
                    ></iframe>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Kirim Pesan</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nama Lengkap</label>
                        <input 
                            type="text" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-sea-500 focus:ring-2 focus:ring-sea-200 dark:focus:ring-sea-900 transition outline-none"
                            placeholder="Contoh: Budi Santoso"
                            value={formState.name}
                            onChange={e => setFormState({...formState, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-sea-500 focus:ring-2 focus:ring-sea-200 dark:focus:ring-sea-900 transition outline-none"
                            placeholder="nama@email.com"
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Pesan</label>
                        <textarea 
                            rows={5}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-sea-500 focus:ring-2 focus:ring-sea-200 dark:focus:ring-sea-900 transition outline-none resize-none"
                            placeholder="Tulis pesan Anda di sini..."
                            value={formState.message}
                            onChange={e => setFormState({...formState, message: e.target.value})}
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-4 bg-sea-600 hover:bg-sea-700 text-white font-bold rounded-lg shadow-lg shadow-sea-900/10 transition flex items-center justify-center space-x-2"
                    >
                        <span>Kirim Pesan</span>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;