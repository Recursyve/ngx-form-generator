import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { GroupConfigModel, GroupModel } from "../models/group.model";

// @dynamic
export class GroupHandler {
    public static setup(config: GroupConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            let group: GroupModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
            const controlType = Reflect.getMetadata("design:type", target, propertyKey);
            const children = Reflect.getMetadata(CONTROLS, controlType.prototype) as string[];
            if (!group) {
                const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
                controls.push(propertyKey);
                Reflect.defineMetadata(CONTROLS, controls, target);
            }
            group = {
                ...group,
                instance: controlType,
                name: config.name || propertyKey,
                key: propertyKey,
                formElementType: "group",
                type: controlType.name,
                defaultValue: config.defaultValue,
                children: children.map(x => Reflect.getMetadata(CONTROL.replace("{name}", x), controlType.prototype))
            };
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), group, target);
        };
    }
}
