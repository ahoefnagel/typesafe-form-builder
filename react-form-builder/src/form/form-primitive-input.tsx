import { useState } from "react";
import { customTypeOf, primitiveNameToInputType, PrimitiveTypes, stringToPrimitive, typeOfPrimitive } from "typesafe-form-builder";

type FormPrimitiveInputProps<Value extends PrimitiveTypes> = {
    value: Value,
    onValueChange: <R>(value: Value) => R | void
}

export function FormPrimitiveInput <Value extends PrimitiveTypes>(props: FormPrimitiveInputProps<Value>) {

    const [value, setValue] = useState(props.value);
    
    /**
     * Type of the input element.
     * This ensures correct data is entered into the form.
     */
    const type = primitiveNameToInputType(typeOfPrimitive(value));

    /**
     * Function to update value and execute callback.
     * @param newValue
     */
    const updateValue = (newValue: Value) => {
        props.onValueChange(newValue);
        setValue(newValue);
    }

    /**
     * Called when the input field is changed.
     * Has to be cast back to the generic `Value` type because
     * everything is a string in HTML.
     * @param event event from the input element
     */
    const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (customTypeOf(value, "boolean"))
            updateValue(event.target.checked as Value);
        else
            updateValue(stringToPrimitive(event.target.value, typeOfPrimitive(value)) as Value);
    }

    return <input type={type} value={formatValue(value)} onChange={onChangeEvent}></input>
}

/**
 * Formats a date into te yyyy-mm-dd format.
 * @param date date object to be formatted.
 * @returns formatted date as a string.
 */
const formatDate = (date: Date): string => {
    const yearStr = date.getFullYear().toString().padStart(4, '0');
    const monthStr = (date.getMonth()+1).toString().padStart(2, '0');
    const dayStr = date.getDate().toString().padStart(2, '0');
    return `${yearStr}-${monthStr}-${dayStr}`;
}

/**
 * Formats a value to the correct string so its accepted
 * as value for the input element.
 * @param value primitive value to be formatted to a string
 * @returns the `value` formatted as a string.
 */
const formatValue = (value: PrimitiveTypes): string => {
    if (customTypeOf(value, 'date'))
        return formatDate(value);
    return String(value);
}

