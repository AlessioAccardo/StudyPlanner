export class Exam {
    constructor(
        public code: number,
        public name: string,
        public credits: number,
        public max_students: number,
        public enrolled_students: number,
        public professor_id: number,
        public approved: boolean,
        public date: Date,
        public course_id: number       
    ){}
}