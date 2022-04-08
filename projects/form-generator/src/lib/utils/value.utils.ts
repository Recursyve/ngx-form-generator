export class ValueUtils {
    public static useOrComputeValue(value: any): any {
        if (typeof value === "function") {
            return value();
        }

        return value;
    }
}
