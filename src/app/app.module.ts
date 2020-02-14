import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgxFormGeneratorModule } from "@recursyve/ngx-form-generator";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AsyncValidationValidator } from "./validators/async.validator";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,

        NgxFormGeneratorModule.forRoot({
            asyncValidators: [
                AsyncValidationValidator
            ]
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
