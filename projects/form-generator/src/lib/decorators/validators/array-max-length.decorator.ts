import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function ArrayMaxLength(max: number, checkNull = true): PropertyDecorator {
    return ValidatorsHandler.setup(validators.arrayMaxLength(max, checkNull));
}
