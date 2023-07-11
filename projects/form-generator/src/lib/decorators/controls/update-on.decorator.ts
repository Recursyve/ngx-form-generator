import { ControlHandler, } from "../../handlers/control.handler";

export function UpdateOn(updateOn: "change" | "blur" | "submit"): PropertyDecorator {
    return ControlHandler.setup({
        updateOn
    });
}
