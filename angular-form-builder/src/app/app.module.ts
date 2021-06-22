import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AngularFormBuilderLibModule } from 'angular-form-builder-lib';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularFormBuilderLibModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
