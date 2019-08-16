import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { ArrayModel } from "../models/array.model";

// @dynamic
export class ArrayHandler {
    public static setup(type: () => void): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let array: ArrayModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            const children = Reflect.getMetadata(CONTROLS, type.prototype) as string[];
            if (!array) {
                const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(propertyKey);
                Reflect.defineMetadata(CONTROLS, controls, target);
            }
            array = {
                name: propertyKey,
                key: propertyKey,
                type: controlType.name,
                arrayType: type,
                children: children ? children.map(x => Reflect.getMetadata(CONTROL.replace("{name}", x), type.prototype)) : null
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), array, target);
        };
    }
}
