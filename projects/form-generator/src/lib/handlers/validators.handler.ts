import "reflect-metadata";
import { ValidatorFn } from "@angular/forms";
import { ControlModel } from "../models/control.model";
import { ControlHandler } from "./control.handler";

export class ValidatorsHandler {
    public static setup(fn: ValidatorFn) {
        return (target: object, propertyKey: string) => {
            const control: ControlModel = ControlHandler.getControl(target, propertyKey);
            control.validators.push(fn);
            ControlHandler.saveControl(control, target, propertyKey);
        };
    }
}
