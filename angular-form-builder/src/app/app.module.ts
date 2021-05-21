import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormItemComponent } from './form/form-item/form-item.component';
import { FormPrimitiveInputComponent } from './form/form-primitive-input/form-primitive-input.component';

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        FormItemComponent,
        FormPrimitiveInputComponent
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
