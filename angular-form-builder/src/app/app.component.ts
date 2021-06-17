import { Component, OnInit } from '@angular/core';
import { deepCopy, FormBuilder } from 'angular-form-builder-lib';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular-form-builder';
    
    /**
     * The specification to be rendered by the form builder Angular renderer.
     * The specification is first built using the FormBuilder's entity and select functions.
     * This demonstrates how the form builder would be used by a developer.
     *
     * @memberof AppComponent
     */
    specification = FormBuilder
                    .entity("Student", 
                        q => q.select("name", "surname", "birthday")
                            .children("grades", q => q.select("grade")
                                .child("course", q => q.select("name"))
                            )
                        )
                    .entity("Course", 
                        q => q.select("name", "studyPoints", "active"))
                    .specification;
    
    /**
     * The result property will contain a deep copy of the specification containing the
     * user's data when the submit button is pressed.
     *
     * @memberof AppComponent
     */
    result;

    /**
     * A reference of `this.specification` is temporarily given to `this.result`
     * to infer the type of `this.result`.
     * This ensures that `this.result` is of the same type as `this.specification`.
     * This reference is replaced with a deep copy of `this.specification` in the
     * ngOnInit method.
     */
    constructor() {
        this.result = this.specification;
    }
    
    ngOnInit(): void {
        this.result = deepCopy(this.specification);
    }

    /**
     * This is an example function to show how a developer who uses the
     * form builder might handle the submit event.
     * In this example, a copy of the specification is made using the `deepCopy` function,
     * imported from the form builder library.
     * The developer can then handle this data in their own way.
     */
    onFormSubmitted() {
        console.log("Form has been submitted.\nResulting data:\n", deepCopy(this.specification));
        this.result = deepCopy(this.specification);
    }
}