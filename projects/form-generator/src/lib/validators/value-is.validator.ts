import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function valueIs(expected: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const actual = control.value;
        if (actual === null || actual === undefined) {
            return null; // Don't validate null values to allow optional controls.
        }

        return actual !== expected ? { valueIs: { actual, expected } } : null;
    }
}
