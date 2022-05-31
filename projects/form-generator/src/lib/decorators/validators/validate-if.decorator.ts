import { ValidatorsHandler } from "../../handlers/validators.handler";
import { ValidatorConditionCallback } from "../../models/validation-option.model";
import * as validators from "../../validators";

export function ValidateIf(condition: ValidatorConditionCallback): PropertyDecorator {
    return ValidatorsHandler.setupCondition(validators.validateIf(condition));
}
