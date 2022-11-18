import * as THREE from "three";
import Robot from "./Robot";

export default class World {
    constructor(_options) {
        this.experience = window.experience;
        this.config = this.experience.config;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.gamepad = this.experience.gamepad;

        this.resources.on("groupEnd", (_group) => {
            if (_group.name === "base") {
                // this.setDummy();
                this.setRobot();
            }
        });
    }

    setRobot() {
        this.robot = new Robot();
    }

    resize() {}

    update() {
        if (this.robot) {
            this.robot.update();
        }
    }

    destroy() {}
}
