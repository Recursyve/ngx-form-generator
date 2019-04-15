import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { ControlConfigModel, ControlModel } from "../models/control.model";

export class ControlHandler {
    public static setup(config: ControlConfigModel = {}) {
        return (target: object, propertyKey: string) => {
            let control: ControlModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            if (!control) {
                control = {
                    name: null,
                    key: null,
                    type: null,
                    validators: []
                };
                const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(control);
                Reflect.defineMetadata(CONTROLS, controls, target);
            }
            control = {
                ...control,
                name: config.name || propertyKey,
                key: propertyKey,
                type: controlType.name,
                defaultValue: config.defaultValue
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), control, target);
        };
    }
}
