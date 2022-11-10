import EventEmitter from "../Utils/EventEmitter.js";

export default class GamepadJoystick extends EventEmitter {
    constructor(_index, _name, _precision = Infinity) {
        super();

        // Options
        this.index = _index;
        this.name = _name;
        this.precision = _precision;

        // Setup
        this.x = 0;
        this.y = 0;
        this.distance = 0;
        this.rotation = null;
    }

    update(_gamepadState) {
        const x = _gamepadState.axes[this.index * 2 + 0];
        const y = _gamepadState.axes[this.index * 2 + 1];
        const distance = Math.hypot(x, y);
        const rotation = Math.atan2(-x, y);

        if (this.precision !== Infinity) {
            const fixedX = parseFloat(x.toFixed(this.precision));
            // console.log(fixedX);
            // video at 1H21
        }

        this.x = x;
        this.y = y;
        this.distance = distance;
        this.rotation = rotation;
        // console.log(this.rotation);
    }
}
