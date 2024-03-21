
const express = require ('express')
const router = express.Router();
const courseController = require('../controllers/courses.controller.js');
const { validationSchema } = require('../middleWares/validationSchema.js');
const  verifyToken  = require('../middleWares/verifyToken');
const userRoles = require('../utils/userRoles.js');
const allowedTo = require('../middleWares/allowedTo.js');



//get all courses
router.route('/')
    .get(courseController.getAllCourses)
    .post(verifyToken,validationSchema(),courseController.addCourse)
//get one course
router.route('/:courseId')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER),courseController.deleteCourse)

module.exports = router;