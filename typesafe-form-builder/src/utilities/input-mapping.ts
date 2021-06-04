import { PrimitiveTypes, PrimitiveTypesNames, TypeOfTypes } from './helper-types';
import { customTypeOf, getKeys, typeCheckFunctions } from './object-utilities';

/**
 * Type names for the `type` attribute of an input element.
 * These types are used when converting a value from an input element
 * to the needed type.
 */
export type InputElementTypes = "number" | "text" | "checkbox" | "date";

/**
 * Takes the name of a primitive data type, and returns the a string 
 * that can be used for the `type` attribute of an html input element.
 * For example the type `"boolean"` will return `"checkbox"`.
 * @param primitiveType name of the primitive data type.
 * @returns the type name for an input element.
 */
export function primitiveNameToInputType(primitiveType: PrimitiveTypesNames): InputElementTypes {
    const typeMapping: {[key in PrimitiveTypesNames] : InputElementTypes} = {
        string: "text",
        number: "number",
        boolean: "checkbox",
        date: "date"
    }
    return typeMapping[primitiveType];
}

/**
 * Takes a string value, converts the string value to the given
 * primitive data type.
 * Used when converting the value from an html input element to
 * the correct data type.
 * @param value the value to be converted.
 * @param primitiveType name of the type to which the value will be converted.
 * @returns the converted value of the type corresponding to `primitiveType`.
 */
export function stringToPrimitive(value: string, primitiveType: PrimitiveTypesNames): PrimitiveTypes {
    const castMapping: {[key in PrimitiveTypesNames] : (val: string) => PrimitiveTypes} = {
        string: val => String(val),
        number: val => Number(val),
        boolean: val => Boolean(val),
        date: val => new Date(val),
    }
    return castMapping[primitiveType](value);
}

/**
 * Type guard function to check if a given value is a primitive type.
 * Used to ensure type safety when handling user input.
 * @param value The value to be checked.
 * @returns `true` if the value is a primitive type, 
 * returns `false` otherwise.
 */
export function isPrimitive(value: any): value is PrimitiveTypes {
    const isPrimitiveMap: { [key in TypeOfTypes & PrimitiveTypesNames] : boolean } = {
        string: true,
        number: true,
        boolean: true,
        date: true
    } as const;
    const typeKeys = getKeys(isPrimitiveMap);
    for (let i = 0; i < typeKeys.length; i++) {
        const typeKey = typeKeys[i];
        if (customTypeOf(value, typeKey))
            return true;
    }
    return false;
}

/**
 * Map of primitive type names to the corresponding function used to
 * check if a value is of that type.
 */
type PrimitiveTypeCheckFunctions = {
    [P in PrimitiveTypesNames]: (val: any) => boolean;
}

/**
 * Returns the primitive type name of a given value.
 * This function is similair to `extendTypeOf` and javascript's
 * built-in `typeof` operator. But only handles primitive form types
 * to ensure type safety.
 * @param value of a primitive data type.
 * @returns the name of the primitive data type in the form of a string.
 */
export function typeOfPrimitive<Val extends PrimitiveTypes>(value: Val): PrimitiveTypesNames {
    const primitiveTypeCheckFunctions: PrimitiveTypeCheckFunctions = {
        boolean: typeCheckFunctions.boolean,
        number: typeCheckFunctions.number,
        string: typeCheckFunctions.string,
        date: typeCheckFunctions.date
    }
    const keys = getKeys(primitiveTypeCheckFunctions);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (primitiveTypeCheckFunctions[key](value)) {
            return key;
        }
    }
    return "string";
}