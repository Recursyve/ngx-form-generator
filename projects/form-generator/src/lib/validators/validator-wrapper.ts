import { ValidationErrors, ValidatorFn } from "@angular/forms";
import { GeneratedControl } from "../forms";

export function validationWrapper(fn: ValidatorFn): ValidatorFn {
    return (control: GeneratedControl): ValidationErrors | null => {
        if (control.shouldValidate()) {
            return fn(control);
        }

        return null;
    };
}
