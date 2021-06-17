import { defaultEntity } from "./core/entities";
import { FormBuilder } from "./core/form-builder";
import { queryable } from "./core/queryable";
import {Renderer, RenderFunctions} from "./core/renderer";
import {deepCopy, getKeys} from "./utilities/object-utilities";
import {renderToHtml, renderToString} from "./utilities/render-utilities";

// testing queryable
const testStudent = defaultEntity("Student");
testStudent.name = "Not Default Name";
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

var fb = FormBuilder.entity("Student", q => q.select("name", "surname", "birthday"), testStudent);
var ab = fb.entity('Lecture', q => q.select("title"))

console.log("Specification created object fb: ", JSON.stringify(fb));
console.log("Specification created object ab: ", JSON.stringify(ab));
console.log("Specification changed object ab: ", JSON.stringify(ab));
var cd = ab.entity("Grades", 
    q => q.child("course", 
        r => r.select("studyPoints")
    )
);
console.log("Specification created object cd: ", JSON.stringify(cd));

const obj = ab.specification.Lecture[0].title

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

Renderer(testObject).render(renderToHtml).forEach(value => console.log(value))
Renderer(testObject).render(renderToString).forEach(value => console.log(value))

// FormBuilder({...data, value: newValue}).render(callback)

/// TODO upon FormBuilder creation, uncomment to give access to module
// export {FormBuilder} from "./core/form-builder";

// deep copy testing
console.log("Specification\t:", JSON.stringify(ab.specification));

const specCopy = deepCopy(ab.specification);
console.log("Specification c\t:", JSON.stringify(specCopy))

console.log(ab.specification.Student.length);
console.log(specCopy.Student.length);

const externalObject = {
  color: 'red',
}

const original = {
  a: new Date(),
  b: NaN,
  c: new Function(),
  d: undefined,
  e: function () {},
  f: Number,
  g: false,
  h: Infinity,
  i: externalObject,
}

console.log("original\t:", original);
console.log("copy\t:", deepCopy(original));