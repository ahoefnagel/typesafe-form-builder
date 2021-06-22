import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormItemComponent } from './form-item/form-item.component';
import { FormPrimitiveInputComponent } from './form-primitive-input/form-primitive-input.component';
import { FormatValuePipe } from './form-primitive-input/format-value.pipe';
import { FormComponent } from './form.component';
import { ObjectKeyValuePipe } from './form-item/object-key-value.pipe';

@NgModule({
    declarations: [
        FormComponent,
        FormItemComponent,
        FormPrimitiveInputComponent,
        FormatValuePipe,
        ObjectKeyValuePipe
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        FormComponent
    ]
})
export class AngularFormBuilderLibModule { }
