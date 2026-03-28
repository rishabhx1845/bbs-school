import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGrid, FiUsers, FiUser, FiFileText, FiBell, FiClipboard,
  FiLogOut, FiPlus, FiSearch, FiRefreshCw, FiTrash2, FiEdit,
  FiChevronRight, FiMenu, FiX, FiCheck, FiClock
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { StatsCard, Pagination, Badge, Button, Spinner } from '../components/common/Spinner';
import api from '../utils/api';
import toast from 'react-hot-toast';

// ── Sidebar nav items ────────────────────────────────────────────────
const NAV = [
  { to: '/admin',             label: 'Dashboard',   icon: FiGrid,      end: true },
  { to: '/admin/students',    label: 'Students',    icon: FiUsers },
  { to: '/admin/teachers',    label: 'Teachers',    icon: FiUser },
  { to: '/admin/notices',     label: 'Notices',     icon: FiBell },
  { to: '/admin/admissions',  label: 'Admissions',  icon: FiClipboard },
  { to: '/admin/results',     label: 'Results',     icon: FiFileText },
];

// ── Layout ──────────────────────────────────────────────────────────
function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-navy-800 dark:bg-navy-900 border-r border-navy-700 flex flex-col transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-navy-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">BBS</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Admin Panel</p>
              <p className="text-gray-400 text-xs">BBS Smart Public School</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              onClick={() => setSideOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-navy-700 hover:text-white'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-700">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0]}
            </div>
            <div>
              <p className="text-white text-xs font-semibold truncate max-w-28">{user?.name}</p>
              <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm px-2 py-1.5 w-full rounded-lg hover:bg-navy-700 transition-colors">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sideOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSideOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSideOpen(!sideOpen)} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700">
            {sideOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <div className="flex-1">
            <p className="font-display font-bold text-navy-700 dark:text-white">BBS Admin Dashboard</p>
          </div>
          <Link to="/" className="text-xs text-gray-500 hover:text-primary-600 flex items-center gap-1">
            View Website <FiChevronRight size={12} />
          </Link>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// ── Overview Dashboard ───────────────────────────────────────────────
function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(({ data }) => setStats(data.stats))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy-700 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back! Here's what's happening at BBS today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard icon={FiUsers}    value={stats?.totalStudents || 0}    label="Total Students"     color="primary" />
        <StatsCard icon={FiUser}     value={stats?.totalTeachers || 0}    label="Faculty Members"    color="navy" />
        <StatsCard icon={FiBell}     value={stats?.totalNotices || 0}     label="Active Notices"     color="green" />
        <StatsCard icon={FiClipboard} value={stats?.pendingAdmissions || 0} label="Pending Admissions" color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-display font-bold text-navy-700 dark:text-white">Recent Admissions</h3>
            <Link to="/admin/admissions" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentAdmissions?.map(a => (
              <div key={a._id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-navy-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{a.studentName}</p>
                  <p className="text-xs text-gray-500">Class {a.applyingForClass} • {a.parentName}</p>
                </div>
                <Badge variant={a.status === 'pending' ? 'warning' : a.status === 'approved' ? 'success' : 'danger'}>
                  {a.status}
                </Badge>
              </div>
            ))}
            {(!stats?.recentAdmissions?.length) && <p className="text-sm text-gray-400 text-center py-4">No recent admissions</p>}
          </div>
        </div>

        {/* Recent Notices */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-display font-bold text-navy-700 dark:text-white">Recent Notices</h3>
            <Link to="/admin/notices" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentNotices?.map(n => (
              <div key={n._id} className="flex items-start gap-3 py-2 border-b border-gray-50 dark:border-navy-700 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                {n.isImportant && <Badge variant="danger" className="ml-auto shrink-0">Important</Badge>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Students Manager ─────────────────────────────────────────────────
function StudentsManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [pages, setPages]       = useState(1);
  const [total, setTotal]       = useState(0);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/students?page=${page}&limit=8&search=${search}`);
      setStudents(data.students);
      setPages(data.pages);
      setTotal(data.total);
    } catch { toast.error('Failed to load students'); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      toast.success('Student deleted');
      fetchStudents();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-navy-700 dark:text-white">Students ({total})</h2>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search students…" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-9 py-2 text-sm w-48" />
          </div>
          <button onClick={fetchStudents} className="p-2 rounded-xl border border-gray-200 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
            <FiRefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-750">
                  {['Roll No', 'Name', 'Class', 'Parent', 'Phone', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s._id} className="border-b border-gray-50 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700/50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.rollNo}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{s.name}</td>
                    <td className="px-4 py-3"><Badge variant="primary">Class {s.class}{s.section}</Badge></td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{s.parentName}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{s.phone}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(s._id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {!students.length && <tr><td colSpan={6} className="text-center py-12 text-gray-400">No students found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
}

// ── Notices Manager ──────────────────────────────────────────────────
function NoticesManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({ title: '', content: '', category: 'general', isImportant: false });
  const [page, setPage]       = useState(1);
  const [pages, setPages]     = useState(1);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/notices?page=${page}&limit=6`);
      setNotices(data.notices);
      setPages(data.pages);
    } catch { toast.error('Failed to load notices'); }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchNotices(); }, [fetchNotices]);

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await api.post('/notices', form);
      toast.success('Notice posted!');
      setForm({ title: '', content: '', category: 'general', isImportant: false });
      fetchNotices();
    } catch { toast.error('Failed to post notice'); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this notice?')) return;
    try { await api.delete(`/notices/${id}`); toast.success('Notice deleted'); fetchNotices(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Create Notice */}
      <div className="card p-6">
        <h3 className="font-display font-bold text-navy-700 dark:text-white mb-5">Post New Notice</h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Notice title *" className="input-field" required />
          <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            placeholder="Notice content *" rows={4} className="input-field resize-none" required />
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
            {['general','exam','event','holiday','result','admission','sports','cultural'].map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isImportant} onChange={e => setForm(f => ({ ...f, isImportant: e.target.checked }))} className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Mark as Important</span>
          </label>
          <Button type="submit" className="w-full justify-center"><FiPlus size={16} /> Post Notice</Button>
        </form>
      </div>

      {/* Notice List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-navy-700 dark:text-white">All Notices</h3>
        {loading ? <Spinner /> : notices.map(n => (
          <div key={n._id} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant="primary">{n.category}</Badge>
                  {n.isImportant && <Badge variant="danger">Important</Badge>}
                </div>
                <p className="font-semibold text-sm text-navy-700 dark:text-white">{n.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.content}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <button onClick={() => handleDelete(n._id)} className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0">
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        <Pagination page={page} pages={pages} onPageChange={setPage} />
      </div>
    </div>
  );
}

// ── Admissions Manager ───────────────────────────────────────────────
function AdmissionsManager() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState('pending');
  const [page, setPage]             = useState(1);
  const [pages, setPages]           = useState(1);

  const fetchAdmissions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admissions?page=${page}&limit=8&status=${filter}`);
      setAdmissions(data.admissions);
      setPages(data.pages);
    } catch { toast.error('Failed to load admissions'); }
    finally { setLoading(false); }
  }, [page, filter]);

  useEffect(() => { fetchAdmissions(); }, [fetchAdmissions]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admissions/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchAdmissions();
    } catch { toast.error('Update failed'); }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {['pending','under-review','approved','rejected'].map(s => (
          <button key={s} onClick={() => { setFilter(s); setPage(1); }}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === s ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300'
            }`}
          >{s}</button>
        ))}
      </div>

      <div className="card overflow-hidden">
        {loading ? <Spinner /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-navy-750 border-b border-gray-100 dark:border-navy-700">
                  {['App ID','Student','Class','Parent','Phone','Status','Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {admissions.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700/50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.applicationId}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{a.studentName}</td>
                    <td className="px-4 py-3"><Badge variant="primary">Class {a.applyingForClass}</Badge></td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{a.parentName}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{a.phone}</td>
                    <td className="px-4 py-3">
                      <Badge variant={a.status === 'approved' ? 'success' : a.status === 'rejected' ? 'danger' : 'warning'}>{a.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {a.status !== 'approved' && (
                          <button onClick={() => updateStatus(a._id, 'approved')} className="p-1.5 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Approve">
                            <FiCheck size={14} />
                          </button>
                        )}
                        {a.status !== 'under-review' && a.status !== 'approved' && (
                          <button onClick={() => updateStatus(a._id, 'under-review')} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Under Review">
                            <FiClock size={14} />
                          </button>
                        )}
                        {a.status !== 'rejected' && (
                          <button onClick={() => updateStatus(a._id, 'rejected')} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Reject">
                            <FiX size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!admissions.length && <tr><td colSpan={7} className="text-center py-12 text-gray-400">No {filter} admissions</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
}

// ── Main Admin Dashboard ─────────────────────────────────────────────
export default function AdminDashboard() {
  return (
    <>
      <Helmet><title>Admin Dashboard | BBS Smart Public School</title></Helmet>
      <AdminLayout>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="students"   element={<StudentsManager />} />
          <Route path="notices"    element={<NoticesManager />} />
          <Route path="admissions" element={<AdmissionsManager />} />
          <Route path="*"          element={<Overview />} />
        </Routes>
      </AdminLayout>
    </>
  );
}
