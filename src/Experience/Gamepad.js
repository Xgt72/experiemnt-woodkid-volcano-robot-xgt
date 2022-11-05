export default class GamePad {
    constructor() {
        this.instance = null;
        window.addEventListener("gamepadconnected", (_event) => {
            console.log("connected");
            console.log(_event.gamepad);

            this.instance = _event.gamepad;
        });

        window.addEventListener("gamepaddisconnected", (_event) => {
            console.log("diconnected");
            this.instance = null;
        });
    }

    update() {
        if (!this.instance) return;

        console.log(this.instance.axes[0]);
    }
}
