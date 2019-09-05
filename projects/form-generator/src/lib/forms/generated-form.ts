import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { ArrayModel } from "../models/array.model";
import { GeneratedControl } from "./generated-control";

@Injectable()
export class GeneratedFormGroup<T> extends FormGroup implements GeneratedControl {
    // tslint:disable-next-line:variable-name
    private _models: (ControlModel | GroupModel | ArrayModel)[];
    private config: GroupModel;

    public controls: { [key: string]: GeneratedControl };

    constructor() {
        super({});
    }

    public setConfig(config: GroupModel) {
        this.config = config;
        this._models = config.children;
        this.generateControls();
    }

    public patchValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        if (!value) {
            return;
        }

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const model = this._models.find(x => x.name === key);
            this.controls[key].patchValue(value[model.key], options);
        }
    }

    public getRawValue(): T {
        const rawValue = {} as T;

        const optional = !this.shouldValidate();
        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this._models.find(x => x.name === key);
            const value = control.getRawValue();
            if (!optional || (typeof value !== "undefined" && value !== null)) {
                rawValue[model.key] = value;
            }
        }

        if (!optional || !!Object.keys(rawValue).length) {
            return rawValue;
        }
    }

    public shouldValidate(): boolean {
        let parentValidation = true;
        if (this.parent) {
            parentValidation = (this.parent as any as GeneratedControl).shouldValidate();
        }
        if (!this.config) {
            return true;
        }
        return (this.config.validationOption || { isOptional: false }).isOptional ? false : parentValidation;
    }

    public copy(): GeneratedFormGroup<T> {
        const group = new GeneratedFormGroup<T>();
        group.setConfig(this.config);
        return group;
    }

    private generateControls() {
        for (const control of this._models) {
            let formControl: AbstractControl;
            if (control.type === "Array") {
                formControl = new GeneratedFormArray(control as ArrayModel);
            } else if ((control as GroupModel).children) {
                formControl = new GeneratedFormGroup();
                (formControl as GeneratedFormGroup<T>).setConfig(control as GroupModel);
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

    public push(value: unknown | T): void {
        const control = this.getControl();
        if (value) {
            control.patchValue(value);
        }
        super.push(control);
    }

    public insert(index: number, value: unknown | T): void {
        const control = this.getControl();
        if (value) {
            control.patchValue(value);
        }
        super.insert(index, control);
    }

    public at(index: number): GeneratedControl {
        return super.at(index) as GeneratedControl;
    }

    public patchValue(value: T[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        if (!value) {
            return;
        }

        let i = 0;
        for (const data of value) {
            if (i >= this.controls.length) {
                this.push(null);
            }
            this.at(i).patchValue(data, options);
            ++i;
        }
    }

    public getRawValue(): T[] {
        return this.controls.map(x => x.getRawValue());
    }

    public shouldValidate(): boolean {
        if (this.parent) {
            return (this.parent as any as GeneratedControl).shouldValidate();
        }
        if (!this.model) {
            return true;
        }
        return (this.model.validationOption || { isOptional: false }).isOptional;
    }

    private getControl(): AbstractControl {
        if (this.model.children) {
            const group = new GeneratedFormGroup();
            group.setConfig(this.model);
            return group;
        }

        return new GeneratedFormControl({
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
                if (this.model.validationOption && this.model.validationOption.ignoreZero) {
                    return;
                }

                return +this.value as any;
            default:
                return this.value;
        }
    }

    public shouldValidate(): boolean {
        if (this.parent) {
            return (this.parent as any as GeneratedControl).shouldValidate();
        }

        if (!this.model) {
            return true;
        }
        return !(this.model.validationOption || { isOptional: false }).isOptional;
    }
}
