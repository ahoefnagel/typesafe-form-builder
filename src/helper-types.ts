/**
 * Returns a union of all the primitive properties in an object `T`.
 * @param T Type of the object from which to extract the primitive properties.
 * @returns A union of all the primitve properties of type `T`.
 */
type PrimitiveProps<T> = {
    [P in keyof T]: T[P] extends object ? never : P;
}[keyof T]

/**
 * Returns an object containing all the primitive properties in an object `T`.
 * @param T Type of the object from which to extract the primitive properties.
 * @returns A an object containing all the primitve properties of type `T`.
 */
type FilterPrimitiveProps<T> = Pick<T, PrimitiveProps<T>>

/**
 * Returns a union of all the child (non-primitive type of type `Object`) properties in an object `T`.
 * @param T Type of the object from which to extract the child properties.
 * @returns A union of all the child properties of type `T`.
 */
type ChildProps<T> = {
    [P in keyof T]: T[P] extends object ? P : never;
}[keyof T]

/**
 * Returns an object containing all the child (non-primitive type of type `Object`) properties in an object `T`.
 * @param T Type of the object from which to extract the child properties.
 * @returns A an object containing all the child properties of type `T`.
 */
type FilterChildProps<T> = Pick<T, ChildProps<T>>
