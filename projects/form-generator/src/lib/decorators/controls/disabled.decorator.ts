import { ControlHandler, } from "../../handlers/control.handler";

export function Disabled(): PropertyDecorator {
    return ControlHandler.setup({
        disabled: true
    });
}
