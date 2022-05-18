import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function ValidateIf(condition: (value) => boolean, { root } = { root: false }): PropertyDecorator {
    return ValidatorsHandler.setupCondition(validators.validateIf(condition, { root }));
}
