import { Type } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { ControlAsyncValidators } from "./control.model";
import { ValidationOptionModel } from "./validation-option.model";

export interface ArrayModel {
    name: string;
    key: string;
    type: string;
    formElementType: string;
    arrayType?: () => Type<any>;
    children?: string[] | null;
    validators?: ValidatorFn[];
    asyncValidators?: ControlAsyncValidators[];
    validationOption?: ValidationOptionModel;
    defaultValue?: any;
    disabled?: boolean;
}
