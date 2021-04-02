import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function ArrayMinLength(min: number, checkNull = true): PropertyDecorator {
    return ValidatorsHandler.setup(validators.arrayMinLength(min, checkNull));
}
