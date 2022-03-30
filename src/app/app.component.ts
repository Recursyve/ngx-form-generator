import { Component } from "@angular/core";
import { GeneratedFormGroup, NgxFormGeneratorProvider } from "../../projects/form-generator/src/public-api";
import { TestForm } from "./form/test.form";

@Component({
    selector: "app-root",
    templateUrl: "./app.template.html",
    providers: [
        ...NgxFormGeneratorProvider.forFeature([TestForm])
    ]
})
export class AppComponent {
    public values: TestForm;
    public valid: any;

    constructor(public formGroup: GeneratedFormGroup<TestForm>) {
    }

    public setValues() {
        this.formGroup.patchValue({
            test: "Hello world",
            disabledControl: "This should be disabled",
            group: {
                test: "Hello world!"
            }
        });
    }

    public getValues() {
        this.values = this.formGroup.getRawValue();
    }

    public getValid() {
        this.valid = {
            test: this.formGroup.valid,
            group: this.formGroup.controls.group.valid
        };
    }
}
