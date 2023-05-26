import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { GroupConfigModel, GroupModel } from "../models/group.model";

// @dynamic
export class GroupHandler {
    public static setup(config: GroupConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string) => {
            const group: GroupModel = this.generateGroupModel(target, propertyKey, config);
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), group, target);
        };
    }

    public static setupDynamic(config: GroupConfigModel = {}) {
        return (target: object, propertyKey: string) => {
            const group: GroupModel = this.generateGroupModel(target, propertyKey, config);
            group.dynamic = true;
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey), group, target);
        };
    }

    public static generateGroupModel(target: object, propertyKey: string, config: GroupConfigModel): GroupModel {
        const group: GroupModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey), target);
        const controlType = Reflect.getMetadata("design:type", target, propertyKey);
        const children = Reflect.getMetadata(CONTROLS, controlType.prototype) as string[];
        if (!group) {
            const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
            controls.push(propertyKey);
            Reflect.defineMetadata(CONTROLS, controls, target);
        }
        return {
            ...group,
            instance: controlType,
            name: config.name || propertyKey,
            key: propertyKey,
            formElementType: "group",
            type: controlType.name,
            disabled: config.disabled ?? group?.disabled,
            defaultValue: config.defaultValue,
            children: children?.map(x => Reflect.getMetadata(CONTROL.replace("{name}", x), controlType.prototype)) ?? []
        };
    }
}
