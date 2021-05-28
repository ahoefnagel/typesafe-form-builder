import { defaultEntity } from "./core/entities";
import { queryable } from "./core/queryable";
import {Renderer, RenderFunctions} from "./core/renderer";
import {getKeys} from "./utilities/object-utilities";

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

const createDate = function(date:Date):string {
  const month = (date.getMonth()+1) < 10? "0" + (date.getMonth()+1) : date.getMonth()+1
  return `${date.getFullYear()}-${month}-${date.getDate()}`
}


const renderToString:RenderFunctions<string> = {
  string: function <K>(key:K , value: string):string {return `${key}: ${value}`},
  number: function <K>(key:K, value: number):string { return `${key}: ${value}`},
  boolean: function  <K>(key: K, value: boolean):string { return `${key}: ${value}`},
  date: function  <K>(key: K, value: Date):string { return `${key}: ${createDate(value)}`},
  object: function <T,K>(key: K, value:T):string {
    let res = ""
    getKeys(value).forEach(key => res += '\n' + value[key])
    return res
  },
  array: function <T,K>(key: K, value:T[]):string {
    let res = ""
    value.forEach(v => res += v)
    return `${key} ${res}`}
}

const renderToHtml:RenderFunctions<string> = {
  string: function <K>(key:K , value: string):string {return `<p><label>${key}</label><input type="text" id="${key}" value="${value}"</p>`},
  number: function <K>(key:K, value: number):string { return `<p><label>${key}</label><input type="number" id="${key}" value="${value}"</p>`},
  boolean: function  <K>(key: K, value: boolean):string { return `<p><label>${key}</label><input type="checkbox" id="${key}" value="${value}"</p>`},
  date: function  <K>(key: K, value: Date):string { return `<p><label>${key}</label><input type="date" id="${key}" value="${createDate(value)}"</p>`},
  object: function <T,K>(key: K, value:T):string {
    let res = "<li>"
    getKeys(value).forEach(key => res +=  `<ul> ${value[key]}</ul>`)
    return res + "</li>"
  },
  array: function <T,K>(key: K, value:T[]):string {
    let res = ""
    value.forEach(v => res += v)
    return `<p>${key}</p>${res}`}
}
let renderTest = Renderer(testObject)
let renderedObject = renderTest.render(renderToHtml)
renderedObject.forEach(value => console.log(value))

// FormBuilder({...data, value: newValue}).render(callback)

/// TODO upon FormBuilder creation, uncomment to give access to module
// export {FormBuilder} from "./core/form-builder";
