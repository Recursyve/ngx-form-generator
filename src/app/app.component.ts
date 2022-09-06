import { Component, OnInit } from "@angular/core";
import { GeneratedFormArray, GeneratedFormGroup, NgxFormGeneratorProvider } from "../../projects/form-generator/src/public-api";
import { ArrayTestForm, TestForm } from "./form/test.form";

@Component({
    selector: "app-root",
    templateUrl: "./app.template.html",
    providers: [
        ...NgxFormGeneratorProvider.forFeature([TestForm])
    ]
})
export class AppComponent implements OnInit {
    public values: TestForm;
    public touchedValues: Partial<TestForm>;
    public valid: any;

    constructor(public formGroup: GeneratedFormGroup<TestForm>) {
    }

    public ngOnInit(): void {
        (this.formGroup.get("array") as GeneratedFormArray<ArrayTestForm>).valueChanges.subscribe(() => console.log("Nice."));
        (this.formGroup.get("array") as GeneratedFormArray<ArrayTestForm>).childValueChanges.subscribe(([x, i]) => console.log(x, i));
    }

    public setValues() {
        this.formGroup.patchValue({
            test: "Hello world",
            disabledControl: "This should be disabled",
            group: {
                test: "Hello world!",
                test2: null,
                test3: null
            },
            array: []
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

    public getTouchedValue() {
        this.touchedValues = this.formGroup.getTouchedValue();
    }

    public addControl(): void {
        (this.formGroup.get("array") as GeneratedFormArray<ArrayTestForm>).push({
            name: `test! ${(this.formGroup.get("array") as GeneratedFormArray<ArrayTestForm>).length + 1}`
        });
    }
}
