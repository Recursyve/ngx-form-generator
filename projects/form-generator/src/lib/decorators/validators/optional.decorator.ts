import { ValidatorsHandler } from "../../handlers/validators.handler";

export function Optional(): PropertyDecorator {
    return ValidatorsHandler.isOptional();
}
