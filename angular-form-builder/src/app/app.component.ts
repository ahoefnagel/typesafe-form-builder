import { Component, HostBinding, OnInit } from '@angular/core';
import { deepCopy, defaultEntity, FormBuilder } from 'angular-form-builder-lib';

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
     * In this example the `entity` function is also given a default student object
     * and two grades. This shows that a developer can provide an already existing object
     * to the form builder, whose values can then be edited in the form.
     * Alternatively, for `entity("Course")` no data is provided. Instead, the entity function
     * will create a default `Course` object to be querried.
     *
     * @memberof AppComponent
     */
    specification = FormBuilder
                    .entity("Student", 
                        q => q.select("name", "surname", "birthday")
                            .children("grades", q => q.select("grade")
                                .child("course", q => q.select("name"))
                            ),
                            {
                                ...defaultEntity("Student"),
                                grades: [defaultEntity("Grades"), defaultEntity("Grades")]
                            }
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
        this.submitted = true;
    }

    /**
     * Property used to toggle between form input and the submitted results element.
     *
     * @type {boolean}
     * @memberof AppComponent
     */
    @HostBinding('attr.submitted') submitted: boolean = false;

    /**
     * Used to return to the form input view when the back button in the results
     * element is pressed.
     */
    onBackButton = () => this.submitted = false;
}