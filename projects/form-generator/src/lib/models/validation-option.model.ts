import { AbstractControl, ValidatorFn } from "@angular/forms";

export type ValidatorConditionFn = (control: AbstractControl) => boolean;

export interface DynamicValidators {
    action: "add" | "remove";
    condition: ({ value, parent, control }: { value: any; parent?: any; control?: AbstractControl }) => boolean;
    validators: ValidatorFn[];
}

export interface ValidationOptionModel {
    ignoreZero?: boolean;
    ignoreEmpty?: boolean;
}
