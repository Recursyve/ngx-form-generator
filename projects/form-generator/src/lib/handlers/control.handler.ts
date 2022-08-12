import "reflect-metadata";
import { CONTROL, CONTROLS, UPDATE_ON } from "../constant";
import { ControlConfigModel, ControlModel } from "../models/control.model";

// @dynamic
export class ControlHandler {
    public static setupUpdateOn(updateOn: "change" | "blur" | "submit"): PropertyDecorator & ClassDecorator {
        return (target: object, propertyKey?: string) => {
            if (!propertyKey) {
                Reflect.defineMetadata(UPDATE_ON, updateOn, target);
                return;
            }

            this.setup({ updateOn })(target, propertyKey);
        };
    }

    public static setup(config: ControlConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let control: ControlModel = this.getControl(target, propertyKey);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            control = {
                ...control,
                name: config.name || propertyKey,
                key: propertyKey,
                type: controlType.name,
                defaultValue: config.defaultValue,
                updateOn: config.updateOn ?? control.updateOn,
                disabled: config.disabled ?? control.disabled
            };
            this.saveControl(control, target, propertyKey);
        };
    }

    public static getControl(target: object, propertyKey: string): ControlModel {
        let control: ControlModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
        if (!control) {
            control = {
                name: null,
                key: null,
                formElementType: "control",
                type: null,
                condition: null,
                validators: [],
                asyncValidators: [],
                dynamicValidators: []
            };
            const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
            controls.push(propertyKey);
            Reflect.defineMetadata(CONTROLS, controls, target);
        }

        return control;
    }

    public static saveControl(control: ControlModel, target: object, propertyKey: string) {
        Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), control, target);
    }
}
