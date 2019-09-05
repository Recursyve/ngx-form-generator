import { ValidatorsHandler } from "../../handlers/validators.handler";

export function IgnoreZero(): PropertyDecorator {
    return ValidatorsHandler.ignoreZero();
}
