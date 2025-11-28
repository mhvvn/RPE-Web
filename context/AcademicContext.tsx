
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { COURSES_DATA, LECTURERS_DATA } from '../constants';
import { Course, Lecturer } from '../types';

interface CurriculumFile {
  name: string;
  url: string; // Base64
  date: string;
}

interface AcademicContextType {
  courses: Course[];
  lecturers: Lecturer[];
  curriculumFile: CurriculumFile | null;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (code: string) => void;
  addLecturer: (lecturer: Lecturer) => void;
  updateLecturer: (lecturer: Lecturer) => void;
  deleteLecturer: (id: string) => void;
  updateCurriculumFile: (file: CurriculumFile) => void;
}

const AcademicContext = createContext<AcademicContextType | undefined>(undefined);

export const AcademicProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [lecturers, setLecturers] = useState<Lecturer[]>(LECTURERS_DATA);
  const [curriculumFile, setCurriculumFile] = useState<CurriculumFile | null>(null);

  // Course Actions
  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const updateCourse = (updatedCourse: Course) => {
    setCourses(prev => prev.map(c => c.code === updatedCourse.code ? updatedCourse : c));
  };

  const deleteCourse = (code: string) => {
    setCourses(prev => prev.filter(c => c.code !== code));
  };

  // Lecturer Actions
  const addLecturer = (lecturer: Lecturer) => {
    setLecturers(prev => [...prev, lecturer]);
  };

  const updateLecturer = (updatedLecturer: Lecturer) => {
    setLecturers(prev => prev.map(l => l.id === updatedLecturer.id ? updatedLecturer : l));
  };

  const deleteLecturer = (id: string) => {
    setLecturers(prev => prev.filter(l => l.id !== id));
  };

  // Curriculum File Action
  const updateCurriculumFile = (file: CurriculumFile) => {
    setCurriculumFile(file);
  };

  return (
    <AcademicContext.Provider value={{ 
      courses, addCourse, updateCourse, deleteCourse,
      lecturers, addLecturer, updateLecturer, deleteLecturer,
      curriculumFile, updateCurriculumFile
    }}>
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (context === undefined) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
