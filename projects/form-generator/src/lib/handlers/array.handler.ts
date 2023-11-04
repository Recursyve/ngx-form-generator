import "reflect-metadata";

import { Type } from "@angular/core";
import { CONTROL, CONTROLS } from "../constant";
import { ArrayModel } from "../models/array.model";

// @dynamic
export class ArrayHandler {
    public static setup(typeCallback: () => Type<any>): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const type = typeCallback();

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
                arrayType: typeCallback,
                children: children ?? null
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey as string), array, target);
        };
    }
}
