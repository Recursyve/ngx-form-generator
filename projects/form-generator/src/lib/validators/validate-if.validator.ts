import { AbstractControl } from "@angular/forms";
import { ValidatorConditionCallback, ValidatorConditionFn } from "../models/validation-option.model";

export function validateIf(condition: ValidatorConditionCallback): ValidatorConditionFn {
    return (control: AbstractControl): boolean => {
        // Use the internal function of implemented by FormGroup.
        const parent = (control.parent as any)?._reduceValue();
        return condition({ value: control.value, parent, control });
    };
}
