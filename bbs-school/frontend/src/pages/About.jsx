import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiAward } from 'react-icons/fi';
import { SectionHeader } from '../components/common/Spinner';

const VALUES = [
  { icon: '🎓', title: 'Academic Excellence', desc: 'Rigorous curriculum with focus on conceptual clarity and critical thinking.' },
  { icon: '🤝', title: 'Integrity',            desc: 'Honesty, transparency and ethical conduct in every aspect of school life.' },
  { icon: '🌱', title: 'Holistic Growth',       desc: 'Nurturing physical, mental, emotional and social development.' },
  { icon: '🌍', title: 'Global Perspective',    desc: 'Preparing students for a competitive, interconnected world.' },
];

const MILESTONES = [
  { year: '2005', event: 'BBS Smart Public School established in Patel Nagar with 120 students.' },
  { year: '2009', event: 'Opened Senior Secondary wing (Classes XI–XII) with Science & Commerce.' },
  { year: '2012', event: 'Constructed state-of-the-art Science & Computer Labs.' },
  { year: '2015', event: 'Achieved 100% board pass rate for the first time. National recognition.' },
  { year: '2018', event: 'Launched Smart Classroom initiative across all classes.' },
  { year: '2022', event: 'Crossed 1,000 student enrollment milestone.' },
  { year: '2024', event: 'Launched digital student portal and online admission system.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | BBS Smart Public School</title>
        <meta name="description" content="Learn about BBS Smart Public School's history, vision, mission and the message from our Principal." />
      </Helmet>

      {/* Page Hero */}
      <div className="page-hero">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        {/* Logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[20vw] font-bold text-white select-none">BBS</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-primary-300 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            About BBS Smart Public School
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-300 text-lg max-w-2xl mx-auto">
            18+ years of nurturing young minds with quality education, strong values, and a commitment to building futures.
          </motion.p>
        </div>
      </div>

      {/* History */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="section-subtitle">Our History</p>
              <h2 className="section-title mb-6">A Legacy of Learning</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>BBS Smart Public School was founded in 2005 with a vision to provide quality education that balances academic rigor with holistic development. Starting from a modest campus in Patel Nagar, Lucknow, the school has grown into one of the most respected educational institutions in the region.</p>
                <p>From 120 students in our first year to over 1,200 today, our journey reflects the trust families place in us. Our dedicated faculty, modern infrastructure, and student-centered approach have consistently delivered outstanding results across board examinations and competitive assessments.</p>
                <p>Affiliated with the Central Board of Secondary Education (CBSE), we follow a curriculum that combines the best of traditional values and modern pedagogy, preparing students not just for examinations but for life.</p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-800 space-y-6">
                {MILESTONES.map(({ year, event }) => (
                  <div key={year} className="relative">
                    <div className="absolute -left-10 w-6 h-6 rounded-full bg-primary-500 border-4 border-white dark:border-navy-900 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="card p-4">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">{year}</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50 dark:bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Our Purpose" title="Vision & Mission" />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6">
                <FiEye size={24} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To be a leading educational institution that empowers students to become responsible global citizens — equipped with knowledge, character and the confidence to excel in an ever-changing world.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="card p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center mb-6">
                <FiTarget size={24} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To provide a nurturing, inclusive and intellectually stimulating environment where every student is encouraged to discover their potential, develop critical thinking skills, and grow into compassionate, ethical and academically excellent individuals.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
            {VALUES.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-5 text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h4 className="font-semibold text-navy-700 dark:text-white mb-1 text-sm">{title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="Leadership" title="Principal's Message" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              <div className="md:col-span-1 text-center">
                {/* Principal photo placeholder */}
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-navy-400 to-navy-700 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-display font-bold text-5xl">P</span>
                </div>
                <h3 className="font-display font-bold text-xl text-navy-700 dark:text-white">Dr. Rekha Pandey</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm mt-1">Principal</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">M.Ed, Ph.D (Education)</p>
                <div className="flex justify-center gap-1 mt-2">
                  {[1,2,3,4,5].map(s => <FiAward key={s} size={14} className="text-gold-500" />)}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4 uppercase tracking-wider">A Message from Our Principal</p>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4 text-base">
                  <p className="text-lg font-display italic text-navy-700 dark:text-white">"Education is not the filling of a pail, but the lighting of a fire."</p>
                  <p>Dear Students, Parents and Well-wishers,</p>
                  <p>Welcome to BBS Smart Public School — a place where every child's potential is recognized, nurtured and celebrated. Our school is built on the pillars of academic excellence, moral values and a culture of continuous learning.</p>
                  <p>We believe education is a transformative journey. Our dedicated team of educators works tirelessly to ensure that every student not only achieves academic success but also develops the values, skills and resilience needed to thrive in life.</p>
                  <p>I warmly invite you to become part of our BBS family — where your child's dreams become our mission.</p>
                  <p className="font-semibold text-navy-700 dark:text-white">Warm regards,<br />Dr. Rekha Pandey</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
