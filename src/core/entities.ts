/**
 * Set of all entities in the project.
 * When a new entity is added to the project,
 * it also has to be added to this list.
 */
export interface Entities {
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
    birthday: Date
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

// Entity constructors
const defaultStudent = () : Student => (
    {
        name: "",
        surname: "",
        grades: [],
        courses: [],
        birthday: new Date()
    }
)

const defaultCourse = () : Course => (
    {
        name: "",
        studyPoints: 0,
        lectures: [],
    }
)

const defaultGrades = () : Grades => (
    {
        grade: 0,
        course: defaultCourse()
    }
)

const defaultLecture = () : Lecture => (
    {
        title: "",
        topic: ""
    }
)

/**
 * @name defaultConstructors 
 * Object containing constructor functions for all entitiy types.
 * Each function will return the default version of that entity.
 * 
 * When a new entity is added to the global `Entities` set, the developer is
 * forced by Typescript to also implement a default constructor for that entity in 
 * this object.
 */
const defaultConstructors: { [K in keyof Entities]: () => Entities[K] } = {
    Student: defaultStudent,
    Course: defaultCourse,
    Grades: defaultGrades,
    Lecture: defaultLecture
}

/**
 * Returns the default 'empty' version of an entity. Containing default values for that object.
 * Constructors for these entities are defined in the `defaultConstructors` object.
 * 
 * @summary Returns the default version of an entity.
 * @param name The name of the entity for which to retrieve the default object.
 * @returns A default entity object corresponding to the type `name`
 */
export const defaultEntity = <Name extends keyof Entities>(name: Name): Entities[Name] =>
    defaultConstructors[name]() as Entities[Name];
    // The cast to Entities[Name] is needed because Typescript can't seem to properly resolve
    // the type from the key being selected from the map defaultConstructors.