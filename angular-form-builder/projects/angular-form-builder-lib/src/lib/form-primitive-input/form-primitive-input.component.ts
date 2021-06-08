import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { customTypeOf, PrimitiveTypes } from 'typesafe-form-builder';
import { primitiveNameToInputType, stringToPrimitive, InputElementTypes, isPrimitive, typeOfPrimitive } from 'typesafe-form-builder';

@Component({
    selector: 'lib-form-primitive-input',
    templateUrl: './form-primitive-input.component.html',
    styleUrls: ['./form-primitive-input.component.scss']
})
export class FormPrimitiveInputComponent<Value extends PrimitiveTypes> implements OnInit {

    @Input() value: Value = null!;
    @Output() valueChange: EventEmitter<Value> = new EventEmitter<Value>();

    public type: InputElementTypes = "text";

    constructor() { }

    /**
     * Runs when the component is initialized.
     * Determines the `type` used for the input element in this
     * component's template.
     */
    ngOnInit(): void {
        if (isPrimitive(this.value))
            this.type = primitiveNameToInputType(typeOfPrimitive(this.value));
    }

    /**
     * Called by the input element of this component when its value changes.
     * @param event event fired by the input element.
     */
    onInput(event: Event) {
        if (!event.target || !(event.target instanceof HTMLInputElement))
            return;
        else if (customTypeOf(this.value, "boolean"))
            this.updateValue(event.target.checked as Value);
        else if (isPrimitive(this.value))
            this.updateValue(stringToPrimitive(event.target.value, typeOfPrimitive(this.value)) as Value);
    }

    /**
     * Updates `this.value` and notifies the parent component or other
     * services subscribed to the `valueChange` event emitter.
     * @param newValue new value that will be assigned to `this.value`.
     */
    updateValue(newValue: Value) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }

}
