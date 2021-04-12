// FormBuilder constructor
// const FormBuilder = function(): FormBuilder {
//     return {
//         specification: [], // <- list of queries?
//         entity: function<Kind extends Entity["kind"], Data>(this: FormBuilder, kind: Kind, query: (q: Queryable<Extract<Entity, { kind: Kind } >, Data>) 
//             => Queryable<Extract<Entity, { kind: Kind } >, Data> ) {
//                 this.specification.push(Queryable(query)) // <- does this work? no? yes?
//             return this
//         },

//     }
// }
 

// // Queryable constructor
// const Queryable = function<Input,Data>(data:Data): Queryable<Input,Data> {
//     return {
//         data: data,
//         select: function(...props){   
//             const resultingObject = props.reduce((ac,a) => ({...ac, [a]:null}),{});
            
//             return Queryable({ 
//                 ...this.data,
//                 ...resultingObject
                
//             })
//         },
//     }
// }

// //  wrappers: { [uniqueId: string]: Wrapper } = {"123": objA};
// //wrappers["123"] === ObjA
// // https://stackoverflow.com/a/54789451

// const addPropToObject = function<Prop extends string, A extends Record<string, any>, ValueType>(prop: Prop, value: ValueType, object: A): A & Record<Prop, ValueType> {
//     return {
//         ...object,
//         [prop]: value
//     };
// }

// // TODO: Hier zitten we vast:
// // TODO: Het nieuwe prop moet een voor javascript en typescript geldige waarde krijgen.
// // const addPropFromSourceToObject = function<Prop extends keyof SourceType, A extends Record<string, any>, SourceType >(prop: Prop, object: A): A & Record<Prop, SourceType[Prop]> {
// // const addPropFromSourceToObject = function<Prop extends string, A extends Record<string, any>, SourceType>(prop: Prop, object: A): A & Record<Prop, SourceType[Prop]> {
// const addPropFromSourceToObject = function<Prop extends string & keyof SourceType, A extends Record<string, any>, SourceType >(prop: Prop, object: A): A & Record<Prop, SourceType[Prop]> {
//         return {
//         ...object,
//         [prop]: null
//     };
//     // return addPropToObject<Prop, A, SourceType[Prop]>(prop, object);
// }


// const addPropsFromTypeToObject = function<Props extends string[], A extends Record<string, any>, SourceType>(props: Props, object: A) {
//     addPropToObject<string, A, SourceType[props[0]]>(props[0], object)
// }

// const joinObjects = function<A, B>(objectA: A, objectB: B): A & B {
//     return {
//         ...objectA,
//         ...objectB
//     }
// }

// // List of props to object keys:
// const propsToObjectKeys = function<Props extends string[]>(...props: Props): { [P in typeof props[number]]: null } {
//     if (props.length == 1) {
//         return addPropToObject(props[0], "", {});
//     } else{

//     }
    
//     let propObject: any = {};
//     props.forEach(prop => {
//         propObject[prop] = '';
//     });
//     return propObject; // geeft geen error maar is niet typesafe
// }

// // testing queryable constructor:
// const testStudent: Student = {
//     kind: "Student",
//     name: "John",
//     surname: "Doe",
//     grades: [],
//     courses: []
// }

// const testQueryable = Queryable<Student, {}>(testStudent);
// let nextQueryable = testQueryable.select("name");
// nextQueryable.data.name;
// nextQueryable.data.surname; // dit hoort een error te geven

// let blackmagic = testQueryable.select("name").select("surname")

// blackmagic.data.name
// blackmagic.data.surname

// const objectWithProp = addPropToObject<"extraProp", Student, string>("extraProp", "Test Name", testStudent);
// // const objectWithProp = addPropFromSourceToObject<"name", Student, Student>("name", testStudent);
 

// blackmagic.data.name
// blackmagic.data.surname

