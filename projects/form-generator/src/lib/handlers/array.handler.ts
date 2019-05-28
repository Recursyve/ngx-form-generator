import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { ArrayModel } from "../models/array.model";
import { GroupConfigModel, GroupModel } from "../models/group.model";

export class ArrayHandler {
    public static setup(type?: () => void): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let array: ArrayModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            if (!array) {
                const children = type ? Reflect.getMetadata(CONTROLS, type.prototype) : null;
                array = {
                    name: null,
                    key: null,
                    type: null,
                    children
                };
                const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(propertyKey);
                Reflect.defineMetadata(CONTROLS, controls, target);
            }
            array = {
                ...array,
                name: array.name || propertyKey,
                key: propertyKey,
                type: controlType.name,
                arrayType: type,
                defaultValue: array.defaultValue
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), array, target);
        };
    }
}
