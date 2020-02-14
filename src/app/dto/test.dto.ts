import { Control, Group } from "@recursyve/ngx-form-generator";
import { AsyncValidation } from "../validators/async.validator";

export class GroupTestDto {
    @Control()
    test: string;
}

export class TestDto {
    @Control()
    @AsyncValidation()
    test: string;

    @Group()
    group: GroupTestDto;
}
