import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { Button } from '../components/common/Spinner';
import api from '../utils/api';

const CLASSES = ['Nursery','LKG','UKG','1','2','3','4','5','6','7','8','9','10','11','12'];

const INIT = {
  studentName: '', dateOfBirth: '', gender: '', applyingForClass: '',
  previousSchool: '', parentName: '', relation: 'father', phone: '',
  email: '', address: '', message: ''
};

const validate = (f) => {
  const e = {};
  if (!f.studentName.trim())     e.studentName = 'Student name is required';
  if (!f.dateOfBirth)            e.dateOfBirth = 'Date of birth is required';
  if (!f.gender)                 e.gender = 'Please select gender';
  if (!f.applyingForClass)       e.applyingForClass = 'Please select a class';
  if (!f.parentName.trim())      e.parentName = "Parent's name is required";
  if (!f.phone.trim())           e.phone = 'Phone number is required';
  else if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email address';
  if (!f.address.trim())         e.address = 'Address is required';
  return e;
};

export default function Admissions() {
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverErr, setServerErr] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true); setServerErr('');
    try {
      const { data } = await api.post('/admissions', form);
      setSuccess(data);
      setForm(INIT);
    } catch (err) {
      setServerErr(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ name, label, type = 'text', placeholder, required, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children || (
        <input
          type={type} name={name} value={form[name]} onChange={handleChange}
          placeholder={placeholder}
          className={`input-field ${errors[name] ? 'border-red-400 focus:ring-red-400' : ''}`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiAlertCircle size={12} />{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admissions | BBS Smart Public School</title>
        <meta name="description" content="Apply for admission at BBS Smart Public School, Patel Nagar. Online application form for 2025-26 session." />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[20vw] font-bold text-white select-none">BBS</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Admissions 2025-26
          </motion.h1>
          <p className="text-gray-300 text-lg">Secure your child's future — apply online today</p>
        </div>
      </div>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <AnimatePresence>
            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
                <FiCheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-2">Application Submitted!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Thank you for applying to BBS Smart Public School. We will review your application and contact you soon.</p>
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Application ID</p>
                  <p className="font-display text-2xl font-bold text-primary-600 dark:text-primary-400">{success.applicationId}</p>
                  <p className="text-xs text-gray-400 mt-1">Please save this ID for future reference</p>
                </div>
                <Button onClick={() => setSuccess(null)}>Submit Another Application</Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
                <h2 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-2">Online Admission Form</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Fields marked with <span className="text-red-500">*</span> are required</p>

                {serverErr && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <FiAlertCircle className="text-red-500" />
                    <p className="text-red-700 dark:text-red-400 text-sm">{serverErr}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-8">
                    {/* Student Info */}
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-navy-600">Student Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field name="studentName" label="Student's Full Name" placeholder="Enter full name" required />
                        <Field name="dateOfBirth" label="Date of Birth" type="date" required />
                        <Field name="gender" label="Gender" required>
                          <select name="gender" value={form.gender} onChange={handleChange} className={`input-field ${errors.gender ? 'border-red-400' : ''}`}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </Field>
                        <Field name="applyingForClass" label="Applying for Class" required>
                          <select name="applyingForClass" value={form.applyingForClass} onChange={handleChange} className={`input-field ${errors.applyingForClass ? 'border-red-400' : ''}`}>
                            <option value="">Select Class</option>
                            {CLASSES.map(c => <option key={c} value={c}>{c === '1' ? 'Class I' : c.match(/^\d+$/) ? `Class ${c}` : c}</option>)}
                          </select>
                        </Field>
                        <div className="sm:col-span-2">
                          <Field name="previousSchool" label="Previous School (if any)" placeholder="Name of previous school" />
                        </div>
                      </div>
                    </div>

                    {/* Parent Info */}
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-navy-600">Parent / Guardian Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field name="parentName" label="Parent/Guardian Name" placeholder="Full name" required />
                        <Field name="relation" label="Relation" required>
                          <select name="relation" value={form.relation} onChange={handleChange} className="input-field">
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="guardian">Guardian</option>
                          </select>
                        </Field>
                        <Field name="phone" label="Mobile Number" placeholder="10-digit mobile" required />
                        <Field name="email" label="Email Address" type="email" placeholder="email@example.com" />
                        <div className="sm:col-span-2">
                          <Field name="address" label="Residential Address" required>
                            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Full address with city and PIN" rows={3} className={`input-field resize-none ${errors.address ? 'border-red-400' : ''}`} />
                          </Field>
                        </div>
                        <div className="sm:col-span-2">
                          <Field name="message" label="Additional Message (Optional)">
                            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Any additional information..." rows={3} className="input-field resize-none" />
                          </Field>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" loading={loading} className="w-full justify-center py-4 text-base">
                      {loading ? 'Submitting Application…' : 'Submit Admission Application'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
