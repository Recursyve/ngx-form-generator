import { AbstractControl } from "@angular/forms";

export interface GeneratedControl<T> extends AbstractControl<T> {
    getRawValue(): any;
    getValidValue(): any;
}
