import EventEmitter from "../Utils/EventEmitter";
import GamepadButton from "./GamepadButton";
import GamepadJoystick from "./GamepadJoystick";
import GamepadInterface from "./GamepadInterface";

export default class Gamepad extends EventEmitter {
    constructor() {
        super();

        // Setup
        this.connected = false;

        this.setConnection();
        this.setInputs();
        this.setInterface();
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

    setInputs() {
        this.inputs = {};
        /**
         * Buttons
         */
        this.inputs.all = [
            /**
             * Buttons
             */
            // Left buttons
            new GamepadButton(0, "buttonA"),
            new GamepadButton(1, "buttonB"),
            new GamepadButton(2, "buttonX"),
            new GamepadButton(3, "buttonY"),
            // Back buttons
            new GamepadButton(4, "buttonLB"),
            new GamepadButton(5, "buttonRB"),
            new GamepadButton(6, "buttonLT", true),
            new GamepadButton(7, "buttonRT", true),
            // Special buttons
            new GamepadButton(8, "buttonOption"),
            new GamepadButton(9, "buttonMenu"),
            new GamepadButton(16, "buttonHome"),
            // Pad
            new GamepadButton(12, "buttonUp"),
            new GamepadButton(13, "buttonDown"),
            new GamepadButton(14, "buttonLeft"),
            new GamepadButton(15, "buttonRight"),
            // Joysticks
            new GamepadButton(10, "buttonJoystickLeft"),
            new GamepadButton(11, "buttonJoystickRight"),
            /**
             * Joysticks
             */
            new GamepadJoystick(0, "joystickLeft", 8),
            new GamepadJoystick(1, "joystickRight", 8),
        ];

        /**
         * Save
         */
        for (const _input of this.inputs.all) {
            this.inputs[_input.name] = _input;
        }

        /**
         * Events
         */
        for (const _input of this.inputs.all) {
            if (_input.type === "button") {
                _input.on("pressed", (_index, _name) => {
                    console.log("pressed", _index, _name);
                });
                _input.on("unpressed", (_index, _name) => {
                    console.log("unpressed", _index, _name);
                });
                _input.on("pressureChanged", (_index, _name, _pressure) => {
                    console.log("pressureChanged", _index, _name, _pressure);
                });
            } else if (_input.type === "joystick") {
                _input.on("started", (_index, _name) => {
                    console.log("started", _index, _name);
                });
                _input.on("ended", (_index, _name) => {
                    console.log("ended", _index, _name);
                });
                _input.on("changed", (_index, _name) => {
                    console.log("changed", _input.rotation);
                });
            }
        }
    }

    setInterface() {
        this.interface = new GamepadInterface(this.inputs);
    }

    update() {
        // No gamepad connected
        if (!this.connected) return;

        // Retrieve the state
        const instanceState = navigator.getGamepads()[0];

        // Update inputs
        for (const _input of this.inputs.all) {
            _input.update(instanceState);
        }
    }
}
