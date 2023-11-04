import { Type } from "@angular/core";
import { ArrayHandler } from "../../handlers/array.handler";

/**
 * @deprecated
 */
export function Array(type: Type<any>): PropertyDecorator;

// tslint:disable-next-line:unified-signatures
export function Array(type: () => Type<any>): PropertyDecorator;

export function Array(type: Type<any> | (() => Type<any>)): PropertyDecorator {
    const isType = (t: Type<any> | (() => Type<any>)): t is Type<any> => {
        return !!t.prototype;
    };

    const callback = isType(type) ? () => type as Type<any> : type;
    return ArrayHandler.setup(callback);
}
