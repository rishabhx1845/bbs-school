// ═══════════════════════════════════════════════════════════════════
// Academics.jsx
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/Spinner';

export const CLASSES = [
  { level: 'Pre-Primary',    classes: 'Nursery, LKG, UKG',       icon: '🌱', subjects: ['Rhymes & Stories', 'Basic Numbers', 'Drawing & Craft', 'Motor Skills', 'Moral Values'] },
  { level: 'Primary',        classes: 'Class I – V',               icon: '📚', subjects: ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer Basics', 'Art & Craft', 'GK'] },
  { level: 'Middle School',  classes: 'Class VI – VIII',           icon: '🔬', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer'] },
  { level: 'Secondary',      classes: 'Class IX – X (CBSE)',       icon: '📐', subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'IT (Optional)'] },
  { level: 'Senior – Science', classes: 'Class XI – XII',         icon: '⚗️', subjects: ['Physics', 'Chemistry', 'Mathematics/Biology', 'English', 'Computer Science/PE'] },
  { level: 'Senior – Commerce', classes: 'Class XI – XII',        icon: '💼', subjects: ['Accountancy', 'Business Studies', 'Economics', 'English', 'Mathematics/Informatics'] },
];

export default function Academics() {
  return (
    <>
      <Helmet>
        <title>Academics | BBS Smart Public School</title>
        <meta name="description" content="Explore the academic programs, curriculum structure and subjects offered at BBS Smart Public School." />
      </Helmet>
      <div className="page-hero">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[20vw] font-bold text-white select-none">BBS</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Academic Programs
          </motion.h1>
          <p className="text-gray-300 text-lg">CBSE-aligned curriculum from Nursery to Class XII</p>
        </div>
      </div>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Curriculum" title="Classes & Subjects" subtitle="A comprehensive learning journey tailored for every stage of development." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSES.map(({ level, classes, icon, subjects }, i) => (
              <motion.div key={level} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-navy-700 dark:text-white">{level}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400">{classes}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {subjects.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra-curriculars */}
      <section className="py-20 bg-gray-50 dark:bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Beyond Classroom" title="Co-Curricular Activities" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: '🎵', label: 'Music' }, { icon: '💃', label: 'Dance' }, { icon: '🎭', label: 'Drama' },
              { icon: '🎨', label: 'Art & Craft' }, { icon: '🏏', label: 'Cricket' }, { icon: '⚽', label: 'Football' },
              { icon: '🏀', label: 'Basketball' }, { icon: '🤸', label: 'Gymnastics' }, { icon: '♟️', label: 'Chess' },
              { icon: '🗣️', label: 'Debate' }, { icon: '📸', label: 'Photography' }, { icon: '🌿', label: 'Eco Club' },
            ].map(({ icon, label }) => (
              <div key={label} className="card p-4 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
