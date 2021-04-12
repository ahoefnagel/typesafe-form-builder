import { omitProps, pickProps } from "./object-utilities";

export type Queryable<InputObject, Querried> = {
    object: InputObject,
    querried: Querried,
    select: <Props extends PrimitiveProps<InputObject>[]>(...props: Props) => Queryable<Omit<InputObject, typeof props[number]>, Querried & Pick<InputObject, typeof props[number]>>
}

/**
 * Creates an instance of a `Queryable` type.
 * 
 * A Queryable can be used to easily query properties and child objects of an object.
 * @param object Input object that will be querried.
 * @param querried Object that will contain all the properties that have been querried from the input object.
 * When creating a new Queryable this should be `{}`.
 * @returns A Queryable instance.
 * 
 * # Queryable
 * @function select 
 * @param props A list of properties to querried from the `object`.
 * @returns A new Querryable instance with the selected properties added to the `querried` object.
 */
export const queryable = <InputObject, Querried>(object: InputObject, querried: Querried) : Queryable<InputObject, Querried> => {
    return {
        object: object,
        querried: querried,
        select: (...props) => queryable(
            omitProps(object, ...props), 
            {...querried , ...pickProps(object, ...props)}
        )
    }
}
