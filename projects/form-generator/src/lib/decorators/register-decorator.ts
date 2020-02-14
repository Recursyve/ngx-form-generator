import { ValidatorsHandler } from "../handlers/validators.handler";
import { ControlAsyncValidators } from "../models/control.model";

export function registerAsyncValidatorDecorator(validator: ControlAsyncValidators) {
    return ValidatorsHandler.setupAsync(validator);
}
