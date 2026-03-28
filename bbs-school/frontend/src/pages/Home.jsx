import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import {
  FiAward, FiUsers, FiBookOpen, FiTrendingUp, FiX,
  FiChevronRight, FiStar, FiCheck, FiHelpCircle, FiChevronDown
} from 'react-icons/fi';
import { SectionHeader } from '../components/common/Spinner';
import api from '../utils/api';

// Image placeholders — replace with real school images in /public/images/
const SLIDER_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/images/school${i + 1}.jpg`,
  // Gradient fallback when image missing
  gradient: [
    'from-navy-700 to-navy-900',
    'from-primary-600 to-primary-900',
    'from-teal-600 to-navy-800',
    'from-indigo-600 to-navy-900',
    'from-orange-600 to-red-900',
    'from-green-600 to-teal-900',
    'from-purple-600 to-navy-900',
    'from-rose-600 to-orange-900',
    'from-cyan-600 to-blue-900',
    'from-amber-600 to-orange-900',
  ][i],
  caption: [
    'Nurturing Excellence, Building Futures',
    'State-of-the-Art Science Laboratories',
    'World-Class Sports Facilities',
    'A Community of Lifelong Learners',
    'Annual Cultural Festival – Celebrating Talent',
    'Modern Computer Labs & Digital Learning',
    'Expansive Library with 10,000+ Books',
    'Smart Classrooms Powered by Technology',
    'Dedicated Faculty, Exceptional Results',
    'Your Future Begins Here',
  ][i],
}));

const STATS = [
  { icon: FiUsers,    value: '1,200+', label: 'Students Enrolled' },
  { icon: FiAward,    value: '18+',    label: 'Years of Excellence' },
  { icon: FiBookOpen, value: '50+',    label: 'Expert Faculty' },
  { icon: FiTrendingUp, value: '98%',  label: 'Board Pass Rate' },
];

const HIGHLIGHTS = [
  { icon: '🏆', title: 'Board Results',   desc: 'Consistently 98%+ pass rate in CBSE Board exams with top district rankers.' },
  { icon: '🔬', title: 'Science Labs',    desc: 'Fully equipped Physics, Chemistry and Biology labs for hands-on learning.' },
  { icon: '💻', title: 'Digital Campus',  desc: 'Smart classrooms, high-speed Wi-Fi and a modern computer laboratory.' },
  { icon: '⚽', title: 'Sports Arena',    desc: 'Football, Basketball, Cricket, Kabaddi, Athletics — excellence on every field.' },
  { icon: '🎭', title: 'Co-curriculars', desc: 'Music, Dance, Drama, Art & Craft — holistic development beyond textbooks.' },
  { icon: '📚', title: 'Library',         desc: 'Rich collection of 10,000+ books, journals, and digital resources.' },
];

const TESTIMONIALS = [
  { name: 'Suresh Sharma',  role: 'Parent of Class 10 Student', text: 'BBS Smart Public School has been instrumental in shaping my son Rahul\'s academic career. The teachers are dedicated and the environment is truly nurturing.', rating: 5 },
  { name: 'Dr. Meena Gupta', role: 'Parent of Class 12 Graduate', text: 'My daughter scored 94% in boards and got into her dream college. The school\'s guidance and support made all the difference.', rating: 5 },
  { name: 'Vikram Verma',   role: 'Alumni – Batch 2020',        text: 'The values and discipline I learned at BBS shaped who I am today. The faculty are not just teachers but true mentors.', rating: 5 },
];

const FAQS = [
  { q: 'When do admissions open for the new session?', a: 'Admissions for the new academic session typically open in December–January. You can apply online through our Admissions page or visit the school office.' },
  { q: 'What is the medium of instruction?', a: 'The school follows the CBSE curriculum with English as the primary medium of instruction. Hindi is taught as a compulsory subject.' },
  { q: 'Are transportation facilities available?', a: 'Yes, the school provides bus transportation covering major areas of Lucknow. Routes and fee details are available at the school office.' },
  { q: 'What are the school timings?', a: 'School runs Monday to Saturday from 8:00 AM to 2:30 PM. The administrative office is open from 9:00 AM to 4:00 PM.' },
  { q: 'Does the school have hostel facilities?', a: 'Currently, day-scholar admission only. However, we are planning to introduce hostel facilities in the upcoming session.' },
];

const WHY_CHOOSE = [
  'CBSE Affiliated & Govt. Recognised',
  'Experienced & Qualified Faculty',
  'Smart Classrooms & Modern Labs',
  'Activity-based Learning Approach',
  'Regular Parent-Teacher Meetings',
  'CCTV Secured Campus',
  'Nutritious Canteen Food',
  'Annual Academic & Sports Calendar',
];

export default function Home() {
  const [notices, setNotices]           = useState([]);
  const [showPopup, setShowPopup]       = useState(false);
  const [openFaq, setOpenFaq]           = useState(null);
  const [imgErrors, setImgErrors]       = useState({});

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data } = await api.get('/notices?isImportant=true&limit=3');
        setNotices(data.notices || []);
        if (data.notices?.length > 0) {
          const dismissed = sessionStorage.getItem('bbs_popup_dismissed');
          if (!dismissed) setTimeout(() => setShowPopup(true), 1500);
        }
      } catch { /* use empty */ }
    };
    fetchNotices();
  }, []);

  const dismissPopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('bbs_popup_dismissed', '1');
  };

  const handleImgError = (id) => setImgErrors(prev => ({ ...prev, [id]: true }));

  return (
    <>
      <Helmet>
        <title>BBS Smart Public School, Patel Nagar | Home</title>
        <meta name="description" content="BBS Smart Public School, Patel Nagar – Nurturing Excellence and Building Futures since 2005. Admissions open for 2025-26." />
      </Helmet>

      {/* ── Announcement Popup ── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={dismissPopup}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white dark:bg-navy-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative popup-enter"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={dismissPopup} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">
                <FiX size={20} />
              </button>
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">📢</span>
                <h3 className="font-display text-2xl font-bold text-navy-700 dark:text-white">Important Notices</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">From BBS Smart Public School</p>
              </div>
              <div className="space-y-3">
                {notices.map(n => (
                  <div key={n._id} className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-l-4 border-primary-500">
                    <p className="font-semibold text-sm text-navy-700 dark:text-white">{n.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{n.content}</p>
                  </div>
                ))}
              </div>
              <button onClick={dismissPopup} className="btn-primary w-full mt-6 justify-center">
                Got it, Thanks!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Slider ── */}
      <section className="relative pt-16">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[90vh] min-h-[560px]"
        >
          {SLIDER_IMAGES.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                {!imgErrors[slide.id] ? (
                  <img
                    src={slide.src}
                    alt={slide.caption}
                    className="w-full h-full object-cover"
                    onError={() => handleImgError(slide.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
                    <div className="text-center text-white opacity-30">
                      <div className="text-8xl font-display font-bold">BBS</div>
                      <div className="text-xl mt-2 tracking-widest">SMART PUBLIC SCHOOL</div>
                    </div>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {/* Hero Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-primary-300 font-semibold text-sm uppercase tracking-widest mb-4"
                    >
                      BBS Smart Public School • Patel Nagar
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight"
                    >
                      {slide.caption}
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-wrap gap-4 justify-center"
                    >
                      <Link to="/admissions" className="btn-primary text-base">
                        Apply for Admission
                      </Link>
                      <Link to="/about" className="btn-secondary border-white text-white hover:bg-white hover:text-navy-800 text-base">
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Stats bar */}
        <div className="relative z-10 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-5xl">
          <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div key={label} className={`p-5 text-center ${i < 3 ? 'border-r border-gray-100 dark:border-navy-700' : ''}`}>
                <Icon size={22} className="text-primary-500 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-navy-700 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-24 bg-gray-50 dark:bg-navy-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="What We Offer"
            title="A Complete Learning Ecosystem"
            subtitle="From academics to co-curriculars, we nurture every dimension of a student's growth."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 group"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display font-bold text-lg text-navy-700 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle">Why BBS?</p>
              <h2 className="section-title mb-6">Why Choose BBS Smart Public School?</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                For over 18 years, BBS Smart Public School has been the preferred choice for parents who want the best of both academics and character development for their children.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHY_CHOOSE.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                      <FiCheck size={12} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary mt-8 inline-flex items-center gap-2">
                Learn Our Story <FiChevronRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Students', value: '1,200+', color: 'from-primary-500 to-primary-700' },
                { label: 'Teachers', value: '50+',    color: 'from-navy-500 to-navy-700' },
                { label: 'Pass Rate', value: '98%',   color: 'from-green-500 to-teal-700' },
                { label: 'Est. Year', value: '2005',  color: 'from-purple-500 to-indigo-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white text-center`}>
                  <p className="font-display text-4xl font-bold">{value}</p>
                  <p className="text-sm opacity-80 mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-navy-700 dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="What Parents Say"
            title="Trusted by Families Across Lucknow"
            subtitle="Hear from the parents and alumni who have experienced the BBS difference."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, rating }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="flex mb-3">
                  {Array.from({ length: rating }).map((_, j) => (
                    <FiStar key={j} size={16} className="text-gold-400 fill-current" style={{ fill: '#fbbf24' }} />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-gray-400 text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notices ── */}
      {notices.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-navy-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeader eyebrow="Latest Updates" title="School Announcements" />
            <div className="space-y-4">
              {notices.map(n => (
                <div key={n._id} className="card p-5 flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-semibold text-navy-700 dark:text-white">{n.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{n.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know about admissions, facilities, and school life." />
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-navy-700 dark:text-white flex items-center gap-3">
                    <FiHelpCircle size={16} className="text-primary-500 shrink-0" />
                    {q}
                  </span>
                  <FiChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-12">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Join the BBS Family?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
              Admissions for 2025-26 are open. Secure your child's future at BBS Smart Public School.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/admissions" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-xl transition-colors shadow-md">
                Apply Now
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
