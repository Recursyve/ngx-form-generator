import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function arrayMaxLength(max: number, checkNull = true): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value instanceof Array) {
            if (control.value.length <= max) {
                return null;
            }

            return {
                arrayMaxLength: {
                    max,
                    actual: control.value.length
                }
            };
        }

        if (!control.value && checkNull) {
            return {
                arrayMaxLength: {
                    max,
                    actual: null
                }
            };
        }

        return null;
    };
}
