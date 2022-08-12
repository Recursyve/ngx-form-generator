import "reflect-metadata";
import { ControlModel } from "./models/control.model";
import { CONTROL, CONTROLS, UPDATE_ON } from "./constant";

export class NgxFormGeneratorScanner {
    public static getUpdateOn(model: any): "change" | "blur" | "submit" {
        return Reflect.getMetadata(UPDATE_ON, model);
    }

    public static getControls(model: any): ControlModel[] {
        const controls = Reflect.getMetadata(CONTROLS, model.prototype) as string[];
        return controls.map(x => this.getControl(x, model));
    }

    public static getControl(name: string, model: any): ControlModel {
        return Reflect.getMetadata(CONTROL.replace("{name}", name), model.prototype);
    }
}
