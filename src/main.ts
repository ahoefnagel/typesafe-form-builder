import { defaultEntity } from "./core/entities";
import { queryable } from "./core/queryable";

// testing queryable
const testStudent = defaultEntity("Student");
testStudent.courses.push(defaultEntity("Course"));
console.log("Full student:");
console.log(testStudent);

const studentQueryable = queryable(testStudent);
const querriedStudent = studentQueryable.select("name").select("surname", "birthday").children("courses", q => q.select("name")).querried;
console.log("Querried student:");
console.log(querriedStudent);

// testing child
const testGrades = defaultEntity("Grades");
console.log("Full grades:");
console.log(testGrades);

const gradesQuerryable = queryable(testGrades);
const quierredGrades = gradesQuerryable.child("course", q => q.select("name")).querried;
console.log("Querried grades:");
console.log(quierredGrades);
