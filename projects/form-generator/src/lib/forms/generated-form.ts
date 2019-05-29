import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { ArrayModel } from "../models/array.model";
import { GeneratedControl } from "./generated-control";

@Injectable()
export class GeneratedFormGroup<T> extends FormGroup implements GeneratedControl {
    public controls: { [key: string]: GeneratedControl };

    constructor(private models: (ControlModel | GroupModel | ArrayModel)[]) {
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

    public markAsDirty(opts?: { onlySelf?: boolean; }): void {
        if (opts.onlySelf === undefined) {
            return super.markAsDirty(opts);
        }

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

export class GeneratedFormArray<T> extends FormArray implements GeneratedControl {
    public controls: GeneratedControl[];

    constructor(private model: ArrayModel) {
        super([]);
    }

    public push(): void {
        super.push(this.getControl());
    }

    public insert(index: number): void {
        super.insert(index, this.getControl());
    }

    public at(index: number): GeneratedControl {
        return super.at(index) as GeneratedControl;
    }

    public patchValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        let i = 0;
        for (const data of value) {
            if (i >= this.controls.length) {
                this.push();
            }
            this.at(i).patchValue(data, options);
            ++i;
        }
    }

    public getRawValue(): T[] {
        return this.controls.map(x => x.getRawValue());
    }

    private getControl(): AbstractControl {
        return this.model.children ? new GeneratedFormGroup(this.model.children) : new GeneratedFormControl({
            ...this.model,
            type: (this.model.arrayType as () => void).name
        });
    }
}

export class GeneratedFormControl<T> extends FormControl implements GeneratedControl {
    constructor(private model: ControlModel) {
        super(model.defaultValue, model.validators);
    }

    public getRawValue(): T {
        switch (this.model.type) {
            case "Number":
                return +this.value as any;
            case "Date":
                const date = this.value as Date;
                return new Date(Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    date.getUTCHours(),
                    date.getUTCMinutes(),
                    date.getUTCSeconds(),
                    date.getUTCMilliseconds()
                )) as any;
            default:
                return this.value;
        }
    }
}
