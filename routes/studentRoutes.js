const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  patchStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.patch('/:id', patchStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
