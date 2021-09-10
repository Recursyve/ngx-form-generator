import { ValidatorsHandler } from "../../handlers/validators.handler";

export function IgnoreEmpty(): PropertyDecorator {
    return ValidatorsHandler.ignoreEmpty();
}
