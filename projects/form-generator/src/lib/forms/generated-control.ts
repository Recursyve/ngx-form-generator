import { AbstractControl } from "@angular/forms";

export interface GeneratedControl extends AbstractControl {
    getRawValue(): any;
    getValidValue(): any;
    shouldValidate(): boolean;
}
