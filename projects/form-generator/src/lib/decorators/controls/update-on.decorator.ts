import { ControlHandler,  } from "../../handlers/control.handler";
import { ControlConfigModel } from "../../models/control.model";

export function UpdateOn(updateOn: "change" | "blur" | "submit"): PropertyDecorator {
    return ControlHandler.setup({
        updateOn
    });
}
