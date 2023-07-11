import { ValidatorFn } from "@angular/forms";
import { ControlAsyncValidators, ControlModel } from "./control.model";
import { GroupModel } from "./group.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface ArrayModel {
    name: string;
    key: string;
    type: string;
    formElementType: string;
    arrayType?: object;
    children?: (ControlModel | GroupModel | ArrayModel)[] | null;
    validators?: ValidatorFn[];
    asyncValidators?: ControlAsyncValidators[];
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
    disabled?: boolean;
}
