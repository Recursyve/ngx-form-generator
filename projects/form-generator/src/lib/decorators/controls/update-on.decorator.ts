import { ControlHandler, } from "../../handlers/control.handler";

export function UpdateOn(updateOn: "change" | "blur" | "submit"): PropertyDecorator & ClassDecorator {
    return ControlHandler.setupUpdateOn(updateOn);
}
