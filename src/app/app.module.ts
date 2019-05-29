import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxFormGeneratorModule } from "../../projects/form-generator/src/public-api";
import { TestDto } from "./dto/test.dto";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        NgxFormGeneratorModule.forFeature(
            {
                provide: "Test",
                useValue: TestDto
            }
        ),
        ReactiveFormsModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
