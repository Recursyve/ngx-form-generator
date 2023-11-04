import { EventEmitter, Inject, Injectable, Optional } from "@angular/core";
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    UntypedFormControl,
    ValidationErrors,
    ValidatorFn,
} from "@angular/forms";
import { map, merge, Observable, of, Subscription } from "rxjs";
import { NotInitException } from "../exceptions/not-init.exception";
import { GroupHandler } from "../handlers/group.handler";
import { ArrayModel } from "../models/array.model";
import { ControlAsyncValidators, ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { ValueUtils } from "../utils/value.utils";
import { AsyncValidator, NGX_FORM_GENERATOR_ASYNC_VALIDATORS } from "../validators";
import { GeneratedControl } from "./generated-control";

@Injectable()
export class GeneratedFormGroup<T extends { [key: string]: any }>
    extends FormGroup
    implements GeneratedControl
{
    // tslint:disable-next-line:variable-name
    private _models: (ControlModel | GroupModel | ArrayModel)[] = [];
    private config?: GroupModel;

    public controls: { [key: string]: GeneratedControl } = {};

    constructor(
        @Optional()
        @Inject(NGX_FORM_GENERATOR_ASYNC_VALIDATORS)
        private readonly asyncValidators: AsyncValidator[] = []
    ) {
        super({});

        this.asyncValidators = this.asyncValidators.filter((validator) => !!validator);
    }

    public setConfig(config: GroupModel): void {
        this.config = config;
        this._models = config.children;
        this.setValidators(config.validators ?? null);
        this.setAsyncFormGroupValidators(config.asyncValidators ?? null);
        this.generateControls();

        if (this.config.disabled) {
            this.disable({ emitEvent: false });
        }
    }

    public patchValue(
        value: T,
        options: { onlySelf?: boolean; emitEvent?: boolean } = {}
    ): void {
        if (!this.config) {
            throw new NotInitException();
        }

        if (!value) {
            return;
        }

        for (const key in value) {
            if (!value.hasOwnProperty(key)) {
                continue;
            }

            const model = this._models.find((x) => x.name === key);
            if (!model && !this.controls[key] && this.config.dynamic) {
                if (typeof value[key] === "object" || Array.isArray(value[key])) {
                    continue;
                }

                this.addControl(key, new FormControl(""));
            } else if (!model) {
                continue;
            }

            this.controls[key].patchValue(value[key], {
                onlySelf: true,
                emitEvent: options.emitEvent,
            });
        }

        this.updateValueAndValidity(options);
    }

    public setAsyncFormGroupValidators(
        validators: ControlAsyncValidators[] | null
    ): void {
        if (validators && validators.length) {
            this.setAsyncValidators(
                validators.map((x) => this.customAsyncValidator.bind(this, x))
            );
        }
    }

    public getRawValue(): T {
        if (!this.config) {
            throw new NotInitException();
        }

        const rawValue = new this.config.instance();

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this._models.find((x) => x.name === key);
            if (!model) {
                continue;
            }

            rawValue[model.key] = control.getRawValue();
        }

        return rawValue;
    }

    public getValidValue(): T {
        if (!this.config) {
            throw new NotInitException();
        }

        const validValue = new this.config.instance();

        for (const key in this.controls) {
            if (!this.controls.hasOwnProperty(key)) {
                continue;
            }

            const control = this.controls[key];
            const model = this._models.find((x) => x.name === key);
            if (!model) {
                continue;
            }

            validValue[model.key] = control.getValidValue();
        }

        return validValue;
    }

    public copy(): GeneratedFormGroup<T> {
        if (!this.config) {
            throw new NotInitException();
        }

        const group = new GeneratedFormGroup<T>();
        group.setConfig(this.config);
        return group;
    }

    public markAllAsTouched() {
        super.markAllAsTouched();
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    // TODO: Support form group and form array
    public addControl(name: string, control: AbstractControl, options?: { emitEvent?: boolean }) {
        const modelIndex = this._models.findIndex((model) => model.name === name);
        if (modelIndex >= 0) {
            this._models.splice(modelIndex, 1);
        }

        const newModel = this.generateModelFromControl(name, control);
        if (newModel) {
            this._models.push(newModel);
        }

        super.addControl(name, control, options);
    }

    public removeControl(name: string, options?: { emitEvent?: boolean }): void {
        const modelIndex = this._models.findIndex((model) => model.name === name);
        if (modelIndex >= 0) {
            this._models.splice(modelIndex, 1);
        }

        super.removeControl(name, options);
    }

    public addFormGroup(
        name: string,
        formGroup: GeneratedFormGroup<any>,
        options?: { emitEvent?: boolean }
    ): void {
        if (!formGroup.config) {
            throw new NotInitException();
        }

        const modelIndex = this._models.findIndex(
            (model) => model.name === name
        );
        if (modelIndex >= 0) {
            this._models.splice(modelIndex, 1);
        }

        this._models.push({
            instance: formGroup.config.instance,
            name,
            key: name,
            formElementType: "group",
            type: formGroup.config.name ?? formGroup.config.instance.name,
            disabled: formGroup.disabled,
            children: formGroup.config.children,
        } as GroupModel);
        super.addControl(name, formGroup, options);
    }

    private customAsyncValidator(
        controlValidator: ControlAsyncValidators,
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        if (!this.asyncValidators) {
            return of(null);
        }

        const validator = this.asyncValidators.find(
            (x) => controlValidator.name === x.name
        );
        if (!validator) {
            return of(null);
        }

        return validator.validate(control);
    }

    private generateControls(): void {
        for (const control of this._models) {
            let formControl: AbstractControl;
            if (control.formElementType === "array") {
                formControl = new GeneratedFormArray(
                    control as ArrayModel,
                    this.asyncValidators
                );
                (formControl as GeneratedFormArray<T>).setAsyncFormGroupArray(
                    (control as ArrayModel).asyncValidators ?? null
                );
            } else if (control.formElementType === "group") {
                formControl = new GeneratedFormGroup(this.asyncValidators);
                (formControl as GeneratedFormGroup<T>).setConfig(
                    control as GroupModel
                );
            } else {
                formControl = new GeneratedFormControl(
                    control as ControlModel,
                    this.asyncValidators
                );
                (
                    formControl as GeneratedFormControl<any>
                ).setAsyncControlValidators(
                    (control as ControlModel).asyncValidators ?? null
                );
            }
            super.addControl(control.name, formControl);
        }
    }

    private generateModelFromControl(name: string, control: AbstractControl): ControlModel | null {
        if (control instanceof FormControl || control instanceof UntypedFormControl) {
            return {
                name,
                key: name,
                formElementType: "control",
                type: null,
                condition: null,
                updateOn: control.updateOn,
                disabled: control.disabled,
                validators: [],
                asyncValidators: [],
                dynamicValidators: []
            } as ControlModel;
        }

        return null;
    }
}

export class GeneratedFormArray<T>
    extends FormArray
    implements GeneratedControl
{
    private controlValueChanges$?: Observable<[T, number]>;
    private controlValueChangesSub?: Subscription;

    public controls: GeneratedControl[] = [];

    public childValueChanges: EventEmitter<[T, number]> = new EventEmitter<
        [T, number]
    >();

    constructor(
        public readonly model: ArrayModel,
        private asyncValidators: AsyncValidator[] = []
    ) {
        super(model.defaultValue ?? [], [...(model.validators ?? [])]);

        if (model.disabled) {
            this.disable({ emitEvent: false });
        }
    }

    public push(value: unknown | T, options?: { emitEvent?: boolean }): void {
        const control = this.getControl();
        super.push(control, { emitEvent: false });
        this.generateControlValueChanges();
        if (value) {
            control.patchValue(value, options);
        }
    }

    public insert(
        index: number,
        value: unknown | T,
        options?: { emitEvent?: boolean }
    ): void {
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

    public removeAt(index: number, options?: { emitEvent?: boolean }): void {
        super.removeAt(index, options);
        this.generateControlValueChanges();
    }

    public patchValue(
        value: T[],
        options: { onlySelf?: boolean; emitEvent?: boolean } = {}
    ): void {
        if (!value) {
            return;
        }

        let i = 0;
        for (const data of value) {
            if (i >= this.controls.length) {
                this.push(null);
            }
            this.at(i).patchValue(data, {
                onlySelf: true,
                emitEvent: options.emitEvent,
            });
            ++i;
        }

        this.updateValueAndValidity(options);
    }

    public setAsyncFormGroupArray(validators: ControlAsyncValidators[] | null): void {
        if (validators && validators.length) {
            this.setAsyncValidators(
                validators.map((x) => this.customAsyncValidator.bind(this, x))
            );
        }
    }

    public getRawValue(): T[] {
        return this.controls.map((x) => x.getRawValue());
    }

    public getValidValue(): T[] {
        return this.controls.map((x) => x.getValidValue());
    }

    public markAllAsTouched(): void {
        super.markAllAsTouched();
        (this.statusChanges as EventEmitter<string>).emit(this.status);
    }

    private getControl(): AbstractControl {
        if (!this.model.arrayType) {
            throw new Error("No array type defined");
        }

        if (this.model.children) {
            const group = new GeneratedFormGroup(this.asyncValidators);
            const type = this.model.arrayType();
            const children = GroupHandler.getChildren(type);
            group.setConfig({
                ...this.model,
                children,
                instance: type
            });
            return group;
        }

        const formControl = new GeneratedFormControl(
            {
                ...this.model,
                type: this.model.arrayType().name
            },
            this.asyncValidators
        );
        formControl.setAsyncControlValidators(
            (this.model as ControlModel).asyncValidators ?? null
        );
        return formControl;
    }

    private generateControlValueChanges(): void {
        if (this.controlValueChangesSub) {
            this.controlValueChangesSub.unsubscribe();
        }

        this.controlValueChanges$ = merge(
            ...this.controls.map((control, i) =>
                control.valueChanges.pipe(map((x) => [x, i]))
            )
        ) as Observable<[T, number]>;
        this.controlValueChangesSub = this.controlValueChanges$.subscribe((x) =>
            this.childValueChanges.next(x)
        );
    }

    private customAsyncValidator(
        controlValidator: ControlAsyncValidators,
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        if (!this.asyncValidators) {
            return of(null);
        }

        const validator = this.asyncValidators.find(
            (x) => controlValidator.name === x.name
        );
        if (!validator) {
            return of(null);
        }

        return validator.validate(control);
    }
}

export class GeneratedFormControl<T>
    extends FormControl
    implements GeneratedControl
{
    constructor(
        public readonly model: ControlModel,
        private asyncValidators: AsyncValidator[] = []
    ) {
        super(
            {
                value: ValueUtils.useOrComputeValue(model.defaultValue),
                disabled: model.disabled,
            },
            {
                validators: [...(model.validators ?? [])],
                updateOn: model.updateOn,
            }
        );
    }

    public getRawValue(): T | null {
        switch (this.model.type) {
            case "Number":
                if (this.value === null || this.value === undefined) {
                    return this.value;
                }

                if (
                    this.model.validationOption &&
                    this.model.validationOption.ignoreZero &&
                    +this.value === 0
                ) {
                    return null;
                }

                return +this.value as any;
            case "String":
                if (
                    this.model.validationOption &&
                    this.model.validationOption.ignoreEmpty &&
                    this.value === ""
                ) {
                    return null;
                }

                return this.value;
            default:
                return this.value;
        }
    }

    public getValidValue(): T | null {
        if (this.invalid) {
            return null;
        }

        return this.getRawValue();
    }

    public setAsyncControlValidators(
        validators: ControlAsyncValidators[] | null
    ): void {
        if (validators && validators.length) {
            this.setAsyncValidators(
                validators.map((x) => this.customAsyncValidator.bind(this, x))
            );
        }
    }

    public markAllAsTouched(): void {
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

    public updateValueAndValidity(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        depth?: number;
    }): void {
        const depth = opts?.depth ?? 1;
        if (depth <= 1) {
            this.checkDynamicValidators();
        }

        super.updateValueAndValidity(opts);

        if (!this.parent) {
            return;
        }

        const controls: GeneratedFormControl<any>[] = (
            this.parent instanceof GeneratedFormArray
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
                    control.updateValueAndValidity({ depth: depth + 1 });
                }
            }
        }
    }

    private customAsyncValidator(
        controlValidator: ControlAsyncValidators,
        control: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        if (!this.asyncValidators) {
            return of(null);
        }

        const validator = this.asyncValidators.find(
            (x) => controlValidator.name === x.name
        );
        if (!validator) {
            return of(null);
        }

        return validator.validate(control);
    }

    private checkDynamicValidators(): boolean {
        if (!this.model?.dynamicValidators?.length) {
            return false;
        }

        // Use the internal function of implemented by FormGroup.
        const parent = (this.parent as any)?._reduceValue();

        let shouldRevalidate = false;
        for (const validator of this.model.dynamicValidators) {
            const success = validator.condition({
                value: this.value,
                parent,
                control: this,
            });

            if (
                (success && validator.action === "add") ||
                (!success && validator.action === "remove")
            ) {
                for (const fn of validator.validators) {
                    if (!this.hasValidator(fn)) {
                        this.addValidators(fn);
                        shouldRevalidate = true;
                    }
                }
            } else if (
                (success && validator.action === "remove") ||
                (!success && validator.action === "add")
            ) {
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
