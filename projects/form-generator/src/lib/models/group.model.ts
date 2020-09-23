import { ArrayModel } from "./array.model";
import { ControlModel } from "./control.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface GroupModel {
    instance: any;
    name: string;
    key: string;
    type: string;
    formElementType: string;
    children: (ControlModel | GroupModel | ArrayModel)[];
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
}

export interface GroupConfigModel {
    name?: string;
    defaultValue?: any;
}
