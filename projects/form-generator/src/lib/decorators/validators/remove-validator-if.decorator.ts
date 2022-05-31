import { ValidatorFn } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";
import { ValidatorConditionCallback } from "../../models/validation-option.model";

export function RemoveValidatorIf(condition: ValidatorConditionCallback, fn: ValidatorFn | ValidatorFn[]): PropertyDecorator {
    return ValidatorsHandler.setupDynamic({
        action: "remove",
        condition,
        validators: Array.isArray(fn) ? fn : [fn]
    });
}
