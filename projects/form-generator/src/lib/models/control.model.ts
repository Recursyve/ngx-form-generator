import { ValidatorFn } from "@angular/forms";

export interface ControlModel {
    name: string;
    key: string;
    type: string;
    defaultValue?: any;
    validators?: ValidatorFn[];
}

export interface ControlConfigModel {
    name?: string;
    defaultValue?: any;
}
