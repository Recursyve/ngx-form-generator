import { ValidatorFn } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";

export function AddValidatorIf(condition: (value) => boolean, fn: ValidatorFn | ValidatorFn[]): PropertyDecorator {
    return ValidatorsHandler.setupDynamic({
        action: "add",
        condition,
        validators: Array.isArray(fn) ? fn : [fn]
    });
}
