import "reflect-metadata";
import { ValidatorFn } from "@angular/forms";
import { ControlAsyncValidators } from "../models/control.model";
import { DynamicValidators, ValidatorConditionFn } from "../models/validation-option.model";
import { ControlHandler } from "./control.handler";

// @dynamic
export class ValidatorsHandler {
    public static setupCondition(fn: ValidatorConditionFn): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control = ControlHandler.getOrCreateControl(target, propertyKey as string);
            control.condition = fn;
            ControlHandler.saveControl(control, target, propertyKey as string);
        };
    }

    public static setup(fn: ValidatorFn): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control = ControlHandler.getOrCreateControl(target, propertyKey as string);
            if (!control.validators) {
                control.validators = [];
            }

            control.validators.push(fn);
            ControlHandler.saveControl(control, target, propertyKey as string);
        };
    }

    public static setupAsync(validator: ControlAsyncValidators): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control = ControlHandler.getOrCreateControl(target, propertyKey as string);
            if (!control.asyncValidators) {
                control.asyncValidators = [];
            }

            control.asyncValidators.push(validator);
            ControlHandler.saveControl(control, target, propertyKey as string);
        };
    }

    public static setupDynamic(validator: DynamicValidators): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control = ControlHandler.getOrCreateControl(target, propertyKey as string);
            if (!control.dynamicValidators) {
                control.dynamicValidators = [];
            }

            control.dynamicValidators.push(validator);
            ControlHandler.saveControl(control, target, propertyKey as string);
        };
    }

    public static ignoreZero(): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control = ControlHandler.getOrCreateControl(target, propertyKey as string);
            control.validationOption = {
                ...(control.validationOption || {}),
                ignoreZero: true
            };
            ControlHandler.saveControl(control, target, propertyKey as string);
        };
    }

    public static ignoreEmpty(): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control = ControlHandler.getOrCreateControl(target, propertyKey as string);
            control.validationOption = {
                ...(control.validationOption || {}),
                ignoreEmpty: true
            };
            ControlHandler.saveControl(control, target, propertyKey as string);
        };
    }
}
