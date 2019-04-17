import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { GroupConfigModel, GroupModel } from "../models/group.model";

export class GroupHandler {
    public static setup(config: GroupConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let group: GroupModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            if (!group) {
                const children = Reflect.getMetadata(CONTROLS, controlType.prototype);
                group = {
                    name: null,
                    key: null,
                    type: null,
                    children
                };
                const controls: GroupModel[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(group);
                Reflect.defineMetadata(CONTROLS, controls, target);
            }
            group = {
                ...group,
                name: config.name || propertyKey,
                key: propertyKey,
                type: controlType.name,
                defaultValue: config.defaultValue
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), group, target);
        };
    }
}
