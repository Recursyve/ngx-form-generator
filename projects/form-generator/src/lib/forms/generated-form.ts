import { EventEmitter, Inject, Injectable, Optional } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { ArrayModel } from "../models/array.model";
import { ControlAsyncValidators, ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { AsyncValidator } from "../validators/async.validator";
import { NGX_FORM_GENERATOR_ASYNC_VALIDATORS } from "../validators/constant";
import { GeneratedControl } from "./generated-control";

@Injectable()
export class GeneratedFormGroup<T> extends FormGroup implements GeneratedControl {
    // tslint:disable-next-line:variable-name
    private _models: (ControlModel | GroupModel | ArrayModel)[];
    private config: GroupModel;

    public controls: { [key: string]: GeneratedControl };

    constructor(
        @Optional()
        @Inject(NGX_FORM_GENERATOR_ASYNC_VALIDATORS)
        private asyncValidators: AsyncValidator[] = []
    ) {
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
        const rawValue = new this.config.instance();

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this._models.find(x => x.name === key);
            rawValue[model.key] = control.getRawValue();
        }

        return rawValue;
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

    public markAllAsTouched() {
        super.markAllAsTouched();
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    private generateControls() {
        for (const control of this._models) {
            let formControl: AbstractControl;
            if (control.formElementType === "array") {
                formControl = new GeneratedFormArray(control as ArrayModel, this.asyncValidators);
            } else if (control.formElementType === "group") {
                formControl = new GeneratedFormGroup(this.asyncValidators);
                (formControl as GeneratedFormGroup<T>).setConfig(control as GroupModel);
            } else {
                formControl = new GeneratedFormControl(control, this.asyncValidators);
                (formControl as GeneratedFormControl<any>).setAsyncControlValidators((control as ControlModel).asyncValidators);
            }
            super.addControl(control.name, formControl);
        }
    }
}

export class GeneratedFormArray<T> extends FormArray implements GeneratedControl {
    public controls: GeneratedControl[];

    constructor(private model: ArrayModel, private asyncValidators: AsyncValidator[] = []) {
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

    public markAllAsTouched() {
        super.markAllAsTouched();
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    private getControl(): AbstractControl {
        if (this.model.children) {
            const group = new GeneratedFormGroup();
            group.setConfig({
                ...this.model,
                instance: this.model.arrayType
            });
            return group;
        }

        const formControl = new GeneratedFormControl({
            ...this.model,
            type: (this.model.arrayType as () => void).name
        }, this.asyncValidators);
        formControl.setAsyncControlValidators((this.model as ControlModel).asyncValidators);
        return formControl;
    }
}

export class GeneratedFormControl<T> extends FormControl implements GeneratedControl {
    constructor(private model: ControlModel, private asyncValidators: AsyncValidator[] = []) {
        super(model.defaultValue, model.validators);
    }

    public getRawValue(): T {
        switch (this.model.type) {
            case "Number":
                if (this.model.validationOption && this.model.validationOption.ignoreZero && +this.value === 0) {
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

    public setAsyncControlValidators(validators: ControlAsyncValidators[]): void {
        if (validators && validators.length) {
            this.setAsyncValidators(validators.map(x => this.customAsyncValidator.bind(this, x)));
        }
    }

    public markAllAsTouched() {
        super.markAllAsTouched();
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    private customAsyncValidator(controlValidator: ControlAsyncValidators, control: AbstractControl) {
        if (!this.asyncValidators) {
            return of(null);
        }

        const validator = this.asyncValidators.find(x => controlValidator.name === x.name);
        if (!validator) {
            return of(null);
        }

        return validator.validate(control);
    }
}
