import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lib-form[specification]',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent<Spec extends Object> implements OnInit {

    @Input() specification: Spec | {} = {};
    @Output() specificationChange: EventEmitter<Spec> = new EventEmitter<Spec>();

    constructor() { }

    ngOnInit(): void {
        console.log("Form Spec:", this.specification);
    }
}
