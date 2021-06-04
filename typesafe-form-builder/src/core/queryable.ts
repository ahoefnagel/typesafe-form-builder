import { ArrayElement, ArrayProps, ChildProps, PrimitiveProps } from "../utilities/helper-types";
import { omitProps, pickProps } from "../utilities/object-utilities";

/**
 * Type for a function that can transform the state of a `Querryable` object.
 */
export type QueryFunction<InputObject, InputQuerried, OutputObject, OutputQuerried> = 
    (q: Queryable<InputObject, InputQuerried>) => Queryable<OutputObject, OutputQuerried>;

export type Queryable<InputObject, Querried> = {
    readonly object: InputObject,
    readonly querried: Querried,

    /**
     * Select a list of properties from the object to be querried.
     * @param props A list of properties to querried from the `object`.
     * @returns A new `Queryable` instance with the selected properties added to the `querried` object.
     */
    select: <Props extends PrimitiveProps<InputObject>[]>(...props: Props) => 
        Queryable<Omit<InputObject, typeof props[number]>, Querried & Pick<InputObject, typeof props[number]>>
    
    /**
     * Query a child property of the current queryable `object`.
     * 
     * If the object being querried has any properties that are themselves objects, 
     * their properties can be querried with this function.
     * @param prop Name of the child property to be querried.
     * @param queryFunction The function that will contain the query operation for the child object.
     * 
     * For example: `q => q.select("prop1", "prop2")`, where `q` is a `Queryable` instance containing the
     * child object.
     * 
     * @returns A new `Queryable` instance with the result of the child query added to the `querried` object.
     */
    child: <Prop extends ChildProps<InputObject>, OutputObject, OutputQuerried>
        (prop: Prop, queryFunction: QueryFunction<InputObject[Prop], {}, OutputObject, OutputQuerried>) =>
            Queryable<Omit<InputObject, Prop>, Querried & Record<Prop, OutputQuerried>>
    
    /**
     * Query a the elements of an `Array` property of the current queryable `object`.
     * 
     * If the object being querried has any properties are arrays, the properties of their elements 
     * can be querried with this function.
     * @param prop Name of the array property whose elements will be querried.
     * @param queryFunction The function that will contain the query operation for the array elements.
     * 
     * For example: `q => q.select("prop1", "prop2")`, where `q` is a `Queryable` instance containing the
     * array element.
     * 
     * @returns A new `Queryable` instance with the result of the array query added to the `querried` object.
     */
    children: <Prop extends ArrayProps<InputObject>, OutputObject, OutputQuerried>
        (prop: Prop, queryFunction: QueryFunction<ArrayElement<InputObject[Prop]>, {}, OutputObject, OutputQuerried>) => 
            Queryable<Omit<InputObject, Prop>, Querried & Record<Prop, OutputQuerried[]>>
}

/**
 * Creates an instance of a `Queryable` type, with a given `querried` state as starting point.
 * 
 * A Queryable can be used to easily query properties and child objects of an object.
 * @param object Input object that will be querried.
 * @param querried Object that will contain all the properties that have been querried from the input object.
 * When creating a new Queryable this should be `{}`.
 * @returns A new Queryable instance.
 */
const queryableStep = <InputObject, Querried>(object: InputObject, querried: Querried) : Queryable<InputObject, Querried> => {
    return {
        object: object,
        querried: querried,

        select: (...props) => queryableStep(
            omitProps(object, ...props), 
            {...querried , ...pickProps(object, ...props)}
        ),
        
        child: (prop, queryFunction) => {
            const querriedChild = queryFunction(queryable(object[prop])).querried;
            return queryableStep(
                omitProps(object, prop),
                { ...querried, ...{ [prop]: querriedChild } as Record<typeof prop, typeof querriedChild> }
            );
        },

        children: (prop, queryFunction) => {
            const list: ArrayElement<InputObject[typeof prop]>[] = object[prop];
            const querriedList = list.map(element => {
                return queryFunction(queryable(element)).querried;
            });

            return queryableStep(
                omitProps(object, prop),
                { ...querried, ...{ [prop]: querriedList } as Record<typeof prop, typeof querriedList> }
            );
        } 
    }
}

/**
 * Creates an instance of a `Queryable` type.
 * 
 * @param object Input object that will be querried.
 * @returns A new Queryable instance.
 */
export const queryable = <InputObject>(object: InputObject) =>
    queryableStep(object, {});
