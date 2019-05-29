import "reflect-metadata";
import { Injectable } from "@angular/core";
import { ControlModel } from "./models/control.model";
import { CONTROL, CONTROLS } from "./constant";

@Injectable()
export class NgxFormGeneratorScanner {
    public getControls(model: any): ControlModel[] {
        const controls = Reflect.getMetadata(CONTROLS, model.prototype) as string[];
        return controls.map(x => this.getControl(x, model));
    }

    public getControl(name: string, model: any): ControlModel {
        return Reflect.getMetadata(CONTROL.replace("{name}", name), model.prototype);
    }
}
