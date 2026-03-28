import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Spinner';

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/student', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please enter email and password'); return; }
    setLoading(true); setError('');
    const result = await login(form.email, form.password);
    if (!result.success) setError('Invalid email or password');
    setLoading(false);
  };

  const fill = (email, pwd) => setForm({ email, password: pwd });

  return (
    <>
      <Helmet><title>Login | BBS Smart Public School</title></Helmet>

      <div className="min-h-screen bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center p-4">
        {/* BG watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-display text-[30vw] font-bold text-white select-none">BBS</span>
        </div>
        <div className="absolute inset-0 bg-hero-pattern opacity-10" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
                <span className="text-white font-display font-bold text-xl">BBS</span>
              </div>
              <p className="font-display text-white font-bold text-lg">BBS Smart Public School</p>
              <p className="text-gray-400 text-sm">Patel Nagar, Lucknow</p>
            </Link>
          </div>

          <div className="bg-white dark:bg-navy-800 rounded-3xl shadow-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-1">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Sign in to your school portal</p>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-5 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com" className="input-field pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Enter password" className="input-field pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" loading={loading} className="w-full justify-center py-3.5">
                {loading ? 'Signing In…' : 'Sign In to Portal'}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-navy-700 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => fill('admin@bbs.edu.in', 'Admin@123')}
                  className="text-xs py-2 px-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 transition-colors text-left">
                  <span className="block font-semibold">Admin</span>
                  <span className="text-gray-500">admin@bbs.edu.in</span>
                </button>
                <button onClick={() => fill('student@bbs.edu.in', 'Student@123')}
                  className="text-xs py-2 px-3 rounded-lg bg-navy-100 dark:bg-navy-600 text-navy-700 dark:text-navy-200 hover:bg-navy-200 dark:hover:bg-navy-500 transition-colors text-left">
                  <span className="block font-semibold">Student</span>
                  <span className="text-gray-500">student@bbs.edu.in</span>
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
              <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">← Back to Website</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
