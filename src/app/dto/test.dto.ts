import { Control, Group } from "../../../projects/form-generator/src/public-api";

export class GroupTestDto {
    @Control()
    test: string;
}

export class TestDto {
    @Control()
    test: string;

    @Group()
    group: GroupTestDto;
}
