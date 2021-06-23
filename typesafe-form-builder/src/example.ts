import { FormBuilder } from './core/form-builder';

/**
 * This document shows some examples of how to use the form
 * builder to build a form specification.
 * 
 * This example can be run using `npm run example`.
 */

/**
 * Entity
 * 
 * The `entity` function of the `FormBuilder` can be used
 * to add a given entity to the specification.
 * The first argument of this function is the name of the
 * entity to be querried.
 * 
 * For example. the code below will result in the
 * following specification object:
 * 
 * ```
 * {
 *     Student: [{}]
 * }
 * ```
 */
FormBuilder.entity("Student", q => q);


/**
 * Select
 * 
 * The second argument of the `entity` function to query the given entity.
 * The argument `q` is a `Queryable`, which has the functions `select`,
 * `child` and `children`.
 * These functions will only allow you to query properties that actually
 * exist on the given entity.
 * 
 * ```
 * {
 *     Course: [
 *          {
 *              name: "",
 *              studyPoints: 0,
 *              active: false
 *          }
 *      ]
 * }
 * ```
 */
FormBuilder.entity("Course", q => q.select("name", "studyPoints", "active"));


/**
 * Child
 * 
 * The `child` function is used to query a child object
 * of the given entity. This means the first argument of the
 * `child` is a property of the entity which contains an object.
 * 
 * ```
 * {
 *      Grades: [
 *          {
 *              course: {
 *                  name: "",
 *                  studyPoints: 0
 *              }
 *          }
 *      ]
 * }
 * ```
 */
FormBuilder.entity("Grades", q => q.child("course", c => c.select("name", "studyPoints")));


/**
 * Children
 * 
 * The `children` function can be used to query any array property
 * of the given entity.
 * The query will be performed on each element in the array.
 * 
 * The code below will result in the following specification:
 * ```
 * {
 *     Student: [
 *         {
 *             courses: [
 *                 {
 *                     name: ""
 *                 }
 *             ]
 *         }
 *     ]
 * }
 * ```
 */
FormBuilder.entity("Student", q => q.children("courses", q => q.select("name")) )

/**
 * Chained Query
 * 
 * The above functions can be chained to easily build a
 * specification object as shown here.
 * 
 * In an IDE like Visual Studio Code you can also hover over
 * the `specificaiton` variable below to see the type of the
 * resulting specification.
 * 
 * ```
 * {
 *      Student: [
 *          {
 *              name: "",
 *              grades: [
 *                  {
 *                      grade: 0
 *                  }
 *              ]
 *          }
 *      ],
 *      Course: [
 *          {
 *              name: "",
 *              studyPoints: 0,
 *              lectures: [
 *                  {
 *                      title: "",
 *                      topic: ""
 *                  }
 *              ]
 *          }
 *      ],
 *      Grades: [
 *          {
 *              course: {
 *                  name: "",
 *                  active: false
 *              }
 *          }
 *      ],
 *      Lecture: [
 *          {
 *              title: "",
 *              topic: ""
 *          }
 *      ]
 * }
 * ```
 */
const specification = FormBuilder
    .entity("Student", 
        q => q.select("name").children("grades", 
            g => g.select("grade")))
    .entity("Course", 
        q => q.select("name").select("studyPoints").children("lectures", 
            l => l.select("title", "topic")))
    .entity("Grades", 
        q => q.child("course", c => c.select("name", "active")))
    .entity("Lecture", 
        q => q.select("title").select("topic"))
    .specification;

    
console.log("Specification:");
console.log(JSON.stringify(specification,null,2));
    
export {};
