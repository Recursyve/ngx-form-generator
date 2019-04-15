import { ControlModel } from "./control.model";

export interface GroupModel {
    name: string;
    key: string;
    type: string;
    children: (ControlModel | GroupModel)[];
    defaultValue?: any;
}

export interface GroupConfigModel {
    name?: string;
    defaultValue?: any;
}
