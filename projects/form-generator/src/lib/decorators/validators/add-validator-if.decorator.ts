import { ValidatorFn } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";
import { ValidatorConditionCallback } from "../../models/validation-option.model";

export function AddValidatorIf(condition: ValidatorConditionCallback, fn: ValidatorFn | ValidatorFn[]): PropertyDecorator {
    return ValidatorsHandler.setupDynamic({
        action: "add",
        condition,
        validators: Array.isArray(fn) ? fn : [fn]
    });
}
