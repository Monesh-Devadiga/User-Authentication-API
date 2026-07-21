const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Week 2 – Auth & Student API', bold: true, size: 32 }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({ text: 'Node.js Development Internship', size: 24 }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [
          new TextRun({ text: 'Chand (Task 2)', size: 20, italics: true }),
        ],
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '1. Introduction', bold: true })] }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: 'This report documents the implementation of a secure User Authentication API with JWT and bcrypt, and a Student CRUD API with pagination and filtering. Built with Node.js, Express.js, and MongoDB.' })],
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '2. Technology Stack', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: '• Node.js – JavaScript runtime' })] }),
      new Paragraph({ children: [new TextRun({ text: '• Express.js – Web framework' })] }),
      new Paragraph({ children: [new TextRun({ text: '• MongoDB + Mongoose – Database & ODM' })] }),
      new Paragraph({ children: [new TextRun({ text: '• JSON Web Tokens (JWT) – Token-based authentication' })] }),
      new Paragraph({ children: [new TextRun({ text: '• bcryptjs – Password hashing (12 salt rounds)' })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: '• dotenv – Environment variable management' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '3. Project Structure', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'auth-api/' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── config/db.js – MongoDB connection' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── controllers/authController.js – Auth logic' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── controllers/studentController.js – Student CRUD' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── middleware/auth.js – JWT verification' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── models/User.js – User schema' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── models/Student.js – Student schema' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── routes/authRoutes.js – Auth routes' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── routes/studentRoutes.js – Student routes' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── server.js – Entry point' })] }),
      new Paragraph({ children: [new TextRun({ text: '├── .env – Environment variables' })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: '├── package.json – Dependencies' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '4. Implementation Steps', bold: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '4.1 Auth Module', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'User schema with name, email, password. Pre-save hook hashes password with bcrypt (12 rounds). comparePassword method for login. Controller handles register, login, getProfile. JWT middleware verifies Bearer tokens and attaches user to req.' })], spacing: { after: 100 } }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '4.2 Student Module', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'Student schema with name, email, age, grade (A-F), status (active/inactive). Full CRUD controller with:' })] }),
      new Paragraph({ children: [new TextRun({ text: '• createStudent – Validates and creates a new student document.' })] }),
      new Paragraph({ children: [new TextRun({ text: '• getAllStudents – Supports pagination (page, limit) and filtering by status query parameter. Returns count, total, page, totalPages.' })] }),
      new Paragraph({ children: [new TextRun({ text: '• getStudentById – Fetches a single student by MongoDB ID.' })] }),
      new Paragraph({ children: [new TextRun({ text: '• updateStudent (PUT) – Full replacement, requires all fields.' })] }),
      new Paragraph({ children: [new TextRun({ text: '• patchStudent (PATCH) – Partial update, only modifies provided fields.' })] }),
      new Paragraph({ children: [new TextRun({ text: '• deleteStudent – Removes student by ID.' })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: 'All controllers handle CastError (invalid ID), ValidationError, and duplicate email (11000) errors.' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: '4.3 Server Setup', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'Express configured with CORS, JSON parser. Auth routes mounted at /api/auth, student routes at /api/students. 404 fallback for unknown routes.' })], spacing: { after: 200 } }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '5. API Documentation', bold: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: 'Auth Endpoints', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'POST /api/auth/register – Register user. Body: { name, email, password }' })] }),
      new Paragraph({ children: [new TextRun({ text: 'POST /api/auth/login – Login. Body: { email, password }' })] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: 'GET /api/auth/profile – Protected. Header: Authorization: Bearer <token>' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: 'Student Endpoints', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'POST /api/students – Create student. Body: { name, email, age, grade, status? }' })] }),
      new Paragraph({ children: [new TextRun({ text: 'GET /api/students – List (paginated). Query: ?page=1&limit=10&status=active' })] }),
      new Paragraph({ children: [new TextRun({ text: 'GET /api/students/:id – Get by ID' })] }),
      new Paragraph({ children: [new TextRun({ text: 'PUT /api/students/:id – Full update. Body: { name, email, age, grade, status? }' })] }),
      new Paragraph({ children: [new TextRun({ text: 'PATCH /api/students/:id – Partial update. Body: { any fields }' })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'DELETE /api/students/:id – Delete student' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '6. Testing Results', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: 'Tested via Postman with the Postman collection (postman_collection.json):' })] }),
      new Paragraph({ children: [new TextRun({ text: '1. Auth – Register, Login, Get Profile all return correct responses and HTTP statuses.' })] }),
      new Paragraph({ children: [new TextRun({ text: '2. Students – Create, Get All (paginated), Get by ID, Filter by status, Full update (PUT), Partial update (PATCH), Delete all work correctly.' })] }),
      new Paragraph({ children: [new TextRun({ text: '3. Error Handling – Validation errors, duplicate emails, invalid IDs, missing fields all return proper error messages.' })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: '4. Pagination – page and limit query params work, total and totalPages returned in response.' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '7. Security Measures', bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: '• Passwords hashed with bcrypt (12 salt rounds)' })] }),
      new Paragraph({ children: [new TextRun({ text: '• JWT tokens with 7-day expiration' })] }),
      new Paragraph({ children: [new TextRun({ text: '• Password field excluded from query results (select: false)' })] }),
      new Paragraph({ children: [new TextRun({ text: '• Input validation on all model fields' })] }),
      new Paragraph({ children: [new TextRun({ text: '• Environment variables for sensitive config' })] }),
      new Paragraph({ children: [new TextRun({ text: '• Consistent error responses without leaking details' })] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: '• CORS enabled for cross-origin requests' })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: '8. Conclusion', bold: true })] }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: 'The Auth & Student API was successfully built with all required features: JWT authentication, password hashing, protected routes, and full CRUD with pagination and filtering. The project follows RESTful conventions, implements industry-standard security practices, and is modular and extensible.' })],
      }),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('Report.docx', buffer);
  console.log('Report.docx generated successfully');
});
