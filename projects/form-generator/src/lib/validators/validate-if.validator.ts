import { AbstractControl } from "@angular/forms";
import { ValidatorConditionFn } from "../models/validation-option.model";

export function validateIf(condition: (value) => boolean, { root } = { root: false }): ValidatorConditionFn {
    return (control: AbstractControl): boolean => {
        const value = root ? control.root.value : control.parent.value;
        return condition(value);
    };
}
