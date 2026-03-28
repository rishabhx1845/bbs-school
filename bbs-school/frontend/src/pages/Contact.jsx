import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import { Button } from '../components/common/Spinner';
import toast from 'react-hot-toast';

const CONTACT_INFO = [
  { icon: FiMapPin, title: 'Address',       lines: ['Patel Nagar, Lucknow', 'Uttar Pradesh – 226001'] },
  { icon: FiPhone,  title: 'Phone',         lines: ['+91 98765-43210', '+91 87654-32109'] },
  { icon: FiMail,   title: 'Email',         lines: ['info@bbsschool.edu.in', 'principal@bbsschool.edu.in'] },
  { icon: FiClock,  title: 'School Hours',  lines: ['Mon–Sat: 8:00 AM – 2:30 PM', 'Office: 9:00 AM – 4:00 PM'] },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    toast.success('Message sent successfully!');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | BBS Smart Public School</title>
        <meta name="description" content="Get in touch with BBS Smart Public School, Patel Nagar. Contact us for admissions, enquiries and more." />
      </Helmet>

      <div className="page-hero">
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <span className="font-display text-[20vw] font-bold text-white select-none">BBS</span>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center pt-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </motion.h1>
          <p className="text-gray-300 text-lg">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </div>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {CONTACT_INFO.map(({ icon: Icon, title, lines }) => (
                  <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h4 className="font-semibold text-navy-700 dark:text-white mb-1.5 text-sm">{title}</h4>
                    {lines.map(l => <p key={l} className="text-xs text-gray-600 dark:text-gray-400">{l}</p>)}
                  </motion.div>
                ))}
              </div>

              {/* Google Map Embed */}
              <div className="rounded-2xl overflow-hidden shadow-card h-64">
                <iframe
                  title="BBS Smart Public School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.9!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzQ4LjEiTiA4MMKwNTYnNDYuMyJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">📍 Patel Nagar, Lucknow, Uttar Pradesh</p>
            </div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {sent ? (
                <div className="card p-10 text-center h-full flex flex-col items-center justify-center">
                  <FiCheckCircle size={60} className="text-green-500 mb-4" />
                  <h3 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  <Button onClick={() => setSent(false)}>Send Another Message</Button>
                </div>
              ) : (
                <div className="card p-8">
                  <h2 className="font-display text-2xl font-bold text-navy-700 dark:text-white mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { name: 'name',    label: 'Your Name',     type: 'text',  placeholder: 'Full name',           required: true },
                      { name: 'email',   label: 'Email Address', type: 'email', placeholder: 'your@email.com',       required: true },
                      { name: 'subject', label: 'Subject',       type: 'text',  placeholder: 'How can we help you?', required: false },
                    ].map(({ name, label, type, placeholder, required }) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          {label}{required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <input type={type} value={form[name]} onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))}
                          placeholder={placeholder} className="input-field" />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Write your message here…" rows={5} className="input-field resize-none" />
                    </div>
                    <Button type="submit" loading={loading} className="w-full justify-center py-4">
                      <FiSend size={16} /> {loading ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
