import { Component, OnInit } from '@angular/core';
import { deepCopy, FormBuilder } from 'angular-form-builder-lib';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'angular-form-builder';
    
    specification = FormBuilder
                    .entity("Student", 
                        q => q.select("name", "surname", "birthday"))
                    .entity("Course", 
                        q => q.select("name", "studyPoints"))
                    .specification;
    
    result;

    constructor() {
        this.result = this.specification;
    }
    
    ngOnInit(): void {
        this.result = deepCopy(this.specification);
    }

    /**
     * This is an example function to show how a developer who uses the
     * form builder might handle the submit event.
     * This function receives the resulting specification filled with user input.
     * The developer can then handle this data in their own way.
     * @param spec The resulting specification filled with user data.
     */
    onFormSubmitted() {
        console.log("Form has been submitted.\nResulting data:\n", deepCopy(this.specification));
        this.result = deepCopy(this.specification);
    }
}