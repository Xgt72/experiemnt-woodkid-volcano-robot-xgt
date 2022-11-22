import * as THREE from "three";
import { gsap } from "gsap";

export default class Robot {
    constructor() {
        this.experience = window.experience;
        this.time = this.experience.time;
        this.config = this.experience.config;
        this.scene = this.experience.scene;
        this.gamepad = this.experience.gamepad;
        this.resources = this.experience.resources;
        this.setModel();
    }

    setModel() {
        this.model = {};

        // Add the model
        this.model.group = this.resources.items.robotModel.scene;
        this.scene.add(this.model.group);

        // Parse the differents parts
        this.model.parts = [
            {
                regex: /^shoulder/,
                name: "shoulders",
                objects: [],
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
            },
            {
                regex: /^upperArm/,
                name: "upperArms",
                objects: [],
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
            },
        ];

        for (const _part of this.model.parts) {
            this.model[_part.name] = _part;
        }

        this.model.group.traverse((_child) => {
            if (_child instanceof THREE.Object3D) {
                const part = this.model.parts.find((_part) =>
                    _child.name.match(_part.regex)
                );

                if (part) {
                    part.objects.push(_child);
                }
            }
        });

        // Shoulders
        this.gamepad.inputs.buttonB.on("pressed", () => {
            this.model.shoulders.directionMultiplier *= -1;
        });

        // Upper arms
        this.gamepad.inputs.buttonA.on("pressed", () => {
            this.model.upperArms.directionMultiplier *= -1;
        });
    }

    update() {
        /**
         * Parts
         */
        // Update shoulders
        if (this.gamepad.inputs.buttonB.pressed) {
            this.model.shoulders.value +=
                0.002 *
                this.time.delta *
                this.model.shoulders.directionMultiplier;
        }
        this.model.shoulders.easedValue +=
            (this.model.shoulders.value - this.model.shoulders.easedValue) *
            0.01 *
            this.time.delta;

        // Update upper arms
        if (this.gamepad.inputs.buttonA.pressed) {
            this.model.upperArms.value +=
                0.002 *
                this.time.delta *
                this.model.upperArms.directionMultiplier;
        }
        this.model.upperArms.easedValue +=
            (this.model.upperArms.value - this.model.upperArms.easedValue) *
            0.01 *
            this.time.delta;

        // Update objects
        for (const _object of this.model.shoulders.objects) {
            _object.rotation[_object.userData.axis] =
                this.model.shoulders.value * _object.userData.multiplier;
        }
        for (const _object of this.model.upperArms.objects) {
            _object.rotation[_object.userData.axis] =
                this.model.upperArms.value * _object.userData.multiplier;
        }
    }
}
