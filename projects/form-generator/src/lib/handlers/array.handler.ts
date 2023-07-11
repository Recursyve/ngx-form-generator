import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { ArrayModel } from "../models/array.model";

// @dynamic
export class ArrayHandler {
    public static setup(type: () => void): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            let array: ArrayModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey as string), target);
            const children = Reflect.getMetadata(CONTROLS, type.prototype) as string[];
            if (!array) {
                const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(propertyKey as string);
                Reflect.defineMetadata(CONTROLS, controls, target);
            }
            array = {
                name: propertyKey as string,
                key: propertyKey as string,
                formElementType: "array",
                type: "Array",
                validators: array?.validators ?? [],
                disabled: array?.disabled,
                defaultValue: array?.defaultValue,
                arrayType: type,
                children: children?.map(x => Reflect.getMetadata(CONTROL.replace("{name}", x), type.prototype))
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey as string), array, target);
        };
    }
}
