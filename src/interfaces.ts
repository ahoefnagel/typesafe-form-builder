// interface FormBuilder {
//     specification: Queryable<any, any>[];
//     entity: <Kind extends Entity["kind"], Data>(kind: Kind, query: (q: Queryable<Extract<Entity, { kind: Kind } >, Data>) 
//         => Queryable<Extract<Entity, { kind: Kind } >, Data> ) => FormBuilder;
    
// }

    
/** Title: Queryable - generates a list of generics to data?
 * 
 * 
 * .Entity("Course", q =>    // T
  q.Select("Name", "StudyPoints").  // ChildProps<T>
  )
)
Queryable<Student> 
data: Student: {?...}
> select(...):Queryable<Student`>
> children(Grades):Queryable<Student`>
    Queryable<Grades>
    data: Grades...
        
 *  */ 

 
// interface Queryable<Input, Data> {
//     data: Data; // Partial<Input>?
//     select: <Props extends (PrimitiveProps<Input>)[]>(...props: Props) 
//         => Queryable<Input, Data & Pick<Input, typeof props[number] > >;
// }

// Sorry Albert we hebben per ongeluk de renderer interface verwijderd :(
// Kan gebeuren, hier is 'die weer
/** Title: This interface will create the JSX from the result of a form builder? */
interface Renderer<T> {
    (): Renderer<T>
    // Add: <T>(this: Renderer, ...a: [keyof T]) => Renderer;
    [key: string]: any
}
