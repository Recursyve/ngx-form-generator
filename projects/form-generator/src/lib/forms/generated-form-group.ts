import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { GeneratedFormArray } from "./generated-form-array";
import { ArrayModel } from "../models/array.model";
import { GeneratedFormControl } from "./generated-form-control";
import { GeneratedControl } from "./generated-control";

@Injectable()
export class GeneratedFormGroup<T> extends FormGroup implements GeneratedControl {
    public controls: { [key: string]: GeneratedControl };

    constructor(private models: (ControlModel | GroupModel)[]) {
        super({});
        this.generateControls();
    }

    public patchValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const model = this.models.find(x => x.name === key);
            this.controls[key].patchValue(value[model.key], options);
        }
    }

    public markAsDirty(): void {
        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            this.controls[key].markAsDirty();
        }
    }

    public getRawValue(): T {
        const rawValue = {} as T;

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this.models.find(x => x.name === key);
            rawValue[model.key] = control.getRawValue();
        }

        return rawValue;
    }

    public copy(): GeneratedFormGroup<T> {
        return new GeneratedFormGroup<T>(this.models);
    }

    private generateControls() {
        for (const control of this.models) {
            let formControl: AbstractControl;
            if (control.type === "Array") {
                formControl = new GeneratedFormArray(control as ArrayModel);
            } else if ((control as GroupModel).children) {
                formControl = new GeneratedFormGroup((control as GroupModel).children);
            } else {
                formControl = new GeneratedFormControl(control);
            }
            super.addControl(control.name, formControl);
        }
    }
}
