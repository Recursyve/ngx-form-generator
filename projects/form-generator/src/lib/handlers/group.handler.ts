import "reflect-metadata";
import { CONTROL, CONTROLS } from "../constant";
import { GroupConfigModel, GroupModel } from "../models/group.model";

// @dynamic
export class GroupHandler {
    public static setup(config: GroupConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const group: GroupModel = this.generateGroupModel(target, propertyKey, config);
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey as string), group, target);
        };
    }

    public static setupDynamic(config: GroupConfigModel = {}): PropertyDecorator {
        return (target: object, propertyKey: string | symbol) => {
            const group: GroupModel = this.generateGroupModel(target, propertyKey, config);
            group.dynamic = true;
            Reflect.defineMetadata(CONTROL.replace("{name}", propertyKey as string), group, target);
        };
    }

    public static generateGroupModel(target: object, propertyKey: string | symbol, config: GroupConfigModel): GroupModel {
        const group: GroupModel = Reflect.getMetadata(CONTROL.replace("{name}", propertyKey as string), target);
        const controlType = Reflect.getMetadata("design:type", target, propertyKey);
        const children = Reflect.getMetadata(CONTROLS, controlType.prototype) as string[];
        if (!group) {
            const controls: string[] = Reflect.getMetadata(CONTROLS, target) || [];
            controls.push(propertyKey as string);
            Reflect.defineMetadata(CONTROLS, controls, target);
        }
        return {
            ...group,
            instance: controlType,
            name: config.name || propertyKey as string,
            key: propertyKey as string,
            formElementType: "group",
            type: controlType.name,
            disabled: config.disabled ?? group?.disabled,
            defaultValue: config.defaultValue,
            children: children?.map(x => Reflect.getMetadata(CONTROL.replace("{name}", x), controlType.prototype)) ?? []
        };
    }
}
