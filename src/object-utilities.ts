/**
 * Create a copy of an object and add a new property to it.
 * @param object To source object that the `prop` and `value` will be added to.
 * @param prop Name of the property to be added.
 * @param value The value to be given to the property.
 * @returns A copy of `object` with the given `prop` and `value` added to it.
 */
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
        props.forEach(prop => delete (ret as InputObject)[prop])
        return ret
}
