import { AbstractControl } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function ValidateIf(
    condition: ({ value, parent, control }: { value: any; parent?: any; control?: AbstractControl }) => boolean
): PropertyDecorator {
    return ValidatorsHandler.setupCondition(validators.validateIf(condition));
}
