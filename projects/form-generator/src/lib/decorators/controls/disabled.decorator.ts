import { ControlHandler,  } from "../../handlers/control.handler";
import { ControlConfigModel } from "../../models/control.model";

export function Disabled(): PropertyDecorator {
    return ControlHandler.setup({
        disabled: true
    });
}
