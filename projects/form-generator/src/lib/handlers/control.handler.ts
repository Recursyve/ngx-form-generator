import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { ControlConfigModel, ControlModel } from "../models/control.model";

// @dynamic
export class ControlHandler {
    public static setup(config: ControlConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let control: ControlModel = this.getControl(target, propertyKey);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            control = {
                ...control,
                name: config.name || propertyKey,
                key: propertyKey,
                type: controlType.name,
                defaultValue: config.defaultValue
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
                type: null,
                validators: []
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
