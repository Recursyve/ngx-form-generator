import { ValidationErrors } from "@angular/forms";
import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function CustomPattern(regex: RegExp, error: ValidationErrors): PropertyDecorator {
    return ValidatorsHandler.setup(validators.customPattern(regex, error));
}
