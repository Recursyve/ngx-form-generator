import { Validators } from "@angular/forms";
import { GeneratedFormControl } from "./generated-form";

describe("GeneratedFormControl", () => {
    let textControl: GeneratedFormControl<string>;
    let numberControl: GeneratedFormControl<number>;
    let dateControl: GeneratedFormControl<Date>;
    let defaultValueControl: GeneratedFormControl<string>;
    let defaultFunctionalValueControl: GeneratedFormControl<string>;

    beforeEach(() => {
        textControl = new GeneratedFormControl({
            formElementType: "control",
            type: "String",
            key: "text",
            name: "text",
            validators: [Validators.required]
        });

        numberControl = new GeneratedFormControl({
            formElementType: "control",
            type: "Number",
            key: "number",
            name: "number",
            validators: [Validators.required]
        });

        dateControl = new GeneratedFormControl({
            formElementType: "control",
            type: "Date",
            key: "date",
            name: "date",
            validators: [Validators.required]
        });

        defaultValueControl = new GeneratedFormControl({
            formElementType: "control",
            type: "String",
            key: "text",
            name: "text",
            defaultValue: "default_value"
        });

        defaultFunctionalValueControl = new GeneratedFormControl({
            formElementType: "control",
            type: "String",
            key: "text",
            name: "text",
            defaultValue: () => "default_value"
        });
    });

    it("Controls should be in invalid state by default", () => {
        expect(textControl.invalid).toBeTruthy();
        expect(numberControl.invalid).toBeTruthy();
        expect(dateControl.invalid).toBeTruthy();
    });

    it("Controls should be in valid state when containing a value", () => {
        textControl.patchValue("TEST");
        numberControl.patchValue(0);
        dateControl.patchValue(new Date(Date.UTC(2019, 4, 28)));

        expect(textControl.valid).toBeTruthy();
        expect(numberControl.valid).toBeTruthy();
        expect(dateControl.valid).toBeTruthy();
        expect(defaultValueControl.valid).toBeTruthy();
        expect(defaultFunctionalValueControl.valid).toBeTruthy();
    });

    it("getRawValue should returns value in the good format", () => {
        textControl.patchValue("TEST");
        numberControl.patchValue(0);
        dateControl.patchValue(new Date(Date.UTC(2019, 4, 28)));

        expect(textControl.getRawValue()).toEqual("TEST");
        expect(numberControl.getRawValue()).toEqual(0);
        expect((dateControl.getRawValue() as Date)).toEqual(new Date(Date.UTC(2019, 4, 28)));
        expect(defaultValueControl.getRawValue()).toEqual("default_value");
        expect(defaultFunctionalValueControl.getRawValue()).toEqual("default_value");

        numberControl.patchValue(null as any);
        expect(numberControl.getRawValue()).toEqual(null as any);
    });
});
