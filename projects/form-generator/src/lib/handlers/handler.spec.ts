import { CONTROLS } from "../constant";
import { Array, Control, Group } from "../decorators/controls";
import {
    Email,
    MatchesControl,
    MatchesPattern,
    Max,
    MaxLength,
    Min,
    MinLength,
    Required,
    ValueIs
} from "../decorators/validators";
import { ControlModel } from "../models/control.model";
import { GroupModel } from "../models/group.model";
import { ControlHandler } from "./control.handler";

class TestA {
    @Control()
    control1!: string;

    @Control({ defaultValue: 10 })
    control2!: number;

    @Control({ name: "date" })
    control3!: Date;

    @Control({ defaultValue: () => 10 })
    control4!: number;
}

class TestB {
    @Group()
    @Required()
    group1!: TestA;

    @Group({
        defaultValue: {
            control1: "test",
            control2: 20,
            control3: null,
            control4: () => 20
        }
    })
    group2!: TestA;

    @Group({ name: "testGroup" })
    group3!: TestA;
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
    control1!: string;

    @Control()
    @Email()
    email!: string;

    @Control()
    @MatchesControl("email")
    matchesControl!: string;

    @Control()
    @MatchesPattern("test")
    matchesPattern!: string;

    @Control()
    @Max(10)
    max!: number;

    @Control()
    @MaxLength(10)
    maxLength!: string;

    @Control()
    @Min(10)
    min!: number;

    @Control()
    @MinLength(10)
    minLength!: string;

    @Control()
    @Required()
    required!: string;

    @Control()
    @ValueIs(true)
    valueIs!: boolean;

    @Array(Number)
    @Required()
    reqArr!: boolean[];
}

describe("Handler Tests", () => {
    describe("Control", () => {
        it("TestA Metadata should contain four controls", () => {
            const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, TestA.prototype);
            expect(controls).toBeDefined();
            expect(controls.length).toBe(4);
        });

        it("TestA control1 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestA.prototype, "control1");
            expect(control).toBeDefined();
            expect(control.name).toBe("control1");
            expect(control.key).toBe("control1");
            expect(control.type).toBe("String");
        });

        it("TestA control2 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestA.prototype, "control2");
            expect(control).toBeDefined();
            expect(control.name).toBe("control2");
            expect(control.key).toBe("control2");
            expect(control.type).toBe("Number");
            expect(control.defaultValue).toBe(10);
        });

        it("TestA control3 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestA.prototype, "control3");
            expect(control).toBeDefined();
            expect(control.name).toBe("date");
            expect(control.key).toBe("control3");
            expect(control.type).toBe("Date");
        });

        it ("TestA control4 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestA.prototype, "control4");
            expect(control).toBeDefined();
            expect(control.name).toBe("control4");
            expect(control.key).toBe("control4");
            expect(control.type).toBe("Number");
            expect(typeof control.defaultValue).toBe("function");
            expect(control.defaultValue()).toBe(10);
        });
    });

    describe("Group", () => {
        it("TestB Metadata should contain four controls", () => {
            const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, TestB.prototype);
            expect(controls).toBeDefined();
            expect(controls.length).toBe(4);
        });

        it("TestB group1 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestB.prototype, "group1") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("group1");
            expect(control.key).toBe("group1");
            expect(control.type).toBe("TestA");
            expect(control.validators?.length).toBe(1);
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(4);
        });

        it("TestB control2 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestB.prototype, "group2") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("group2");
            expect(control.key).toBe("group2");
            expect(control.type).toBe("TestA");
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(4);
            expect(control.defaultValue).toEqual({
                control1: "test",
                control2: 20,
                control3: null
            });
        });

        it("TestB control3 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestB.prototype, "group3") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("testGroup");
            expect(control.key).toBe("group3");
            expect(control.type).toBe("TestA");
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(4);
        });

        it("TestB control4 Metadata should be valid", () => {
            const control = ControlHandler.getOrCreateControl(TestB.prototype, "group2") as GroupModel;
            expect(control).toBeDefined();
            expect(control.name).toBe("group2");
            expect(control.key).toBe("group2");
            expect(control.type).toBe("TestA");
            expect(control.children).toBeDefined();
            expect(control.children.length).toBe(4);
            expect(control.defaultValue).toEqual({
                control1: "test",
                control2: 20,
                control3: null,
                control4: () => 20
            });
        });
    });

    describe("Validators", () => {
        it("TestC Metadata should contain ten controls", () => {
            const controls: ControlModel[] = Reflect.getMetadata(CONTROLS, TestC.prototype);
            expect(controls).toBeDefined();
            expect(controls.length).toBe(10);
        });

        it("TestC control1 Metadata should contains eight validators", () => {
            const control = ControlHandler.getOrCreateControl(TestC.prototype, "control1");
            expect(control).toBeDefined();
            expect(control.validators).toBeDefined();
            expect(control.validators?.length).toBe(8);
        });

        it("TestC reqArr Metadata should contains one validators", () => {
            const control = ControlHandler.getOrCreateControl(TestC.prototype, "reqArr");
            expect(control).toBeDefined();
            expect(control.validators).toBeDefined();
            expect(control.validators?.length).toBe(1);
        });
    });
});
