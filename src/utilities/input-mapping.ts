import { PrimitiveTypes, PrimitiveTypesNames } from './helper-types';

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
export function primitiveToInputType(primitiveType: PrimitiveTypesNames): InputElementTypes {
    const typeMapping: {[key in PrimitiveTypesNames] : InputElementTypes} = {
        "string": "text",
        "number": "number",
        "boolean": "checkbox",
        "date": "date"
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
        "string": val => String(val),
        "number": val => Number(val),
        "boolean": val => Boolean(val),
        "date": val => Date.parse(val),
    }
    return castMapping[primitiveType](value);
}