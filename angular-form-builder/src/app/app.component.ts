import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-form-builder';
    
    specification = {
        word: "test",
        student: [
            {
                name: "John",
                surname: "Doe",
                grades: [
                    {
                        grade: 0,
                        courseid: 0
                    }
                ]
            },
        ],
        course: [
            {
                name: "Development",
                studypoints: 0,
                active: true,
                lectures: [
                    {
                        title: "Hello World Lecture",
                        topic: "Printing 'Hello, world!'"
                    }
                ]
            },
        ]
    }
}