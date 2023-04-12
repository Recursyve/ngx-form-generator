import { AbstractControl } from "@angular/forms";

export interface GeneratedControl<T> extends AbstractControl<T> {
    getRawValue(): T;
    getValidValue(): T;
    setValue(value: T, options?: any): void;
    patchValue(value: T, options?: any): void;
    reset(value?: T, options?: any): void;
}
