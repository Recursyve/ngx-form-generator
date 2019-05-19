import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxFormGeneratorModule } from "../../projects/form-generator/src/public-api";
import { TestDto } from "./dto/test.dto";

@NgModule({
    imports: [
        BrowserModule,
        NgxFormGeneratorModule.forFeature(
            {
                provide: "",
                useValue: TestDto
            },
            {
                provide: "ss",
                useValue: TestDto
            }
        )
    ]
})
export class AppModule {
}
