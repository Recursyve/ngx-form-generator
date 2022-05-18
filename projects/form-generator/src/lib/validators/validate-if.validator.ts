import { AbstractControl } from "@angular/forms";
import { ValidatorConditionFn } from "../models/validation-option.model";

export function validateIf(
    condition: ({ value, parent, control }: { value: any; parent?: any; control?: AbstractControl }) => boolean
): ValidatorConditionFn {
    return (control: AbstractControl): boolean => {
        return condition({ value: control.value, parent: control.parent.value, control });
    };
}
