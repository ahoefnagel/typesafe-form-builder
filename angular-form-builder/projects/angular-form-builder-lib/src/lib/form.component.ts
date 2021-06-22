import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lib-form[specification]',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent<Spec extends Object> {

    @Input() specification: Spec = null!; // Angular guarantees that item will have a value when the component is initialized because of the @Input decorator.
    @Output() specificationChange: EventEmitter<Spec> = new EventEmitter<Spec>();
    
    @Output() onSubmit: EventEmitter<Spec> = new EventEmitter<Spec>();

    /**
     * This is the callback for the submit button of the form.
     * It emits the current specification to whatever parent component 
     * is using this form component.
     * @param event 
     */
    onSubmitClicked(event: Event){
        event.preventDefault();
        this.onSubmit.emit(this.specification);
    }
}
