import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function ValueIs(expected: any): PropertyDecorator {
    return ValidatorsHandler.setup(validators.valueIs(expected));
}
