import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgxFormGeneratorModule } from "../../projects/form-generator/src/public-api";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AsyncValidationValidator } from "./validators/async.validator";

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        ReactiveFormsModule,
        NgxFormGeneratorModule.forRoot({
            asyncValidators: [
                AsyncValidationValidator
            ]
        })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
