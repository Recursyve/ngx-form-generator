import { Type } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { ArrayModel } from "./array.model";
import { ControlAsyncValidators, ControlModel } from "./control.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface GroupModel {
    instance: Type<any>;
    name: string;
    key: string;
    type: string;
    formElementType: string;
    children: (ControlModel | GroupModel | ArrayModel)[];
    validators?: ValidatorFn[] | null;
    asyncValidators?: ControlAsyncValidators[] | null;
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
    disabled?: boolean;
    dynamic?: boolean;
}

export interface GroupConfigModel {
    name?: string;
    defaultValue?: any;
    disabled?: boolean;
}
