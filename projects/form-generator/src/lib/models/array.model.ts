import { ControlModel } from "./control.model";
import { GroupModel } from "./group.model";

export interface ArrayModel {
    name: string;
    key: string;
    type: string;
    arrayType?: object;
    children: (ControlModel | GroupModel | ArrayModel)[];
    defaultValue?: any;
}
