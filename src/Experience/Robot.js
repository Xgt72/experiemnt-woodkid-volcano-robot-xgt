import * as THREE from "three";
import { gsap } from "gsap";

export default class Robot {
    constructor() {
        this.experience = window.experience;
        this.config = this.experience.config;
        this.scene = this.experience.scene;
        this.gamepad = this.experience.gamepad;
        this.resources = this.experience.resources;

        console.log(this.resources.items.robotModel);

        // this.resources.items.lennaTexture.encoding = THREE.sRGBEncoding;
        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
            // new THREE.MeshBasicMaterial({ map: this.resources.items.lennaTexture })
        );
        this.scene.add(this.cube);

        this.gamepad.inputs.buttonB.on("pressed", () => {
            gsap.to(this.cube.position, { y: "+=1" });
        });
        this.gamepad.inputs.buttonA.on("pressed", () => {
            gsap.to(this.cube.position, { y: "-=1" });
        });
    }

    update() {
        this.cube.rotation.y = this.gamepad.inputs.joystickLeft.rotation;
        this.cube.rotation.x = this.gamepad.inputs.joystickRight.rotation;
    }
}
