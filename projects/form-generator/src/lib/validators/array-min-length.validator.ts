import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function arrayMinLength(min: number, checkNull = true): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value instanceof Array) {
            if (control.value.length >= min) {
                return null;
            }

            return {
                arrayMinLength: {
                    min,
                    actual: control.value.length
                }
            };
        }

        if (!control.value && checkNull) {
            return {
                arrayMinLength: {
                    min,
                    actual: control.value.length
                }
            };
        }

        return null;
    };
}
