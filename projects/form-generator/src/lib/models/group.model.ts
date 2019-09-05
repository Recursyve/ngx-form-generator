import { ArrayModel } from "./array.model";
import { ControlModel } from "./control.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface GroupModel {
    name: string;
    key: string;
    type: string;
    children: (ControlModel | GroupModel | ArrayModel)[];
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
}

export interface GroupConfigModel {
    name?: string;
    defaultValue?: any;
}
