import { defaultEntity } from "./entities";
import { queryable } from "./queryable";

// testing queryable
const testStudent = defaultEntity("Student");
console.log("Full student:")
console.log(testStudent)

const studentQueryable = queryable(testStudent , {});
const querriedStudent = studentQueryable.select("name").select("surname").querried;
console.log("Querried student:")
console.log(querriedStudent);
