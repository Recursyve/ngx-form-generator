import { Validators } from "@angular/forms";
import { GeneratedFormArray } from "./generated-form";

class Test {
    public text!: string;
    public number!: number;
    public date!: Date;
}

describe("GeneratedFormArray", () => {
    let objectArray: GeneratedFormArray<Test>;
    let textArray: GeneratedFormArray<string>;
    let numberArray: GeneratedFormArray<number>;
    let dateArray: GeneratedFormArray<Date>;
    let reqArray: GeneratedFormArray<number>;

    beforeEach(() => {
        objectArray = new GeneratedFormArray<Test>({
            formElementType: "array",
            type: "Array",
            key: "array",
            name: "array",
            arrayType: Test,
            children: [
                {
                    formElementType: "control",
                    type: "String",
                    key: "text",
                    name: "text",
                    validators: [Validators.required]
                },
                {
                    formElementType: "control",
                    type: "Number",
                    key: "number",
                    name: "number",
                    validators: [Validators.required]
                },
                {
                    formElementType: "control",
                    type: "Date",
                    key: "date",
                    name: "date",
                    validators: [Validators.required]
                }
            ]
        });
        textArray = new GeneratedFormArray<string>({
            formElementType: "array",
            type: "Array",
            key: "text",
            name: "text",
            arrayType: String,
            children: null
        });
        numberArray = new GeneratedFormArray<number>({
            formElementType: "array",
            type: "Array",
            key: "number",
            name: "number",
            arrayType: Number,
            children: null
        });
        dateArray = new GeneratedFormArray<Date>({
            formElementType: "array",
            type: "Array",
            key: "date",
            name: "date",
            arrayType: Date,
            children: null
        });
        reqArray = new GeneratedFormArray<number>({
            formElementType: "array",
            type: "Array",
            key: "req",
            name: "req",
            arrayType: Number,
            children: null,
            validators: [Validators.required]
        });
    });

    it("patchValue should create missing controls", () => {
        objectArray.patchValue([
            {
                text: "TEST",
                number: 0,
                date: new Date(Date.UTC(2019, 4, 28))
            }
        ]);
        textArray.patchValue(["TEST"]);
        numberArray.patchValue([0]);
        dateArray.patchValue([new Date(Date.UTC(2019, 4, 28))]);

        expect(objectArray.length).toBe(1);
        expect(textArray.length).toBe(1);
        expect(numberArray.length).toBe(1);
        expect(dateArray.length).toBe(1);
    });

    it("getRawValue should returns a valid array", () => {
        objectArray.patchValue([
            {
                text: "TEST",
                number: 0,
                date: new Date(Date.UTC(2019, 4, 28))
            }
        ]);
        textArray.patchValue(["TEST"]);
        numberArray.patchValue([0]);
        dateArray.patchValue([new Date(Date.UTC(2019, 4, 28))]);

        const test = Object.assign(new Test(), {
            text: "TEST",
            number: 0,
            date: new Date(Date.UTC(2019, 4, 28))
        });
        expect(objectArray.getRawValue()).toEqual([test]);
        expect(textArray.getRawValue()).toEqual(["TEST"]);
        expect(numberArray.getRawValue()).toEqual([0]);
        expect(dateArray.getRawValue()).toEqual([new Date(Date.UTC(2019, 4, 28))]);
    });

    it("required array should not be a valid array", () => {
        expect(reqArray.invalid).toBe(true);
    });
});
