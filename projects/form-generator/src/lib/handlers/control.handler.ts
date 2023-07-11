import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { ControlConfigModel, ControlModel } from "../models/control.model";

// @dynamic
export class ControlHandler {
    public static setup(config: ControlConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const control: Partial<ControlModel> = this.getOrCreateControl(target, propertyKey as string);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            const updatedControl = {
                ...control,
                name: config.name || propertyKey as string,
                key: propertyKey as string,
                type: controlType.name,
                defaultValue: config.defaultValue,
                updateOn: config.updateOn ?? control.updateOn,
                disabled: config.disabled ?? control.disabled
            } as ControlModel;
            this.saveControl(updatedControl, target, propertyKey as string);
        };
    }

    public static getOrCreateControl(target: object, propertyKey: string): Partial<ControlModel> {
        let control: Partial<ControlModel> = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
        if (!control) {
            control = {
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

    public static saveControl(control: Partial<ControlModel>, target: object, propertyKey: string) {
        Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), control, target);
    }
}
