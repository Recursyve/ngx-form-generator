import { GroupHandler } from "../../handlers/group.handler";
import { GroupConfigModel } from "../../models/group.model";

export function DynamicGroup(config?: GroupConfigModel): PropertyDecorator {
    return GroupHandler.setupDynamic(config);
}
