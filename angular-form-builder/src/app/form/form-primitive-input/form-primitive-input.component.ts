import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PrimitiveTypes, PrimitiveTypesNames } from '../../../../../src/utilities/helper-types';

type InputElementTypes = "text" | "number" | "checkbox" | "date";
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
        const valueType = typeof this.value; // TODO: replace with extend typeof function that supports the date type
        switch (valueType) {
            case "string":
            case "number":
            case "boolean":
                this.type = this.primitiveToInputType(valueType);
                break;
        }
    }

    primitiveToInputType(primitiveType: PrimitiveTypesNames): InputElementTypes {
        const typeMapping: {[key in PrimitiveTypesNames] : InputElementTypes} = {
            "string": "text",
            "number": "number",
            "boolean": "checkbox",
            "date": "date"
        }
        return typeMapping[primitiveType];
    }

    castToPrimitive(value: string, primitiveType: PrimitiveTypesNames): PrimitiveTypes {
        const castMapping: {[key in PrimitiveTypesNames] : (val: string) => PrimitiveTypes} = {
            "string": val => String(val),
            "number": val => Number(val),
            "boolean": val => Boolean(val),
            "date": val => Date.parse(val),
        }
        return castMapping[primitiveType](value);
    }

    onInput(event: Event) {
        if (!event.target || !(event.target instanceof HTMLInputElement))
            return;
        if (this.type === "checkbox") {
            this.updateValue(event.target.checked)
            return
        }
        
        const valueType = typeof this.value;
        switch(valueType) {
            case "string":
            case "number":
            case "boolean":
                this.updateValue(this.castToPrimitive(event.target.value, valueType));
                break;
        }
        
    }

    updateValue(newValue: Value) {
        this.value = newValue;
        this.valueChange.emit(newValue);
    }

}
