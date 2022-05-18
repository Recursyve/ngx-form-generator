import "reflect-metadata";
import { ValidatorFn } from "@angular/forms";
import { ControlAsyncValidators, ControlModel } from "../models/control.model";
import { DynamicValidators, ValidatorConditionFn } from "../models/validation-option.model";
import { ControlHandler } from "./control.handler";

// @dynamic
export class ValidatorsHandler {
    public static setupCondition(fn: ValidatorConditionFn) {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.condition = fn;
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }

    public static setup(fn: ValidatorFn) {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.validators.push(fn);
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

    public static setupDynamic(validator: DynamicValidators) {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.dynamicValidators.push(validator);
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

    public static ignoreEmpty() {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.validationOption = {
                ...(control.validationOption || {}),
                ignoreEmpty: true
            };
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }
}
