import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/form-item/form-item.component';

@NgModule({
    declarations: [
        AppComponent,
        FormInputComponent,
        FormComponent,
        FormItemComponent
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
