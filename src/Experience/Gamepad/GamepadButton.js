import EventEmitter from "../Utils/EventEmitter.js";

export default class GamepadButton extends EventEmitter {
    constructor(_index, _name) {
        super();

        this.index = _index;
        this.name = _name;
        this.pressed = false;
    }

    update(_gamepadState) {
        const buttonState = _gamepadState.buttons[this.index];
        if (buttonState.pressed) {
            if (!this.pressed) {
                this.pressed = true;
                this.trigger("pressed", [this.index, this.name]);
            }
        } else {
            if (this.pressed) {
                this.pressed = false;
                this.trigger("unpressed", [this.index, this.name]);
            }
        }
    }
}
