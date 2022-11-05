import EventEmitter from "../Utils/EventEmitter.js";
import GamepadButton from "./GamepadButton.js";

export default class Gamepad extends EventEmitter {
    constructor() {
        super();

        // Setup
        this.connected = false;

        this.setMapping();
        this.setConnection();
        this.setButtons();
    }

    setMapping() {
        this.mapping = {};
        this.mapping.buttons = {};
    }

    setConnection() {
        // Connected event
        window.addEventListener("gamepadconnected", (_event) => {
            this.connected = true;
        });

        // Disconnected event
        window.addEventListener("gamepaddisconnected", (_event) => {
            this.connected = false;
        });
    }
    setButtons() {
        this.gamepadButton = new GamepadButton(1, "B");

        this.gamepadButton.on("pressed", (_index, _name) => {
            console.log("Ah", _index, _name);
        });
        this.gamepadButton.on("unpressed", (_index, _name) => {
            console.log("Oh", _index, _name);
        });
    }

    update() {
        // No gamepad connected
        if (!this.connected) return;

        const instanceState = navigator.getGamepads()[0];

        this.gamepadButton.update(instanceState);

        // instanceState.buttons.forEach((_button, _index) => {
        //     if (_button.pressed) {
        //         console.log(_index, _button);
        //     }
        // });
    }
}
