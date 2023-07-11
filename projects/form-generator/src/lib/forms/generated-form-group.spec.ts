import { ArrayModel } from "../models/array.model";
import { ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { GeneratedFormArray, GeneratedFormGroup } from "./generated-form";
import { Validators } from "@angular/forms";

class TestGroup {
    public text!: string;
    public number!: number;
    public date!: Date;
}

class Test {
    public text!: string;
    public number!: number;
    public date!: Date;
    public group!: TestGroup;
    public array!: TestGroup[];
}

describe("GeneratedFormGroup", () => {
    let group: GeneratedFormGroup<Test>;

    beforeEach(() => {
        group = new GeneratedFormGroup<Test>();
        group.setConfig({
            instance: Test,
            children: [
                {
                    formElementType: "control",
                    type: "String",
                    key: "text",
                    name: "text",
                    validators: [Validators.required],
                } as ControlModel,
                {
                    formElementType: "control",
                    type: "Number",
                    key: "number",
                    name: "number",
                    validators: [Validators.required]
                } as ControlModel,
                {
                    formElementType: "control",
                    type: "Date",
                    key: "date",
                    name: "date",
                    validators: [Validators.required]
                } as ControlModel,
                {
                    instance: TestGroup,
                    formElementType: "group",
                    type: "TestGroup",
                    key: "group",
                    name: "group",
                    children: [
                        {
                            formElementType: "control",
                            type: "String",
                            key: "text",
                            name: "text",
                            validators: [Validators.required]
                        } as ControlModel,
                        {
                            formElementType: "control",
                            type: "Number",
                            key: "number",
                            name: "number",
                            validators: [Validators.required]
                        } as ControlModel,
                        {
                            formElementType: "control",
                            type: "Date",
                            key: "date",
                            name: "date",
                            validators: [Validators.required]
                        } as ControlModel
                    ]
                } as GroupModel,
                {
                    formElementType: "array",
                    type: "Array",
                    key: "array",
                    name: "array",
                    arrayType: TestGroup,
                    children: [
                        {
                            formElementType: "control",
                            type: "String",
                            key: "text",
                            name: "text",
                            validators: [Validators.required]
                        } as ControlModel,
                        {
                            formElementType: "control",
                            type: "Number",
                            key: "number",
                            name: "number",
                            validators: [Validators.required]
                        } as ControlModel,
                        {
                            formElementType: "control",
                            type: "Date",
                            key: "date",
                            name: "date",
                            validators: [Validators.required]
                        } as ControlModel
                    ]
                } as ArrayModel
            ]
        } as GroupModel);
    });

    it("group should have valid controls", () => {
        expect(group.controls.text).toBeTruthy();
        expect(group.controls.number).toBeTruthy();
        expect(group.controls.date).toBeTruthy();
        expect(group.controls.group).toBeTruthy();
        expect(group.controls.array).toBeTruthy();

        const array = group.controls.array as GeneratedFormArray<TestGroup>;
        expect(array.length).toEqual(0);

        group = group.controls.group as GeneratedFormGroup<Test>;
        expect(group.controls.text).toBeTruthy();
        expect(group.controls.number).toBeTruthy();
        expect(group.controls.date).toBeTruthy();
    });

    it("patchValue should set values in all controls", () => {
        group.patchValue({
            text: "TEST",
            number: 0,
            date: new Date(Date.UTC(2019, 4, 28)),
            group: {
                text: "TEST",
                number: 0,
                date: new Date(Date.UTC(2019, 4, 28))
            },
            array: [
                {
                    text: "TEST",
                    number: 0,
                    date: new Date(Date.UTC(2019, 4, 28))
                }
            ]
        });

        const rawValue = group.getRawValue();
        expect(rawValue).toBeTruthy();

        expect(group.controls.text.getRawValue()).toEqual("TEST");
        expect(group.controls.number.getRawValue()).toEqual(0);
        expect(group.controls.date.getRawValue()).toEqual(new Date(Date.UTC(2019, 4, 28)));

        const testGroup = Object.assign(new TestGroup(), {
            text: "TEST",
            number: 0,
            date: new Date(Date.UTC(2019, 4, 28))
        });
        expect(group.controls.group.getRawValue()).toEqual(testGroup);
        expect(group.controls.array.getRawValue()).toEqual([testGroup]);
    });
});
