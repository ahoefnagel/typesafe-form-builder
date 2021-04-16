/**
 * Returns a union of all the primitive properties in an object `T`.
 * @param T Type of the object from which to extract the primitive properties.
 * @returns A union of all the primitve properties of type `T`.
 */
export type PrimitiveProps<T> = {
    [P in keyof T]: T[P] extends object ? never : P;
}[keyof T]

/**
 * Returns an object containing all the primitive properties in an object `T`.
 * @param T Type of the object from which to extract the primitive properties.
 * @returns A an object containing all the primitve properties of type `T`.
 */
export type FilterPrimitiveProps<T> = Pick<T, PrimitiveProps<T>>

/**
 * Returns a union of all the child (non-primitive types of type `Object`) properties in an object `T`.
 * Arrays are not returned by this type.
 * @param T Type of the object from which to extract the child properties.
 * @returns A union of all the child properties of type `T`.
 */
export type ChildProps<T> = {
    [P in keyof T]: T[P] extends object ? T[P] extends Array<any> ? never : P : never;
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
