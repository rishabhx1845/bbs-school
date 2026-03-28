import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiYoutube, FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-800 dark:bg-navy-900 text-gray-300">
      {/* Wave top */}
      <div className="overflow-hidden">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 0V60H0Z" fill="currentColor" className="text-gray-50 dark:text-navy-800" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="text-white font-display font-bold">BBS</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm leading-tight">BBS Smart Public School</p>
                <p className="text-gray-400 text-xs">Patel Nagar, Lucknow</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Nurturing young minds with quality education, strong values, and a commitment to excellence since 2005.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiFacebook, href: '#', label: 'Facebook' },
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiYoutube, href: '#', label: 'YouTube' },
                { icon: FiTwitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-navy-700 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/',           label: 'Home' },
                { to: '/about',      label: 'About Us' },
                { to: '/academics',  label: 'Academics' },
                { to: '/admissions', label: 'Admissions' },
                { to: '/gallery',    label: 'Gallery' },
                { to: '/contact',    label: 'Contact Us' },
                { to: '/login',      label: 'Student Portal' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1.5">
                    <span className="text-primary-500">›</span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-lg">Classes Offered</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Pre-Primary (Nursery to UKG)', 'Primary (Class I – V)', 'Middle School (Class VI – VIII)', 'Secondary (Class IX – X)', 'Senior Secondary (Class XI – XII)', 'Science & Commerce Streams'].map(item => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-primary-500 mt-0.5">›</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-lg">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin className="text-primary-400 mt-0.5 shrink-0" size={16} />
                <span className="text-gray-400">Patel Nagar, Lucknow,<br />Uttar Pradesh – 226001</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone className="text-primary-400 shrink-0" size={16} />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-primary-400 transition-colors">+91 98765-43210</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail className="text-primary-400 shrink-0" size={16} />
                <a href="mailto:info@bbsschool.edu.in" className="text-gray-400 hover:text-primary-400 transition-colors">info@bbsschool.edu.in</a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <FiClock className="text-primary-400 mt-0.5 shrink-0" size={16} />
                <span className="text-gray-400">Mon–Sat: 8:00 AM – 2:30 PM<br />Office: 9:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-navy-700 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} BBS Smart Public School, Patel Nagar. All rights reserved.</p>
          <p>Designed with ❤️ for quality education</p>
        </div>
      </div>
    </footer>
  );
}
