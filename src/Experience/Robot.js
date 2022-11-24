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
                type: "toggle",
                regex: /^shoulder/,
                name: "shoulders",
                objects: [],
                speed: 0.002,
                easing: 0.01,
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
                inputName: "buttonB",
            },
            {
                type: "toggle",
                regex: /^upperArm/,
                name: "upperArms",
                objects: [],
                speed: 0.002,
                easing: 0.01,
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
                inputName: "buttonX",
            },
            {
                type: "toggle",
                regex: /^elbow/,
                name: "elbows",
                objects: [],
                speed: 0.002,
                easing: 0.01,
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
                inputName: "buttonA",
            },
            {
                type: "toggle",
                regex: /^forearm/,
                name: "forearms",
                objects: [],
                speed: 0.002,
                easing: 0.01,
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
                inputName: "buttonY",
            },
            {
                type: "pressure",
                regex: /^clamp/,
                name: "clamps",
                objects: [],
                speed: 0.002,
                easing: 0.01,
                value: 0,
                easedValue: 0,
                directionMultiplier: 1,
                inputName: "buttonRT",
            },
        ];

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

        for (const _part of this.model.parts) {
            // Save as property
            this.model[_part.name] = _part;

            if (_part.type === "toggle") {
                // Input pressed event
                this.gamepad.inputs[_part.inputName].on("pressed", () => {
                    _part.directionMultiplier *= -1;
                });
            }
            // } else if(_part.type === "pressure") {
            //     this.gamepad.inputs[_part.inputName].on("pressureChanged", (_index, _name, _pressure) => {
            //         _part.directionMultiplier *= -1;
            //     });
            // }
        }
    }

    update() {
        /**
         * Parts
         */

        for (const _part of this.model.parts) {
            // Update toggle values
            if (_part.type === "toggle") {
                if (this.gamepad.inputs[_part.inputName].pressed) {
                    _part.value +=
                        _part.speed *
                        this.time.delta *
                        _part.directionMultiplier;
                }
            } else if (_part.type === "pressure") {
                _part.value = this.gamepad.inputs[_part.inputName].pressure;
            }

            _part.easedValue +=
                (_part.value - _part.easedValue) *
                _part.easing *
                this.time.delta;

            // Update objects
            for (const _object of _part.objects) {
                _object.rotation[_object.userData.axis] =
                    _part.value * _object.userData.multiplier;
            }
        }
        // console.log(this.gamepad.inputs.buttonRT.pressure);
    }
}
