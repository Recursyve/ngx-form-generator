import { ValidatorFn } from "@angular/forms";
import { DynamicValidators, ValidationOptionModel, ValidatorConditionFn } from "./validation-option.model";

export interface ControlAsyncValidators {
    name: string;
}

export interface ControlModel {
    name: string;
    key: string;
    type: string | null;
    formElementType: string;
    defaultValue?: any;
    condition?: ValidatorConditionFn | null;
    validators?: ValidatorFn[];
    asyncValidators?: ControlAsyncValidators[];
    dynamicValidators?: DynamicValidators[];
    validationOption?: ValidationOptionModel;
    updateOn?: "change" | "blur" | "submit";
    disabled?: boolean;
}

export interface ControlConfigModel {
    name?: string;
    defaultValue?: any;
    updateOn?: "change" | "blur" | "submit";
    disabled?: boolean;
}
