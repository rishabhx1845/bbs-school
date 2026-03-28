const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Notice = require('../models/Notice');
const Admission = require('../models/Admission');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB Connected for seeding');
};

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Student.deleteMany({}),
    Teacher.deleteMany({}),
    Notice.deleteMany({}),
    Admission.deleteMany({})
  ]);

  console.log('🗑️  Cleared existing data');

  // Create Admin
  const admin = await User.create({
    name: 'Principal Admin',
    email: 'admin@bbs.edu.in',
    password: 'Admin@123',
    role: 'admin'
  });

  // Create Teachers
  const teachers = await Teacher.insertMany([
    { name: 'Mrs. Priya Verma', employeeId: 'T001', subject: 'Mathematics', qualification: 'M.Sc, B.Ed', experience: 12, phone: '9876543201', email: 'priya@bbs.edu.in' },
    { name: 'Mr. Rajesh Kumar', employeeId: 'T002', subject: 'Science', qualification: 'M.Sc, B.Ed', experience: 8, phone: '9876543202', email: 'rajesh@bbs.edu.in' },
    { name: 'Mrs. Sunita Singh', employeeId: 'T003', subject: 'English', qualification: 'M.A, B.Ed', experience: 15, phone: '9876543203', email: 'sunita@bbs.edu.in' },
    { name: 'Mr. Amit Sharma', employeeId: 'T004', subject: 'Hindi', qualification: 'M.A, B.Ed', experience: 10, phone: '9876543204', email: 'amit@bbs.edu.in' },
    { name: 'Mrs. Kavita Gupta', employeeId: 'T005', subject: 'Social Science', qualification: 'M.A, B.Ed', experience: 7, phone: '9876543205', email: 'kavita@bbs.edu.in' },
    { name: 'Mr. Deepak Tiwari', employeeId: 'T006', subject: 'Computer Science', qualification: 'MCA, B.Ed', experience: 6, phone: '9876543206', email: 'deepak@bbs.edu.in' },
    { name: 'Mrs. Anjali Mishra', employeeId: 'T007', subject: 'Sanskrit', qualification: 'M.A Sanskrit, B.Ed', experience: 9, phone: '9876543207', email: 'anjali@bbs.edu.in' },
    { name: 'Mr. Suresh Yadav', employeeId: 'T008', subject: 'Physical Education', qualification: 'M.P.Ed', experience: 11, phone: '9876543208', email: 'suresh@bbs.edu.in' }
  ]);

  // Create Students
  const students = await Student.insertMany([
    { name: 'Rahul Sharma', rollNo: '2024001', class: '10', section: 'A', dateOfBirth: new Date('2009-05-15'), gender: 'male', parentName: 'Suresh Sharma', phone: '9876543210', address: 'House No. 12, Patel Nagar, Lucknow', bloodGroup: 'B+' },
    { name: 'Ananya Singh', rollNo: '2024002', class: '10', section: 'A', dateOfBirth: new Date('2009-08-22'), gender: 'female', parentName: 'Rajiv Singh', phone: '9876543211', address: '45 MG Road, Lucknow', bloodGroup: 'A+' },
    { name: 'Arjun Gupta', rollNo: '2024003', class: '9', section: 'B', dateOfBirth: new Date('2010-03-10'), gender: 'male', parentName: 'Mahesh Gupta', phone: '9876543212', address: '78 Civil Lines, Lucknow', bloodGroup: 'O+' },
    { name: 'Priya Mishra', rollNo: '2024004', class: '8', section: 'A', dateOfBirth: new Date('2011-11-05'), gender: 'female', parentName: 'Alok Mishra', phone: '9876543213', address: '23 Hazratganj, Lucknow', bloodGroup: 'AB+' },
    { name: 'Siddharth Yadav', rollNo: '2024005', class: '7', section: 'C', dateOfBirth: new Date('2012-07-18'), gender: 'male', parentName: 'Ram Yadav', phone: '9876543214', address: '56 Alambagh, Lucknow', bloodGroup: 'B-' },
    { name: 'Kavya Verma', rollNo: '2024006', class: '6', section: 'A', dateOfBirth: new Date('2013-02-28'), gender: 'female', parentName: 'Dinesh Verma', phone: '9876543215', address: '89 Gomti Nagar, Lucknow', bloodGroup: 'O-' },
    { name: 'Rohan Tiwari', rollNo: '2024007', class: '5', section: 'B', dateOfBirth: new Date('2014-09-12'), gender: 'male', parentName: 'Vinod Tiwari', phone: '9876543216', address: '34 Indira Nagar, Lucknow', bloodGroup: 'A-' },
    { name: 'Sneha Pandey', rollNo: '2024008', class: '4', section: 'A', dateOfBirth: new Date('2015-06-20'), gender: 'female', parentName: 'Anil Pandey', phone: '9876543217', address: '67 Vikas Nagar, Lucknow', bloodGroup: 'B+' },
    { name: 'Aditya Kumar', rollNo: '2024009', class: '3', section: 'A', dateOfBirth: new Date('2016-04-08'), gender: 'male', parentName: 'Sanjay Kumar', phone: '9876543218', address: '12 Rajajipuram, Lucknow', bloodGroup: 'O+' },
    { name: 'Riya Tripathi', rollNo: '2024010', class: '2', section: 'A', dateOfBirth: new Date('2017-12-15'), gender: 'female', parentName: 'Rakesh Tripathi', phone: '9876543219', address: '45 Aliganj, Lucknow', bloodGroup: 'A+' }
  ]);

  // Create Notices
  await Notice.insertMany([
    { title: '🎉 Annual Sports Day - 2025', content: 'The Annual Sports Day will be held on 15th February 2025. All students must participate in at least one event. Registration starts from 1st February. Parents are cordially invited to attend the event.', category: 'sports', isImportant: true, createdBy: admin._id },
    { title: '📝 Half Yearly Examination Schedule', content: 'Half Yearly Examinations will commence from 10th December 2024. The detailed timetable has been distributed in all classes. Students are advised to prepare thoroughly. No leave will be granted during examination period.', category: 'exam', isImportant: true, createdBy: admin._id },
    { title: '🏖️ Winter Vacation Notice', content: 'School will remain closed for Winter Vacation from 25th December 2024 to 5th January 2025. School will reopen on 6th January 2025. Enjoy the holidays responsibly.', category: 'holiday', isImportant: false, createdBy: admin._id },
    { title: '🎭 Cultural Programme - Republic Day', content: 'The school will organize a grand cultural programme on the occasion of Republic Day, 26th January 2025. Students interested in participating should register with their class teacher by 10th January.', category: 'cultural', isImportant: false, createdBy: admin._id },
    { title: '📚 New Session Admission Open 2025-26', content: 'Admissions for the new academic session 2025-26 are now open. Apply online or visit the school office. Classes from Nursery to Class 12. Limited seats available. Apply early to secure admission.', category: 'admission', isImportant: true, createdBy: admin._id },
    { title: '🏆 Result Declaration - Annual Examination', content: 'Annual Examination results for classes 1 to 9 are now available on the school portal. Students can log in to view their results. Result cards will be distributed on the first day of new session.', category: 'result', isImportant: true, createdBy: admin._id }
  ]);

  // Create Admission requests
  await Admission.insertMany([
    { studentName: 'Ishaan Mehta', dateOfBirth: new Date('2013-06-10'), gender: 'male', applyingForClass: '6', previousSchool: 'Sunrise Primary School', parentName: 'Vikram Mehta', relation: 'father', phone: '9876543220', email: 'vikram@example.com', address: '23 Sector 7, Lucknow', status: 'pending' },
    { studentName: 'Diya Rastogi', dateOfBirth: new Date('2014-09-25'), gender: 'female', applyingForClass: '5', previousSchool: 'Blooms Nursery School', parentName: 'Nisha Rastogi', relation: 'mother', phone: '9876543221', email: 'nisha@example.com', address: '56 Kursi Road, Lucknow', status: 'under-review' },
    { studentName: 'Vedant Srivastava', dateOfBirth: new Date('2011-03-15'), gender: 'male', applyingForClass: '8', previousSchool: 'Delhi Public School', parentName: 'Ashish Srivastava', relation: 'father', phone: '9876543222', email: 'ashish@example.com', address: '89 Mahanagar, Lucknow', status: 'approved' }
  ]);

  console.log('✅ Seed data inserted successfully!');
  console.log('\n🔑 Admin Credentials:');
  console.log('   Email: admin@bbs.edu.in');
  console.log('   Password: Admin@123');

  mongoose.connection.close();
};

seedData().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
