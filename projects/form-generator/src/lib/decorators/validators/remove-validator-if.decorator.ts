import { ValidatorFn } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function RemoveValidatorIf(condition: (value) => boolean, fn: ValidatorFn | ValidatorFn[]): PropertyDecorator {
    return ValidatorsHandler.setupDynamic({
        action: "remove",
        condition,
        validators: Array.isArray(fn) ? fn : [fn]
    });
}
