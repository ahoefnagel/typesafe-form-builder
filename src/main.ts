import { defaultEntity } from "./core/entities";
import { queryable } from "./core/queryable";
import {Renderer, RenderFunctions} from "./core/renderer";

// testing queryable
// const testStudent = defaultEntity("Student");
// testStudent.courses.push(defaultEntity("Course"));
// console.log("Full student:");
// console.log(testStudent);
//
// const studentQueryable = queryable(testStudent);
// const querriedStudent = studentQueryable.select("name").select("surname", "birthday").children("courses", q => q.select("name")).querried;
// console.log("Querried student:");
// console.log(querriedStudent);
//
// // testing child
// const testGrades = defaultEntity("Grades");
// console.log("Full grades:");
// console.log(testGrades);
//
// const gradesQuerryable = queryable(testGrades);
// const quierredGrades = gradesQuerryable.child("course", q => q.select("name")).querried;
// console.log("Querried grades:");
// console.log(quierredGrades);

let course_rocket_science =  {
  name:"Rocket Science 101",
  studyPoints:30,
  lectures:[
    {
      title:"Aerodynamics",
      topic:"Nerd stuff"
    }
  ]
}

let course_death_star = {
  name:"How to build the Death Star",
  studyPoints:30,
  lectures:[
    {
      title:"Structure",
      topic:"Includes its weaknesses"
    },
    {
      title:"Defence against rebels",
      topic:"About how to defend the death star's weaknesses"
    },
  ]
}

let student_luuk =   {
  name:"Luuk",
  surname:"Luchtloper",
  grades:[
    {
      grade:10,
      course:course_rocket_science
    }
  ],
  birthday: new Date()
}

let testObject = {
  student: [
    student_luuk
  ],
  course:[
    course_death_star,
    course_rocket_science
  ]
}
//student (obj1)
//  name
//  surname
//  grades  (obj2_1)
//
//    grade
//    courseid
//course (obj3)
// name
// studypoints
// lectures (obj4)
///  title
//    topic

const createDate = function(date:Date):string {
  return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
}


const toConsole:RenderFunctions<string> = {
  String: function (key: string, value: string):string {return `\n${key}: ${value}`},
  Number: function (key: string, value: number):string { return `\n${key}: ${value}`},
  Boolean: function  (key: string, value: boolean):string { return `\n${key}: ${value}`},
  Date: function  (key: string, value: Date):string { return `\n${key}: ${createDate(value)}`},
  // Nested: function  (key: string, value: Date):void {console.log("Nested | Key: " , key, " Value: ", value)},
  Object: function <T>(key: string, value:T):string {return `${value}`},
  Array: function <T>(key: string, value:T):string {return `\n${key} ${value}`}
}

let renderTest = Renderer(testObject)
renderTest.render(toConsole).forEach(values => console.log(values))



// FormBuilder({...data, value: newValue}).render(callback)

/// TODO upon FormBuilder creation, uncomment to give access to module
// export {FormBuilder} from "./core/form-builder";
