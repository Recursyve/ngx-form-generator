import { Disabled } from "../../../projects/form-generator/src/lib/decorators/controls/disabled.decorator";
import { Control, Group } from "../../../projects/form-generator/src/public-api";
import { AsyncValidation } from "../validators/async.validator";

export class GroupTestForm {
    @Control()
    test: string;
}

export class TestForm {
    @Control()
    @AsyncValidation()
    test: string;

    @Control()
    @Disabled()
    disabledControl: string;

    @Group()
    group: GroupTestForm;
}
