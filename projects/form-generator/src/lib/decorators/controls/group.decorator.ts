import { GroupHandler } from "../../handlers/group.handler";
import { GroupConfigModel } from "../../models/group.model";

export function Group(config?: GroupConfigModel): PropertyDecorator {
    return GroupHandler.setup(config);
}
