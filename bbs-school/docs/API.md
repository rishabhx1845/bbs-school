# 📡 BBS Smart Public School — API Documentation

Base URL: `https://your-backend.onrender.com/api`

---

## 🔐 Authentication

### POST `/auth/register`
Register a new user.

**Body:**
```json
{
  "name": "Admin User",
  "email": "admin@bbs.edu.in",
  "password": "securepass123",
  "role": "admin"
}
```
**Response:** `201 Created`
```json
{ "token": "jwt_token_here", "user": { "id": "...", "name": "Admin User", "role": "admin" } }
```

---

### POST `/auth/login`
Login with email and password.

**Body:**
```json
{ "email": "admin@bbs.edu.in", "password": "securepass123" }
```
**Response:** `200 OK`
```json
{ "token": "jwt_token_here", "user": { "id": "...", "name": "...", "role": "admin" } }
```

---

### GET `/auth/me`
Get current logged-in user. **[Protected]**

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{ "id": "...", "name": "...", "email": "...", "role": "admin" }
```

---

## 👨‍🎓 Students

### GET `/students`
Get all students (paginated). **[Admin/Teacher]**

**Query:** `?page=1&limit=10&search=Rahul&class=10`

**Response:** `200 OK`
```json
{
  "students": [...],
  "total": 120,
  "page": 1,
  "pages": 12
}
```

---

### POST `/students`
Create a new student. **[Admin]**

**Body:**
```json
{
  "name": "Rahul Sharma",
  "rollNo": "2024001",
  "class": "10",
  "section": "A",
  "dateOfBirth": "2009-05-15",
  "parentName": "Suresh Sharma",
  "phone": "9876543210",
  "address": "123 Patel Nagar, Lucknow",
  "email": "rahul@example.com"
}
```

---

### GET `/students/:id`
Get single student. **[Admin/Teacher/Student(own)]**

---

### PUT `/students/:id`
Update student. **[Admin]**

---

### DELETE `/students/:id`
Delete student. **[Admin]**

---

## 👩‍🏫 Teachers

### GET `/teachers`
Get all teachers. **[Admin]**

**Query:** `?page=1&limit=10&subject=Math`

---

### POST `/teachers`
Create teacher. **[Admin]**

**Body:**
```json
{
  "name": "Mrs. Priya Verma",
  "subject": "Mathematics",
  "qualification": "M.Sc, B.Ed",
  "experience": 8,
  "phone": "9876543211",
  "email": "priya@bbs.edu.in"
}
```

---

### GET `/teachers/:id`
Get single teacher. **[Admin/Teacher]**

---

### PUT `/teachers/:id`
Update teacher. **[Admin]**

---

### DELETE `/teachers/:id`
Delete teacher. **[Admin]**

---

## 📊 Results

### GET `/results`
Get all results. **[Admin/Teacher]**

**Query:** `?class=10&section=A&exam=midterm`

---

### GET `/results/student/:studentId`
Get results for a specific student. **[Admin/Teacher/Student(own)]**

---

### POST `/results`
Create result. **[Admin/Teacher]**

**Body:**
```json
{
  "studentId": "student_object_id",
  "class": "10",
  "section": "A",
  "examType": "midterm",
  "session": "2024-25",
  "subjects": [
    { "name": "Mathematics", "maxMarks": 100, "marksObtained": 88 },
    { "name": "English", "maxMarks": 100, "marksObtained": 92 }
  ]
}
```

---

### PUT `/results/:id`
Update result. **[Admin/Teacher]**

---

### DELETE `/results/:id`
Delete result. **[Admin]**

---

## 📢 Notices

### GET `/notices`
Get all notices (public).

**Query:** `?page=1&limit=10&category=exam`

**Response:**
```json
{
  "notices": [...],
  "total": 25,
  "page": 1,
  "pages": 3
}
```

---

### POST `/notices`
Create notice. **[Admin]**

**Body:**
```json
{
  "title": "Annual Sports Day",
  "content": "Annual Sports Day will be held on 15th January 2025.",
  "category": "event",
  "isImportant": true,
  "expiresAt": "2025-01-16"
}
```

---

### PUT `/notices/:id`
Update notice. **[Admin]**

---

### DELETE `/notices/:id`
Delete notice. **[Admin]**

---

## 📋 Admissions

### GET `/admissions`
Get all admission requests. **[Admin]**

**Query:** `?page=1&limit=10&status=pending`

---

### POST `/admissions`
Submit admission form (public).

**Body:**
```json
{
  "studentName": "Ananya Singh",
  "dateOfBirth": "2012-03-10",
  "gender": "female",
  "applyingForClass": "6",
  "previousSchool": "ABC Primary School",
  "parentName": "Rajiv Singh",
  "relation": "father",
  "phone": "9876543212",
  "email": "rajiv@example.com",
  "address": "456 MG Road, Lucknow",
  "message": "Please consider my child's application."
}
```

**Response:** `201 Created`
```json
{ "message": "Admission application submitted successfully!", "applicationId": "APP2024001" }
```

---

### PUT `/admissions/:id`
Update admission status. **[Admin]**

**Body:**
```json
{ "status": "approved", "remarks": "Documents verified." }
```

---

## 📊 Dashboard Analytics

### GET `/dashboard/stats`
Get dashboard statistics. **[Admin]**

**Response:**
```json
{
  "totalStudents": 450,
  "totalTeachers": 28,
  "totalNotices": 15,
  "pendingAdmissions": 12,
  "recentAdmissions": [...],
  "recentNotices": [...]
}
```

---

## 🔒 Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Bad Request — validation error |
| 401 | Unauthorized — missing/invalid token |
| 403 | Forbidden — insufficient role |
| 404 | Not Found |
| 429 | Too Many Requests — rate limited |
| 500 | Internal Server Error |

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description here",
  "errors": ["field validation details if any"]
}
```
