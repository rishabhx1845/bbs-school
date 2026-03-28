import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';
import { SectionHeader } from '../components/common/Spinner';

const GALLERY_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/images/school${i + 1}.jpg`,
  gradient: ['from-navy-700 to-navy-900','from-primary-600 to-primary-900','from-teal-600 to-navy-800','from-indigo-600 to-navy-900','from-orange-600 to-red-900','from-green-600 to-teal-900','from-purple-600 to-navy-900','from-rose-600 to-orange-900','from-cyan-600 to-blue-900','from-amber-600 to-orange-900'][i],
  caption: ['School Building & Campus','Science Laboratory','Sports Ground','Annual Day Celebration','Computer Laboratory','Cultural Festival','Library Reading Hall','Smart Classroom','Independence Day Parade','Prize Distribution Ceremony'][i],
  category: ['campus','academics','sports','events','academics','events','academics','academics','events','events'][i],
}));

const CATEGORIES = ['all', 'campus', 'academics', 'sports', 'events'];

export default function Gallery() {
  const [active, setActive]     = useState('all');
  const [lightbox, setLightbox] = useState(null); // index
  const [imgErrors, setImgErrors] = useState({});

  const filtered = active === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === active);

  const prev = () => setLightbox(l => (l - 1 + filtered.length) % filtered.length);
  const next = () => setLightbox(l => (l + 1) % filtered.length);

  const handleImgError = id => setImgErrors(p => ({ ...p, [id]: true }));

  return (
    <>
      <Helmet>
        <title>Gallery | BBS Smart Public School</title>
        <meta name="description" content="Explore photos from BBS Smart Public School — campus, events, sports, labs and more." />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[20vw] font-bold text-white select-none">BBS</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Photo Gallery
          </motion.h1>
          <p className="text-gray-300 text-lg">A glimpse into life at BBS Smart Public School</p>
        </div>
      </div>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                  active === cat
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-navy-600'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square"
                  onClick={() => setLightbox(idx)}
                >
                  {!imgErrors[img.id] ? (
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => handleImgError(img.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${img.gradient} flex items-center justify-center`}>
                      <span className="text-white font-display font-bold text-2xl opacity-40">BBS</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                    <FiZoomIn size={28} className="text-white" />
                    <p className="text-white text-xs text-center px-3 font-medium">{img.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
              <FiX size={24} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
              <FiChevronLeft size={24} />
            </button>
            <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
              <FiChevronRight size={24} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {!imgErrors[filtered[lightbox]?.id] ? (
                <img
                  src={filtered[lightbox]?.src}
                  alt={filtered[lightbox]?.caption}
                  className="w-full max-h-[75vh] object-contain rounded-2xl"
                  onError={() => handleImgError(filtered[lightbox]?.id)}
                />
              ) : (
                <div className={`w-full h-64 bg-gradient-to-br ${filtered[lightbox]?.gradient} rounded-2xl flex items-center justify-center`}>
                  <span className="text-white font-display font-bold text-6xl opacity-30">BBS</span>
                </div>
              )}
              <p className="text-center text-white mt-4 text-sm">{filtered[lightbox]?.caption}</p>
              <p className="text-center text-gray-400 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
