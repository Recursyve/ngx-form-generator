import { Component, Inject } from "@angular/core";
import { GeneratedFormGroup } from "../../projects/form-generator/src/lib/forms";
import { TestDto } from "./dto/test.dto";

@Component({
    selector: "app-root",
    templateUrl: "app.template.html"
})
export class AppComponent {
    public values: TestDto;

    constructor(@Inject("Test") public formGroup: GeneratedFormGroup<TestDto>) {
    }

    public setValues() {
        this.formGroup.patchValue({
            test: "Hello world",
            group: {
                test: "Hello world!"
            }
        });
    }

    public getValues() {
        this.values = this.formGroup.getRawValue();
    }
}
