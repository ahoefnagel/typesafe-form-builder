interface Student {
    name: string;
    surname: string;
    grades: Grades[];
    courses: Course[];
}

interface Course {
    name: string;
    studyPoints: number;
    lectures: Lecture[];
}

interface Grades {
    grade: number;
    course: Course;
}

interface Lecture {
    title: string;
    topic: string; 
}

interface Renderer {
    student: Student[];
    courses: Course[];
}

/** 
 * Renderer< { <Eindigt niet?
  Student:[
    {
      Name:string,
      Surname:string,
      Grades:[
        {
          Grade:number,
          CourseId:number
        }
      ]
    }
  ],
  Course:[
    Name:string,
    StudyPoints:number,
    Lectures:[
      {
        Title:string,
        Topic:string
      }
    ]
  ]>
 *
 */





