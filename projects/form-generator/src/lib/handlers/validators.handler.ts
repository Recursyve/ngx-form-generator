import "reflect-metadata";
import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { ControlAsyncValidators, ControlModel } from "../models/control.model";
import { validationWrapper } from "../validators/validator-wrapper";
import { ControlHandler } from "./control.handler";

// @dynamic
export class ValidatorsHandler {
    public static setup(fn: ValidatorFn) {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.validators.push(validationWrapper(fn));
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }

    public static setupAsync(validator: ControlAsyncValidators) {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.asyncValidators.push(validator);
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }

    public static isOptional() {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.validationOption = {
                ...(control.validationOption || {}),
                isOptional: true
            };
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }

    public static ignoreZero() {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.validationOption = {
                ...(control.validationOption || {}),
                ignoreZero: true
            };
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }
}
