import { ChildProps, PrimitiveProps } from "../utilities/helper-types";
import { addPropToObject, omitProps, pickProps } from "../utilities/object-utilities";

/**
 * Type for a function that can transform the state of a `Querryable` object.
 */
type QueryFunction<InputObject, InputQuerried, OutputObject, OutputQuerried> = 
    (q: Queryable<InputObject, InputQuerried>) => Queryable<OutputObject, OutputQuerried>;

export type Queryable<InputObject, Querried> = {
    object: InputObject,
    querried: Querried,

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
     * @param childProp Name of the child property to be querried.
     * @param queryFunction The function that will contain the query operation for the child object.
     * 
     * For example: `q => q.select("prop1", "prop2")`, where `q` is a `Queryable` instance containing the
     * child object.
     * 
     * @returns A new `Queryable` instance with the result of the child query added to the `querried` object.
     */
    child: <ChildProp extends ChildProps<InputObject>, OutputObject, OutputQuerried>
        (childProp: ChildProp, queryFunction: QueryFunction<InputObject[ChildProp], {}, OutputObject, OutputQuerried>) =>
            Queryable<Omit<InputObject, ChildProp>, Querried & Record<ChildProp, OutputQuerried>>
        
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
        
        child: (childProp, queryFunction) => {
            const querriedChild = queryFunction(queryable(object[childProp])).querried;
            return queryableStep(
                omitProps(object, childProp),
                { ...querried, ...{ [childProp]: querriedChild } as Record<typeof childProp, typeof querriedChild> }
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
