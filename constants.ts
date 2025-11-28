
import { Course, Facility, Lecturer, NewsItem, User, Role, Statistics } from './types';

export const HERO_IMAGE = "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop";
// Logo Petir/Listrik (Energy Representation)
export const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/3109/3109840.png"; 

// Placeholder image for Accreditation Certificate - Replace with actual uploaded URL or Base64
export const ACCREDITATION_CERT_URL = "https://img.freepik.com/free-vector/modern-certificate-template_1017-15183.jpg?w=1380&t=st=1716360000~exp=1716360600~hmac=abcdef123456";

export const INITIAL_STATS: Statistics = {
  students: '450+',
  courses: '48',
  awards: '25+',
  employment: '92%'
};

export const USERS_DATA: User[] = [
  {
    id: 'u0',
    name: 'Super Administrator',
    username: 'superadmin',
    password: '123',
    role: Role.SUPER_ADMIN,
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'u1',
    name: 'Admin Staff',
    username: 'admin',
    password: '123',
    role: Role.ADMIN,
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'u2',
    name: 'Dr. Eng. Budi Santoso',
    username: 'dosen',
    password: '123',
    role: Role.LECTURER,
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'u3',
    name: 'Ahmad Fauzi (Mahasiswa)',
    username: 'mahasiswa',
    password: '123',
    role: Role.STUDENT,
    avatar_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'u4',
    name: 'Sarah Teknisi',
    username: 'laboran',
    password: '123',
    role: Role.LABORAN,
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100'
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Mahasiswa RPE Menangkan Kompetisi Energi Terbarukan Nasional 2024',
    summary: 'Tim mahasiswa RPE berhasil meraih juara 1 dalam inovasi turbin angin efisiensi tinggi dengan desain blade aerodinamis terbaru.',
    content: `Tim "RPE WindForce" yang terdiri dari 5 mahasiswa semester akhir Program Studi Teknologi Rekayasa Pembangkit Energi (RPE) Polibatam berhasil mengharumkan nama kampus di kancah nasional. Dalam ajang "National Renewable Energy Innovation Summit 2024" yang diselenggarakan di Jakarta, tim ini menyabet Juara 1 Kategori Teknologi Tepat Guna.

Inovasi yang diusung adalah "Smart Vertical Axis Wind Turbine (VAWT) dengan Blade Komposit Serat Alam". Turbin ini dirancang khusus untuk memaksimalkan tangkapan angin pada kecepatan rendah yang umum terjadi di wilayah perkotaan Indonesia.

"Kunci kemenangan kami ada pada material blade yang menggunakan serat rami, yang tidak hanya ringan dan kuat, tetapi juga ramah lingkungan," ujar Ketua Tim, Ahmad Fauzi.

Selain trofi dan uang pembinaan, tim juga mendapatkan kesempatan untuk mempresentasikan karya mereka di depan investor energi terbarukan bulan depan. Dokumen teknis mengenai spesifikasi turbin dapat diunduh pada lampiran di bawah ini.`,
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    published_at: '2023-10-15',
    author_name: 'Humas RPE',
    category: 'Student',
    gallery_urls: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581092921461-eab62e97a783?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503428593586-e225b476b84c?auto=format&fit=crop&q=80&w=800'
    ],
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Using a generic public PDF for demo
    pdf_name: 'Laporan_Teknis_Turbin_RPE_2024.pdf',
    related_links: [
        { title: 'Website Kompetisi Nasional', url: 'https://example.com/competition' },
        { title: 'Profil Tim RPE WindForce', url: '/about' }
    ]
  },
  {
    id: '2',
    title: 'Kuliah Tamu: Masa Depan Pembangkit Listrik Nuklir',
    summary: 'Mendatangkan pakar dari BATAN untuk membahas potensi PLTN di Indonesia.',
    content: 'Program Studi RPE mengadakan kuliah tamu yang menghadirkan Dr. Ir. Santoso dari Badan Tenaga Nuklir Nasional (BATAN). Acara ini membahas tentang roadmap pengembangan Pembangkit Listrik Tenaga Nuklir (PLTN) di Indonesia, khususnya untuk fase 2030-2050. \n\n Dalam paparan beliau, disebutkan bahwa teknologi Small Modular Reactor (SMR) menjadi kandidat kuat untuk diterapkan di pulau-pulau kecil karena faktor keselamatan yang lebih tinggi dan biaya investasi yang lebih terjangkau.',
    image_url: 'https://images.unsplash.com/photo-1569091791842-7cf9646552dd?auto=format&fit=crop&q=80&w=800',
    published_at: '2023-11-01',
    author_name: 'Admin',
    category: 'Event'
  },
  {
    id: '3',
    title: 'Kerjasama Baru dengan PLTU Tanjung Kasam',
    summary: 'Program magang bersertifikat untuk mahasiswa semester akhir.',
    content: 'Politeknik Negeri Batam melalui prodi RPE resmi menandatangani MoU dengan PLTU Tanjung Kasam. Kerjasama ini mencakup program magang industri selama 6 bulan (MBKM), penelitian bersama dosen, dan rekrutmen lulusan langsung.',
    image_url: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=800',
    published_at: '2023-09-20',
    author_name: 'KaProdi',
    category: 'Academic'
  }
];

export const COURSES_DATA: Course[] = [
  { 
    code: 'RPE101', name: 'Fisika Terapan', name_en: 'Applied Physics', 
    semester: 1, credits: 3, type: 'Wajib', 
    credits_theory: 2, credits_seminar: 0, credits_practicum: 1, 
    description: 'Dasar fisika untuk teknik energi.',
    learning_outcomes_general: [
        'Memahami hukum dasar fisika mekanika dan termodinamika.',
        'Mampu melakukan pengukuran besaran fisis dengan alat ukur standar.'
    ],
    references: [
        'Halliday, Resnick, Walker, "Fundamentals of Physics"',
        'Giancoli, "Physics for Scientists and Engineers"'
    ]
  },
  { 
    code: 'RPE102', name: 'Matematika Teknik I', name_en: 'Engineering Mathematics I', 
    semester: 1, credits: 3, type: 'Wajib', 
    credits_theory: 3, credits_seminar: 0, credits_practicum: 0, 
    description: 'Kalkulus dasar dan aljabar.',
    learning_outcomes_general: [
        'Mampu menyelesaikan persoalan sistem persamaan linear.',
        'Memahami konsep limit, turunan, dan integral.'
    ],
    references: [
        'Erwin Kreyszig, "Advanced Engineering Mathematics"',
        'K.A. Stroud, "Engineering Mathematics"'
    ]
  },
  { 
    code: 'RPE201', name: 'Termodinamika Teknik', name_en: 'Engineering Thermodynamics', 
    semester: 2, credits: 4, type: 'Wajib', 
    credits_theory: 2, credits_seminar: 0, credits_practicum: 2, 
    description: 'Hukum termodinamika dan siklus energi.',
    learning_outcomes_general: [
        'Mampu menganalisis siklus termodinamika dasar (Otto, Diesel, Rankine).',
        'Memahami properti zat murni dan gas ideal.'
    ],
    references: [
        'Cengel & Boles, "Thermodynamics: An Engineering Approach"',
        'Moran & Shapiro, "Fundamentals of Engineering Thermodynamics"'
    ]
  },
  { 
    code: 'IF627', name: 'Proyek Akhir', name_en: 'Final Project', 
    semester: 6, credits: 6, type: 'Wajib', 
    credits_theory: 0, credits_seminar: 0, credits_practicum: 6, 
    description: 'Pengerjaan tugas akhir mahasiswa.',
    learning_outcomes_general: [
        'Mampu merancang dan mengimplementasikan solusi teknik untuk masalah nyata.',
        'Mampu menyusun laporan ilmiah dan mempresentasikannya.'
    ],
    references: [
        'Pedoman Penulisan Tugas Akhir Polibatam'
    ]
  },
  { 
    code: 'MB1IF', name: 'Magang', name_en: 'Internship', 
    semester: 6, credits: 12, type: 'Pilihan', 
    credits_theory: 0, credits_seminar: 0, credits_practicum: 12, 
    description: 'Program magang industri.',
    learning_outcomes_general: [
        'Memiliki pengalaman kerja profesional di industri.',
        'Mampu beradaptasi dengan budaya kerja dan etika profesi.'
    ],
    references: [
        'Buku Panduan Magang Industri'
    ]
  },
  { 
    code: 'IF526', name: 'Technopreneurship', name_en: 'Technopreneurship', 
    semester: 6, credits: 2, type: 'Wajib', 
    credits_theory: 0, credits_seminar: 0, credits_practicum: 2, 
    description: 'Kewirausahaan berbasis teknologi.',
    learning_outcomes_general: [
        'Mampu menyusun rencana bisnis (Business Plan) berbasis teknologi.',
        'Memahami konsep HAKI dan komersialisasi produk.'
    ],
    references: [
        'Byers, Dorf, Nelson, "Technology Ventures: From Idea to Enterprise"'
    ]
  },
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'f1',
    name: 'Laboratorium Konversi Energi',
    description: 'Dilengkapi dengan modul surya, turbin angin skala kecil, dan simulator PLTMH.',
    image_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    capacity: 30,
    gallery_urls: [
        'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'f2',
    name: 'Workshop Mekanik',
    description: 'Peralatan lengkap untuk fabrikasi komponen mesin dan maintenance simulator.',
    image_url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=800',
    capacity: 50,
    gallery_urls: [
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1581092334651-ddf26f9a09d0?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'f3',
    name: 'Control Room Simulator',
    description: 'Simulator ruang kontrol pembangkit listrik standar industri (DCS/SCADA).',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    capacity: 20,
    gallery_urls: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

export const LECTURERS_DATA: Lecturer[] = [
  { 
    id: 'l1', 
    name: 'Dr. Eng. Budi Santoso, S.T., M.Sc.', 
    title: 'Ketua Jurusan Teknik Mesin', 
    specialization: 'Thermodynamics, Energy Conversion', 
    email: 'budi.santoso@polibatam.ac.id', 
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    nik: '198501152010121002',
    program_study: 'Teknologi Rekayasa Pembangkit Energi',
    last_education: 'Doktor (S3)',
    education_history: [
      'Sarjana Teknik (S1) Teknik Mesin Universitas Indonesia',
      'Master of Science (S2) Energy System, TU Delft',
      'Doctor of Engineering (S3) Thermal Power, Kyushu University'
    ],
    social_links: {
      linkedin: '#',
      scopus: '#',
      sinta: '#',
      google_scholar: '#'
    }
  },
  { 
    id: 'l2', 
    name: 'Siti Aminah, S.T., M.T.', 
    title: 'Sekretaris Jurusan', 
    specialization: 'Renewable Energy Systems', 
    email: 'siti.aminah@polibatam.ac.id', 
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    nik: '198803202015042001',
    program_study: 'Teknologi Rekayasa Pembangkit Energi',
    last_education: 'Magister Teknik (S2)',
    education_history: [
      'Sarjana Teknik (S1) Teknik Elektro ITS',
      'Magister Teknik (S2) Energi Terbarukan ITB'
    ],
    social_links: {
      instagram: '#',
      linkedin: '#',
      tiktok: '#'
    }
  },
  { 
    id: 'l3', 
    name: 'Ir. Joko Susilo, M.T.', 
    title: 'Kepala Laboratorium Konversi Energi', 
    specialization: 'Power Plant Maintenance', 
    email: 'joko.susilo@polibatam.ac.id', 
    image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    nik: '197509102005011003',
    program_study: 'Teknologi Rekayasa Pembangkit Energi',
    last_education: 'Magister Teknik (S2)',
    education_history: [
      'Sarjana Teknik (S1) Teknik Mesin UGM',
      'Magister Teknik (S2) Teknik Mesin Universitas Indonesia'
    ],
    social_links: {
      facebook: '#',
      others: [
        { label: 'Blog Pribadi', url: 'https://jokosusilo.blog' }
      ]
    }
  },
];