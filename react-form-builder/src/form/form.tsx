import React, { useState } from "react";
import { deepCopy } from "typesafe-form-builder";
import { FormItem } from "./form-item";

type FormProps<Spec extends Object> = {
    specification: Spec,
    onSpecificationChange: <R>(newSpecification: Spec) => R | void,
    onSubmit: <R>(newSpecification: Spec) => R | void
}

export function Form <Spec extends Object>(props: FormProps<Spec>) {

    const [specification, setSpecification] = useState(props.specification);

    const onSpecificationChange = (newSpecification: Spec) => {
        const specificationCopy = {...newSpecification};
        props.onSpecificationChange(specificationCopy);
        setSpecification(specificationCopy);
    }

    const onSubmitClicked = (event: React.FormEvent) => {
        event.preventDefault();
        props.onSubmit(deepCopy({...specification}));
    }
    
    return <form>
        <FormItem item={specification} onItemChange={onSpecificationChange} />
        <input type="submit" onClick={onSubmitClicked} value="Submit"></input>
    </form>
}
