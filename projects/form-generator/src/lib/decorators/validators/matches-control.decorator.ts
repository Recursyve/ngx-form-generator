import { ValidatorsHandler } from "../../handlers/validators.handler";
import * as validators from "../../validators";

export function MatchesControl(controlName: string): PropertyDecorator {
    return ValidatorsHandler.setup(validators.matches(controlName));
}
