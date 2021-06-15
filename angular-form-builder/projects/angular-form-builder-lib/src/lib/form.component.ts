import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lib-form[specification]',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent<Spec extends Object> implements OnInit {

    @Input() specification: Spec = null!; // Angular guarantees that item will have a value when the component is initialized because of the @Input decorator.
    @Output() specificationChange: EventEmitter<Spec> = new EventEmitter<Spec>();
    
    @Output() onSubmit: EventEmitter<Spec> = new EventEmitter<Spec>();

    constructor() { }

    ngOnInit(): void {
        console.log("Form Spec:", this.specification);
    }

    onSubmitClicked(event: Event){
        console.log("Form component: submit was pressed.");
        event.preventDefault();
        this.onSubmit.emit(this.specification);
    }
}
