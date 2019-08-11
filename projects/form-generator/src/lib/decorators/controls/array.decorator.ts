import { ArrayHandler } from "../../handlers/array.handler";

export function Array(type: object): PropertyDecorator {
    return ArrayHandler.setup(type as () => void);
}
