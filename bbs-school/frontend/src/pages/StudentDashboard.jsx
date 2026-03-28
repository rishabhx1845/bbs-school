import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiFileText, FiBell, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Badge, Spinner, StatsCard } from '../components/common/Spinner';
import api from '../utils/api';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notices, setNotices]   = useState([]);
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes] = await Promise.all([
          api.get('/notices?limit=5'),
        ]);
        setNotices(noticesRes.data.notices || []);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  const TABS = [
    { id: 'overview', label: 'Overview',   icon: FiUser },
    { id: 'notices',  label: 'Notices',    icon: FiBell },
    { id: 'results',  label: 'Results',    icon: FiFileText },
  ];

  return (
    <>
      <Helmet><title>Student Portal | BBS Smart Public School</title></Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
        {/* Header */}
        <header className="bg-navy-800 dark:bg-navy-900 text-white px-4 sm:px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="font-bold text-sm">BBS</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm">Student Portal</p>
                <p className="text-gray-400 text-xs">BBS Smart Public School</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                Website <FiChevronRight size={12} />
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm transition-colors">
                <FiLogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 mb-6 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-display font-bold">
                {user?.name?.[0]}
              </div>
              <div>
                <p className="text-primary-200 text-sm">Welcome back,</p>
                <h1 className="font-display text-2xl font-bold">{user?.name}</h1>
                <p className="text-primary-200 text-sm capitalize">{user?.role} • BBS Smart Public School</p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white dark:bg-navy-800 rounded-2xl p-1.5 shadow-sm">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === id ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700'
                }`}
              >
                <Icon size={15} /> <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          {loading ? <Spinner /> : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatsCard icon={FiBell}     value={notices.length} label="Active Notices" color="primary" />
                    <StatsCard icon={FiFileText}  value={results.length || 0} label="My Results"  color="navy" />
                    <StatsCard icon={FiUser}      value="2024-25"        label="Current Session" color="green" />
                  </div>

                  <div className="card p-6">
                    <h3 className="font-display font-bold text-navy-700 dark:text-white mb-4">Profile Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {[
                        { label: 'Full Name',   value: user?.name },
                        { label: 'Email',       value: user?.email },
                        { label: 'Role',        value: user?.role,  capitalize: true },
                        { label: 'Last Login',  value: user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-IN') : 'First Login' },
                      ].map(({ label, value, capitalize }) => (
                        <div key={label}>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">{label}</p>
                          <p className={`font-medium text-gray-800 dark:text-white ${capitalize ? 'capitalize' : ''}`}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notices' && (
                <div className="space-y-4">
                  <h2 className="font-display font-bold text-xl text-navy-700 dark:text-white">School Notices</h2>
                  {notices.map(n => (
                    <motion.div key={n._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="primary">{n.category}</Badge>
                            {n.isImportant && <Badge variant="danger">Important</Badge>}
                          </div>
                          <h4 className="font-semibold text-navy-700 dark:text-white">{n.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{n.content}</p>
                          <p className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {!notices.length && (
                    <div className="card p-12 text-center">
                      <FiBell size={40} className="text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No notices available</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'results' && (
                <div className="card p-12 text-center">
                  <FiFileText size={40} className="text-gray-300 mx-auto mb-3" />
                  <h3 className="font-display text-lg font-bold text-navy-700 dark:text-white mb-2">No Results Yet</h3>
                  <p className="text-gray-500 text-sm">Your exam results will appear here once published by the school.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
