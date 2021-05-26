/**
 * Map of all primitive types supported by the form builder.
 * The key is the name of the type.
 * A union of all keys in this map can be accessed from the
 * `PrimitiveTypesNames` type.
 * If a support for another primitive type has to be added to the
 * form builder, it needs to be added to this map.
 */
export type PrimitiveTypesMap = {
    number: number,
    string: string,
    boolean: boolean,
    date: Date
}

/**
 * All types that should be selectable by the .select function in a queryable.
 * Used by the PrimitiveProps type.
 */
export type PrimitiveTypes = PrimitiveTypesMap[keyof PrimitiveTypesMap];

/**
 * Names of all primitive types that are supported by the form builder.
 */
export type PrimitiveTypesNames = {
    [P in keyof PrimitiveTypesMap]: P
}[keyof PrimitiveTypesMap];

/**
 * Returns a union of all the primitive properties in an object `T`.
 * Primitive properties are all types that shouldn't be treated as a child object.
 * @param T Type of the object from which to extract the primitive properties.
 * @returns A union of all the primitve properties of type `T`.
 */
export type PrimitiveProps<T> = {
    [P in keyof T]: T[P] extends PrimitiveTypes ? P : never;
}[keyof T]

/**
 * Returns an object containing all the primitive properties in an object `T`.
 * @param T Type of the object from which to extract the primitive properties.
 * @returns A an object containing all the primitve properties of type `T`.
 */
export type FilterPrimitiveProps<T> = Pick<T, PrimitiveProps<T>>

/**
 * Untion of types that do extend the type `object` but should not be handled as a
 * child object when querrying an object.
 * Used by the `ChildProps` type.
 */
type NotChildTypes = Array<any> | Date

/**
 * Returns a union of all the child (non-primitive types of type `Object`) properties in an object `T`.
 * Arrays are not returned by this type.
 * @param T Type of the object from which to extract the child properties.
 * @returns A union of all the child properties of type `T`.
 */
export type ChildProps<T> = {
    [P in keyof T]: T[P] extends object ? T[P] extends NotChildTypes ? never : P : never;
}[keyof T]

/**
 * Returns an object containing all the child (non-primitive type of type `Object`) properties in an object `T`.
 * @param T Type of the object from which to extract the child properties.
 * @returns A an object containing all the child properties of type `T`.
 */
export type FilterChildProps<T> = Pick<T, ChildProps<T>>

/**
 * Returns a union of all the `Array` properties in an object `T`.
 * @param T Type of the object from which to extract the array properties.
 * @returns A union of all the array properties of type `T`.
 */
export type ArrayProps<T> = {
    [P in keyof T]: T[P] extends Array<any> ? P : never;
}[keyof T]

/**
 * Returns an object containing all the `Array` properties in an object `T`.
 * @param T Type of the object from which to extract the array properties.
 * @returns A an object containing all the array properties of type `T`.
 */
export type FilterArrayProps<T> = Pick<T, ArrayProps<T>>

// https://stackoverflow.com/a/51399781
/**
 * Extracts the single element type from a given array type.
 * @param ArrayType Array type from which the single element will be infered.
 * @returns The element type of `ArrayType`.
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = 
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;


/**
 * All typeof types extend with date and array.
 */
export type TypeOfTypesMap = {
    undefined: undefined,
    boolean: boolean,
    number: number,
    bigint: bigint,
    string: string,
    symbol: symbol, 
    function: Function, 
    object: object,
    date: Date,
    array: Array<unknown>
}

export type TypeOfTypesUnion = TypeOfTypesMap[keyof TypeOfTypesMap];

export type TypeOfTypes = {
    [P in keyof TypeOfTypesMap]: P;
}[keyof TypeOfTypesMap]

export type TypeCheckFunctions = {
    [P in keyof TypeOfTypesMap]: (val: any) => boolean;
}

export function isSomething(value: any): value is TypeOfTypesUnion {
    return typeof value === "string";
}