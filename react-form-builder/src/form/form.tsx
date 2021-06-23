import React, { useState } from "react";
import './form.scss';
import { deepCopy } from "typesafe-form-builder";
import { FormItem } from "./form-item";

type FormProps<Spec extends Object> = {
    specification: Spec,
    onSpecificationChange: <R>(newSpecification: Spec) => R | void,
    onSubmit: <R>(newSpecification: Spec) => R | void
}

export function Form <Spec extends Object>(props: FormProps<Spec>) {

    /**
     * Specification state is created from the specification given through
     * this component's props.
     */
    const [specification, setSpecification] = useState(props.specification);

    /**
     * Called when the data in the specification is modified.
     * @param newSpecification new specification object with updated data.
     */
    const onSpecificationChange = (newSpecification: Spec) => {
        const specificationCopy = {...newSpecification};
        props.onSpecificationChange(specificationCopy);
        setSpecification(specificationCopy);
    }

    /**
     * This is the callback for the submit button of the form.
     * It gives the current specification to whatever parent component 
     * is using this form component.
     * @param event 
     */
    const onSubmitClicked = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSubmit(deepCopy({...specification}));
    }
    
    return <form>
        <FormItem item={specification} onItemChange={onSpecificationChange} />
        <input type="submit" onClick={onSubmitClicked} value="Submit"></input>
    </form>
}
