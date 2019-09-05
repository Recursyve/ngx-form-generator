import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matches(otherControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent || !control.parent.controls[otherControlName]) {
            return null;
        }
        const error = `${otherControlName}_mismatch`;
        return control.parent.controls[otherControlName].value === control.value ? null : { [error]: true };
    };
}
