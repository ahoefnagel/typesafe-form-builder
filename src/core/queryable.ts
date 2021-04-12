import { PrimitiveProps } from "../utilities/helper-types";
import { omitProps, pickProps } from "../object-utilities";

export type Queryable<InputObject, Querried> = {
    object: InputObject,
    querried: Querried,
    /**
     * Select a list of properties from the object to be querried.
     * @param props A list of properties to querried from the `object`.
     * @returns A new Querryable instance with the selected properties added to the `querried` object.
     */
    select: <Props extends PrimitiveProps<InputObject>[]>(...props: Props) => 
        Queryable<Omit<InputObject, typeof props[number]>, Querried & Pick<InputObject, typeof props[number]>>
}

/**
 * Creates an instance of a `Queryable` type, with a given `qurried` state as starting point.
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
        )
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
