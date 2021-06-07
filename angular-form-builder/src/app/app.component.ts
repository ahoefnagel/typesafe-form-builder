import { Component } from '@angular/core';
import { FormBuilder } from 'angular-form-builder-lib';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-form-builder';
    
    specification = FormBuilder
                    .entity("Student", 
                        q => q.select("name", "surname", "birthday"))
                    .entity("Course", 
                        q => q.select("name", "studyPoints"))
                    .specification;

}