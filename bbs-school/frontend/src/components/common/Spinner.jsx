import React from 'react';
import { motion } from 'framer-motion';

// ── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ fullScreen = false, size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' };
  const spinner = (
    <div className={`${sizes[size]} border-4 border-gray-200 dark:border-navy-600 border-t-primary-500 rounded-full animate-spin`} />
  );
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-navy-900 z-50">
        {spinner}
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm font-body">Loading…</p>
      </div>
    );
  }
  return <div className="flex justify-center py-8">{spinner}</div>;
}

export default Spinner;

// ── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── Button ────────────────────────────────────────────────────────────────────
export function Button({ children, variant = 'primary', className = '', loading = false, ...props }) {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    navy:      'btn-navy',
    ghost:     'px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors font-medium',
    danger:    'bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300',
  };
  return (
    <button
      className={`${variants[variant]} ${className} ${loading ? 'opacity-70 cursor-not-allowed' : ''} inline-flex items-center gap-2`}
      disabled={loading}
      {...props}
    >
      {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className={`section-subtitle ${light ? 'text-primary-300' : ''}`}>{eyebrow}</p>
      )}
      <h2 className={`section-title ${light ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${
          light ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'default' }) {
  const variants = {
    default:   'bg-gray-100 text-gray-700 dark:bg-navy-600 dark:text-gray-300',
    primary:   'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    success:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    warning:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    navy:      'bg-navy-100 text-navy-700 dark:bg-navy-600 dark:text-navy-200',
  };
  return (
    <span className={`badge ${variants[variant]}`}>{children}</span>
  );
}

// ── StatsCard ─────────────────────────────────────────────────────────────────
export function StatsCard({ icon: Icon, value, label, color = 'primary' }) {
  const colors = {
    primary: 'from-primary-500 to-primary-700',
    navy:    'from-navy-500 to-navy-700',
    green:   'from-green-500 to-green-700',
    purple:  'from-purple-500 to-purple-700',
  };
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-md`}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-gray-800 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </Card>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────
export function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-navy-600 disabled:opacity-40 hover:bg-primary-50 dark:hover:bg-navy-700 transition-colors"
      >
        ← Prev
      </button>
      {Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-primary-600 text-white'
              : 'border border-gray-200 dark:border-navy-600 hover:bg-primary-50 dark:hover:bg-navy-700'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-navy-600 disabled:opacity-40 hover:bg-primary-50 dark:hover:bg-navy-700 transition-colors"
      >
        Next →
      </button>
    </div>
  );
}
