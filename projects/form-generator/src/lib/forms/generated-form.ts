import { EventEmitter, Inject, Injectable, Optional } from "@angular/core";
import {
    AbstractControl,
    AbstractControlOptions,
    FormArray,
    FormControl,
    FormGroup,
    ValidatorFn
} from "@angular/forms";
import { map, merge, Observable, of, Subscription } from "rxjs";
import { ArrayModel } from "../models/array.model";
import { ControlAsyncValidators, ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { ValueUtils } from "../utils/value.utils";
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
        private asyncValidators: AsyncValidator[] = [],
        @Optional()
        @Inject("GeneratedFormGroupOptions")
        options?: AbstractControlOptions
    ) {
        super({}, options);
    }

    public setConfig(config: GroupModel) {
        this.config = config;
        this._models = config.children;
        this.setValidators(config.validators);
        this.generateControls();

        if (this.config.disabled) {
            this.disable({ emitEvent: false });
        }
    }

    public patchValue(value: T, options: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
        if (!value) {
            return;
        }

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const model = this._models.find(x => x.name === key);
            this.controls[key].patchValue(value[model.key], { onlySelf: true, emitEvent: options.emitEvent });
        }

        this.updateValueAndValidity(options);
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

    public getValidValue(): T {
        const validValue = new this.config.instance();

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this._models.find(x => x.name === key);
            validValue[model.key] = control.getValidValue();
        }

        return validValue;
    }

    public getTouchedValue(): T {
        const validValue = new this.config.instance();

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this._models.find(x => x.name === key);
            if (control.touched) {
                validValue[model.key] = control.getRawValue();
            }
        }

        return validValue;
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
    private controlValueChanges$: Observable<[T, number]>;
    private controlValueChangesSub: Subscription;

    public controls: GeneratedControl[];

    public childValueChanges: EventEmitter<[T, number]> = new EventEmitter<[T, number]>();

    constructor(public readonly model: ArrayModel, private asyncValidators: AsyncValidator[] = []) {
        super(model.defaultValue ?? [], [...model.validators ?? []]);

        if (model.disabled) {
            this.disable({ emitEvent: false });
        }
    }

    public push(value: unknown | T, options?: { emitEvent?: boolean; }): void {
        const control = this.getControl();
        super.push(control, { emitEvent: false });
        this.generateControlValueChanges();
        if (value) {
            control.patchValue(value, options);
        }
    }

    public insert(index: number, value: unknown | T, options?: { emitEvent?: boolean; }): void {
        const control = this.getControl();
        super.insert(index, control, { emitEvent: false });
        this.generateControlValueChanges();
        if (value) {
            control.patchValue(value, options);
        }
    }

    public at(index: number): GeneratedControl {
        return super.at(index) as GeneratedControl;
    }

    public removeAt(index: number, options?: { emitEvent?: boolean }) {
        super.removeAt(index, options);
        this.generateControlValueChanges();
    }

    public patchValue(value: T[], options: { onlySelf?: boolean; emitEvent?: boolean } = {}): void {
        if (!value) {
            return;
        }

        let i = 0;
        for (const data of value) {
            if (i >= this.controls.length) {
                this.push(null);
            }
            this.at(i).patchValue(data, { onlySelf: true, emitEvent: options.emitEvent });
            ++i;
        }

        this.updateValueAndValidity(options);
    }

    public getRawValue(): T[] {
        return this.controls.map(x => x.getRawValue());
    }

    public getValidValue(): T[] {
        return this.controls.map(x => x.getValidValue());
    }

    public getTouchedValue(): T[] {
        return this.controls.filter(x => x.touched).map(x => x.getRawValue());
    }

    public markAllAsTouched() {
        super.markAllAsTouched();
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    private getControl(): AbstractControl {
        if (this.model.children) {
            const group = new GeneratedFormGroup(this.asyncValidators);
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

    private generateControlValueChanges(): void {
        if (this.controlValueChangesSub) {
            this.controlValueChangesSub.unsubscribe();
        }

        this.controlValueChanges$ = merge(
            ...this.controls.map((control, i) => control.valueChanges.pipe(map(x => [x, i])))
        ) as Observable<[T, number]>;
        this.controlValueChangesSub = this.controlValueChanges$.subscribe(x => this.childValueChanges.next(x));
    }
}

export class GeneratedFormControl<T> extends FormControl implements GeneratedControl {
    constructor(public readonly model: ControlModel, private asyncValidators: AsyncValidator[] = []) {
        super({ value: ValueUtils.useOrComputeValue(model.defaultValue), disabled: model.disabled }, {
            validators: [...model.validators ?? []],
            updateOn: model.updateOn
        });
    }

    public getRawValue(): T {
        switch (this.model.type) {
            case "Number":
                if (this.value === null || this.value === undefined) {
                    return this.value;
                }

                if (this.model.validationOption && this.model.validationOption.ignoreZero && +this.value === 0) {
                    return;
                }

                return +this.value as any;
            case "String":
                if (this.model.validationOption && this.model.validationOption.ignoreEmpty && this.value === "") {
                    return;
                }

                return this.value;
            default:
                return this.value;
        }
    }

    public getValidValue(): T {
        if (this.invalid) {
            return undefined;
        }

        return this.getRawValue();
    }

    public getTouchedValue(): T {
        if (!this.touched) {
            return undefined;
        }

        return this.getRawValue();
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

    public get validator(): ValidatorFn | null {
        if (!(this.model?.condition?.(this) ?? true)) {
            return null;
        }
        return super.validator;
    }

    public set validator(validatorFn: ValidatorFn | null) {
        super.validator = validatorFn;
    }

    public updateValueAndValidity(opts?: { onlySelf?: boolean; emitEvent?: boolean, depth?: number }) {
        const depth = opts?.depth ?? 1;
        if (depth <= 1) {
            this.checkDynamicValidators();
        }

        super.updateValueAndValidity(opts);

        if (!this.parent) {
            return;
        }

        const controls: GeneratedFormControl<any>[] =
            (this.parent instanceof GeneratedFormArray
                ? this.parent.controls
                : Object.values(this.parent.controls)
            ) as GeneratedFormControl<any>[];
        for (const control of controls) {
            if (control === this || depth > 1) {
                continue;
            }

            if (control instanceof GeneratedFormControl) {
                const shouldRevalidate = control.checkDynamicValidators();
                if (shouldRevalidate || control.model?.condition) {
                    control.updateValueAndValidity({depth: depth + 1, emitEvent: opts?.emitEvent, onlySelf: true});
                }
            }
        }
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

    private checkDynamicValidators(): boolean {
        if (!this.model?.dynamicValidators?.length) {
            return;
        }

        // Use the internal function of implemented by FormGroup.
        const parent = (this.parent as any)?._reduceValue();

        let shouldRevalidate = false;
        for (const validator of this.model.dynamicValidators) {
            const success = validator.condition({ value: this.value, parent, control: this });

            if ((success && validator.action === "add") || (!success && validator.action === "remove")) {
                for (const fn of validator.validators) {
                    if (!this.hasValidator(fn)) {
                        this.addValidators(fn);
                        shouldRevalidate = true;
                    }
                }
            } else if ((success && validator.action === "remove") || (!success && validator.action === "add")) {
                for (const fn of validator.validators) {
                    if (this.hasValidator(fn)) {
                        this.removeValidators(fn);
                        shouldRevalidate = true;
                    }
                }
            }
        }

        return shouldRevalidate;
    }
}
