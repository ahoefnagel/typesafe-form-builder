/**
 * Set of all entities in the project.
 * When a new entity is added to the project,
 * it also has to be added to this list.
 */
interface Entities {
    Student: Student,
    Course: Course,
    Grades: Grades,
    Lecture: Lecture
}

// Entities
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

// Renderer
interface Rendered {
    student: Student[];
    courses: Course[];
}

/**
 * Gets the default 'empty' version of an entity.
 * When a new entity is added to the global `Entities` set, the developer is
 * forced by Typescript to also implement a default object for that entity in 
 * the `defaults` object in this function.
 * 
 * @summary Returns the default version of an entity.
 * @param name The name of the entity for which to retrieve the default object.
 * @returns A default entity object corresponding to the type `name`
 */
const defaultEntity = <Name extends keyof Entities>(name: Name) : Entities[Name] => {
    const defaults: Entities = {
        Student: {
            name: "",
            surname: "",
            grades: [],
            courses: []
        },
        Course: {
            name: "",
            studyPoints: 0,
            lectures: []
        },
        Grades: {
            grade: 0,
            course: defaultEntity("Course")
        },
        Lecture: {
            title: "",
            topic: ""
        }
    }
    return defaults[name];
}
