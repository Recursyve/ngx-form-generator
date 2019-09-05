import { ControlModel } from "./control.model";
import { GroupModel } from "./group.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface ArrayModel {
    name: string;
    key: string;
    type: string;
    arrayType?: object;
    children: (ControlModel | GroupModel | ArrayModel)[];
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
}
