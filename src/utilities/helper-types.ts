/**
 * All types that should be selectable by the .select function in a queryable.
 * Used by the PrimitiveProps type.
 */
type PrimitiveTypes = number | string | boolean | Date

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

export type IsEqual<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;
  
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
 * Returns an object type where all children will be a list.
 */
export type Listify<T> = {
    [P in keyof T]: T[P][];
};

/**
 * All typeof types extend with date and array.
 */
export type TypeOfTypes = "undefined" | "boolean" | "number" | "bigint" | "string" | "symbol" |	"function" | "object" | "date" | "array"
