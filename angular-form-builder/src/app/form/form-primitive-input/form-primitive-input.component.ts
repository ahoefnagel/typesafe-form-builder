import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PrimitiveTypes } from '../../../../../src/utilities/helper-types';
import { primitiveToInputType, stringToPrimitive, InputElementTypes } from '../../../../../src/utilities/input-mapping';
import { extendTypeOf } from '../../../../../src/utilities/object-utilities';

type Value = PrimitiveTypes | null;

@Component({
    selector: 'app-form-primitive-input',
    templateUrl: './form-primitive-input.component.html',
    styleUrls: ['./form-primitive-input.component.scss']
})
export class FormPrimitiveInputComponent implements OnInit {

    @Input() value: Value | null = null;
    @Output() valueChange: EventEmitter<Value> = new EventEmitter<Value>();

    public type: InputElementTypes = "text";

    constructor() { }

    ngOnInit(): void {
        const valueType = extendTypeOf(this.value); // TODO: replace with extend typeof function that supports the date type
        switch (valueType) {
            case "string":
            case "number":
            case "boolean":
                this.type = primitiveToInputType(valueType);
                break;
        }
    }

    onInput(event: Event) {
        if (!event.target || !(event.target instanceof HTMLInputElement))
            return;
        if (this.type === "checkbox") {
            this.updateValue(event.target.checked)
            return
        }
        
        const valueType = extendTypeOf(this.value);
        switch(valueType) {
            case "string":
            case "number":
            case "boolean":
                this.updateValue(stringToPrimitive(event.target.value, valueType));
                break;
        }
        
    }

    updateValue(newValue: Value) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }

}
