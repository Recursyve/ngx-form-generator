import { ValidatorFn } from "@angular/forms";
import { ValidationOptionModel } from "./validation-option.model";

export interface ControlAsyncValidators {
    name: string;
}

export interface ControlModel {
    name: string;
    key: string;
    type: string;
    formElementType: string;
    defaultValue?: any;
    validators?: ValidatorFn[];
    asyncValidators?: ControlAsyncValidators[];
    validationOption?: ValidationOptionModel;
}

export interface ControlConfigModel {
    name?: string;
    defaultValue?: any;
}
