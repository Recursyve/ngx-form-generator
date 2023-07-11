import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matches(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const otherControl = control.parent?.get(otherControlName);
        if (!otherControl) {
            return null;
        }
        const error = `${otherControlName}_mismatch`;
        return otherControl.value === control.value ? null : { [error]: true };
    };
}
