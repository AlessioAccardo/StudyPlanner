const EnrolledStudents = require('../models/enrolledStudents');

class EnrolledStudentsController {
    static async enrollStudent(req, res, next) {
        try {
            const {student_id, exam_code} = req.body;
            const enrollment = await EnrolledStudents.enrollStudent(student_id, exam_code);
            res.status(201).json(enrollment);
        } catch(err){
            next(err);
        }
    }

    static async getEnrolledStudentsByExam(req, res, next){
        try{
            const {exam_code} = req.params;
            const students = await EnrolledStudents.getEnrolledStudentsByExam(exam_code);
            res.status(200).json(students);
        }catch(err){
            next(err);
        }

    }

    static async unenrollStudent(req, res, next){
        try{
            const{student_id, exam_code} = req.params;
            const unenrollment = await EnrolledStudents.unenrollStudent(student_id, exam_code);
            res.status(200).json(unenrollment);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = EnrolledStudentsController;