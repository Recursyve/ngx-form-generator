import { ValidatorFn } from "@angular/forms";
import { ControlModel } from "./control.model";
import { GroupModel } from "./group.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface ArrayModel {
    name: string;
    key: string;
    type: string;
    formElementType: string;
    arrayType?: object;
    children: (ControlModel | GroupModel | ArrayModel)[];
    validators?: ValidatorFn[];
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
}
