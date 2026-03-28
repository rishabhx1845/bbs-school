import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 Not Found | BBS Smart Public School</title></Helmet>
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="font-display text-[8rem] font-bold text-primary-100 dark:text-navy-700 leading-none select-none">
            404
          </div>
          <h1 className="font-display text-3xl font-bold text-navy-700 dark:text-white mt-2 mb-4">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
