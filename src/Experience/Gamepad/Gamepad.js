import EventEmitter from "../Utils/EventEmitter.js";
import GamepadButton from "./GamepadButton.js";
import GamepadJoystick from "./GamepadJoystick";

export default class Gamepad extends EventEmitter {
    constructor() {
        super();

        // Setup
        this.connected = false;

        this.setConnection();
        this.setMapping();
    }

    setMapping() {
        this.mapping = {};

        /**
         * Buttons
         */
        this.mapping.buttons = {};

        // Left buttons
        this.mapping.buttons.a = new GamepadButton(0, "A");
        this.mapping.buttons.b = new GamepadButton(1, "B");
        this.mapping.buttons.x = new GamepadButton(2, "X");
        this.mapping.buttons.y = new GamepadButton(3, "Y");

        // Back buttons
        this.mapping.buttons.leftButton = new GamepadButton(4, "LB");
        this.mapping.buttons.rightButton = new GamepadButton(5, "RB");
        this.mapping.buttons.leftTrigger = new GamepadButton(6, "LT", true);
        this.mapping.buttons.rightTrigger = new GamepadButton(7, "RT", true);

        // Option buttons
        this.mapping.buttons.option = new GamepadButton(8, "Option");
        this.mapping.buttons.menu = new GamepadButton(9, "Menu");
        this.mapping.buttons.home = new GamepadButton(16, "Home");

        // Pad
        this.mapping.buttons.up = new GamepadButton(12, "up");
        this.mapping.buttons.down = new GamepadButton(13, "down");
        this.mapping.buttons.left = new GamepadButton(14, "left");
        this.mapping.buttons.right = new GamepadButton(15, "right");

        // Joysticks
        this.mapping.buttons.joystickLeft = new GamepadButton(
            10,
            "joystickLeft"
        );
        this.mapping.buttons.joystickRight = new GamepadButton(
            11,
            "joystickRight"
        );

        // Events
        for (const _buttonKey in this.mapping.buttons) {
            const button = this.mapping.buttons[_buttonKey];

            button.on("pressed", (_index, _name) => {
                console.log("pressed", _index, _name);
            });

            button.on("unpressed", (_index, _name) => {
                console.log("unpressed", _index, _name);
            });

            button.on("pressureChanged", (_index, _name, _pressure) => {
                console.log("pressureChanged", _index, _name, _pressure);
            });
        }

        /**
         * Joysticks
         */

        this.mapping.joysticks = {};
        this.mapping.joysticks.left = new GamepadJoystick(0, "left", 4);
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

    update() {
        // No gamepad connected
        if (!this.connected) return;

        const instanceState = navigator.getGamepads()[0];
        // console.log(instanceState.buttons)

        // Buttons
        for (const _buttonKey in this.mapping.buttons) {
            const button = this.mapping.buttons[_buttonKey];
            button.update(instanceState);
        }
        // instanceState.buttons.forEach((_button, _index) => {
        //     if (_button.pressed) {
        //         console.log(_button.value);
        //     }
        // });

        // Joysticks
        for (const _joystickKey in this.mapping.joysticks) {
            const joystick = this.mapping.joysticks[_joystickKey];
            joystick.update(instanceState);
        }
    }
}
