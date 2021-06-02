import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormItemComponent } from './form-item/form-item.component';
import { FormPrimitiveInputComponent } from './form-primitive-input/form-primitive-input.component';
import { FormatValuePipe } from './form-primitive-input/format-value.pipe';
import { FormComponent } from './form.component';

@NgModule({
    declarations: [
        FormComponent,
        FormItemComponent,
        FormPrimitiveInputComponent,
        FormatValuePipe
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        FormComponent
    ]
})
export class AngularFormBuilderLibModule { }
