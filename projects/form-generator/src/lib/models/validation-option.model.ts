import { AbstractControl, ValidatorFn } from "@angular/forms";

export type ValidatorConditionCallback = ({ value, parent, control }: { value: any; parent?: any; control?: AbstractControl }) => boolean;

export type ValidatorConditionFn = (control: AbstractControl) => boolean;

export interface DynamicValidators {
    action: "add" | "remove";
    condition: ValidatorConditionCallback;
    validators: ValidatorFn[];
}

export interface ValidationOptionModel {
    ignoreZero?: boolean;
    ignoreEmpty?: boolean;
}
