import { Validators } from "@angular/forms";
import { CONTROLS } from "../constant";
import { Control, Group } from "../decorators/controls";
import { Email, MatchesControl, MatchesPattern, Max, MaxLength, Min, MinLength, Required } from "../decorators/validators";
import { ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { ControlHandler } from "./control.handler";

class TestA {
    @Control()
    control1: string;

    @Control({ defaultValue: 10 })
    control2: number;

    @Control({ name: "date" })
    control3: Date;
}

class TestB {
    @Group()
    group1: TestA;

    @Group({
        defaultValue: {
            control1: "test",
            control2: 20,
            control3: null
        }
    })
    group2: TestA;

    @Group({ name: "testGroup" })
    group3: TestA;
}

class TestC {
    @Control()
    @Email()
    @Min(10)
    @Max(10)
    @Required()
    @MinLength(10)
    @MaxLength(10)
    @MatchesControl("group1")
    @MatchesPattern("test")
    control1: string;

    @Control()
    @Email()
    email: string;

    @Control()
    @MatchesControl("email")
    matchesControl: string;

    @Control()
    @MatchesPattern("test")
    matchesPattern: string;

    @Control()
    @Max(10)
    max: number;

    @Control()
    @MaxLength(10)
    maxLength: string;

    @Control()
    @Min(10)
    min: number;

    @Control()
    @MinLength(10)
    minLength: string;

    @Control()
    @Required()
    required: string;
}

describe("Handler Tests", () => {
    describe("Control", () => {
        it("TestA Metadata should contain three controls", () => {
            const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, TestA.prototype);
            expect(controls).toBeDefined();
            expect(controls.length).toBe(3);
        });

        it("TestA control1 Metadata should be valid", () => {
            const control = ControlHandler.getControl(TestA.prototype, "control1");
            expect(control).toBeDefined();
            expect(control.name).toBe("control1");
            expect(control.key).toBe("control1");
            expect(control.type).toBe("String");
        });

        it("TestA control2 Metadata should be valid", () => {
            const control = ControlHandler.getControl(TestA.prototype, "control2");
            expect(control).toBeDefined();
            expect(control.name).toBe("control2");
            expect(control.key).toBe("control2");
            expect(control.type).toBe("Number");
            expect(control.defaultValue).toBe(10);
        });

        it("TestA control3 Metadata should be valid", () => {
            const control = ControlHandler.getControl(TestA.prototype, "control3");
            expect(control).toBeDefined();
            expect(control.name).toBe("date");
            expect(control.key).toBe("control3");
            expect(control.type).toBe("Date");
        });
    });

    describe("Group", () => {
        it("TestB Metadata should contain three controls", () => {
            const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, TestB.prototype);
            expect(controls).toBeDefined();
            expect(controls.length).toBe(3);
        });

        it("TestB group1 Metadata should be valid", () => {
            const control = ControlHandler.getControl(TestB.prototype, "group1") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("group1");
            expect(control.key).toBe("group1");
            expect(control.type).toBe("TestA");
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(3);
        });

        it("TestB control2 Metadata should be valid", () => {
            const control = ControlHandler.getControl(TestB.prototype, "group2") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("group2");
            expect(control.key).toBe("group2");
            expect(control.type).toBe("TestA");
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(3);
            expect(control.defaultValue).toEqual({
                control1: "test",
                control2: 20,
                control3: null
            });
        });

        it("TestB control3 Metadata should be valid", () => {
            const control = ControlHandler.getControl(TestB.prototype, "group3") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("testGroup");
            expect(control.key).toBe("group3");
            expect(control.type).toBe("TestA");
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(3);
        });
    });

    describe("Validators", () => {
        it("TestC Metadata should contain nine controls", () => {
            const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, TestC.prototype);
            expect(controls).toBeDefined();
            expect(controls.length).toBe(9);
        });

        it("TestC control1 Metadata should contains eight validators", () => {
            const control = ControlHandler.getControl(TestC.prototype, "control1");
            expect(control).toBeDefined();
            expect(control.validators).toBeDefined();
            expect(control.validators.length).toBe(8);
        });
    });
});
