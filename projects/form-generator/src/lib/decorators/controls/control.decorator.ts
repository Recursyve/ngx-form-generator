import { ControlHandler,  } from "../../handlers/control.handler";
import { ControlConfigModel } from "../../models/control.model";

export function Control(config?: ControlConfigModel): PropertyDecorator {
    return ControlHandler.setup(config);
}
