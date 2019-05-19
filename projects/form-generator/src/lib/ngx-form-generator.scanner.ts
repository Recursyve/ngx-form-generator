import "reflect-metadata";
import { Injectable } from "@angular/core";
import { ControlModel } from "./models/control.model";
import { CONTROLS } from "./constant";

@Injectable()
export class NgxFormGeneratorScanner {
    public getControls(model: any): ControlModel[] {
        return Reflect.getMetadata(CONTROLS, model.prototype);
    }
}
