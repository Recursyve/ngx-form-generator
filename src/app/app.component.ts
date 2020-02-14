import { Component } from "@angular/core";
import { GeneratedFormGroup, NgxFormGeneratorProvider } from "@recursyve/ngx-form-generator";
import { TestDto } from "./dto/test.dto";

@Component({
    selector: "app-root",
    templateUrl: "./app.template.html",
    providers: [
        ...NgxFormGeneratorProvider.forFeature([TestDto])
    ]
})
export class AppComponent {
    public values: TestDto;
    public valid: any;

    constructor(public formGroup: GeneratedFormGroup<TestDto>) {
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

    public getValid() {
        this.valid = {
            test: this.formGroup.valid,
            group: this.formGroup.controls.group.valid
        };
    }
}
