import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { GroupConfigModel, GroupModel } from "../models/group.model";

// @dynamic
export class GroupHandler {
    public static setup(config: GroupConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let group: GroupModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            if (!group) {
                const children = Reflect.getMetadata(CONTROLS, controlType.prototype) as string[];
                group = {
                    name: null,
                    key: null,
                    type: null,
                    children: children.map(x => Reflect.getMetadata(CONTROL.replace("{name}", x), target))
                };
                const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(propertyKey);
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
