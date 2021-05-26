/**
 * Create a copy of an object and add a new property to it.
 * @param object To source object that the `prop` and `value` will be added to.
 * @param prop Name of the property to be added.
 * @param value The value to be given to the property.
 * @returns A copy of `object` with the given `prop` and `value` added to it.
 */
import {TypeCheckFunctions, TypeOfTypes, TypeOfTypesMap, TypeOfTypesUnion} from "./helper-types";

export const addPropToObject = <
    InputObject extends Record<string, any>,
    Prop extends string,
    ValueType
    >
    (object: InputObject, prop: Prop, value: ValueType) : InputObject & Record<Prop, ValueType> => (
        {
            ...object,
            [prop]: value
        }
    )

/**
 * Picks a given list of properties from an object.
 * @param object Object from which the properties will be picked.
 * @param props List of properties that will be picked from the object.
 * @returns A copy of the object containing only the picked properties.
 */
export const pickProps = <InputObject, Props extends (keyof InputObject)[]>(object: InputObject, ...props: Props) 
    : Pick<InputObject, typeof props[number]> => {
        const ret = {} as Pick<InputObject, typeof props[number]>; // unavoidable cast
        props.forEach(prop => ret[prop] = object[prop]);
        return ret;
}

/**
 * Omits a given list of properties from an object.
 * @param object Object from which the properties will be omitted.
 * @param props List of properties that will be omitted from the object.
 * @returns A copy of the object containing only the properties that were not omitted.
 */
export const omitProps = <InputObject, Props extends (keyof InputObject)[]>(object: InputObject, ...props: Props) 
    : Omit<InputObject, typeof props[number]> => {
        const ret: Omit<InputObject, typeof props[number]> = {...object};
        props.forEach(prop => delete (ret as InputObject)[prop]);
        return ret
}

/**
 * Extended typeof function for date and arrays
 * @param Prop to be checked.
 * @returns The type as a string
 */
export const extendTypeOf = (prop:any):TypeOfTypes => {
  return typeof(prop) !== "object"?typeof(prop):
    prop instanceof Date?"date":
        prop instanceof Array?"array":
          "object"
}

export const getKeys = <Obj extends Object>(object: Obj): (keyof Obj)[] => Object.keys(object) as Array<keyof Obj>

const typeCheckFunctions: TypeCheckFunctions = {
    undefined: v => typeof v === "undefined",
    boolean: v => typeof v === "boolean",
    number: v => typeof v === "number",
    bigint: v => typeof v === "bigint",
    string: v => typeof v === "string",
    symbol: v => typeof v === "symbol",
    function: v => typeof v === "function",
    object: v => typeof v === "object",
    date: v => v instanceof Date,
    array: v => v instanceof Array
}

export function customTypeOf<TypeName extends TypeOfTypes>(val: any, typeName: TypeName): val is TypeOfTypesMap[TypeName] {
    if (!(typeName in typeCheckFunctions))
        return false;
    const checkFunction = typeCheckFunctions[typeName];
    return checkFunction(val);
}

function testTypecheck<Val extends TypeOfTypesMap[keyof TypeOfTypesMap]>(value: Val) {
    if (customTypeOf(value, "date")) {
        value;
    }
}
