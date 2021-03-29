// 
// Entities
interface Student {
    kind: "Student";
    name: string;
    surname: string;
    grades: Grades[];
    courses: Course[];
}

interface Course {
    kind: "Course";
    name: string;
    studyPoints: number;
    lectures: Lecture[];
}

interface Grades {
    kind: "Grades";
    grade: number;
    course: Course;
}

interface Lecture {
    kind: "Lecture";
    title: string;
    topic: string;
}

type Entity = Student | Course | Grades | Lecture;

// Renderer
interface Rendered {
    student: Student[];
    courses: Course[];
}