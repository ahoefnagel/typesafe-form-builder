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

export const pickProps = <InputObject, Props extends (keyof InputObject)[]>(object: InputObject, ...props: Props) 
    : Pick<InputObject, typeof props[number]> => {
        const ret = {} as Pick<InputObject, typeof props[number]>; // unavoidable cast
        props.forEach(prop => ret[prop] = object[prop]);
        return ret;
}

export const omitProps = <InputObject, Props extends (keyof InputObject)[]>(object: InputObject, ...props: Props) 
    : Omit<InputObject, typeof props[number]> => {
        const ret: Omit<InputObject, typeof props[number]> = {...object};
        props.forEach(prop => delete (ret as InputObject)[prop])
        return ret
    }
