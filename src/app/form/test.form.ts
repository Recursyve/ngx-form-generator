import { Validators } from "@angular/forms";
import { Array, AddValidatorIf, Control, Disabled, Group, MaxLength, RemoveValidatorIf, Required } from "../../../projects/form-generator/src/public-api";
import { AsyncValidation } from "../validators/async.validator";

export class GroupTestForm {
    @Control()
    @MaxLength(5)
    @AddValidatorIf(({ parent }) => !parent.test2 && !parent.test3, Validators.required)
    test!: string;

    @Control()
    @MaxLength(10)
    @AddValidatorIf(({ parent }) => !parent.test && !parent.test3, Validators.required)
    test2!: string;

    @Control()
    @MaxLength(15)
    @Required()
    @RemoveValidatorIf(({ parent }) => !!parent.test || !!parent.test2, Validators.required)
    test3!: string;
}

export class ArrayTestForm {
    @Control()
    name!: string;
}

class RecursiveTest {
    @Control()
    control1!: string;

    @Array(() => RecursiveTest)
    children!: RecursiveTest[];
}

export class TestForm {
    @Control()
    @AsyncValidation()
    test!: string;

    @Control()
    @Disabled()
    disabledControl!: string;

    @Group()
    group!: GroupTestForm;

    @Array(ArrayTestForm)
    array!: ArrayTestForm[];

    @Array(() => RecursiveTest)
    children!: RecursiveTest[];
}
