import "./interface.styl";

export default class GamepadInterface {
    constructor(_inputs) {
        this.inputs = _inputs;

        this.elements = {};
        this.elements.container = document.createElement("div");
        this.elements.container.classList.add("gamepad-interface");
        document.body.appendChild(this.elements.container);

        this.setInputs();
    }

    setInputs() {
        for (const _input of this.inputs.all) {
            const inputElement = document.createElement("div");
            inputElement.classList.add(
                "input",
                `is-${_input.name}`,
                `is-${_input.type}`
            );
            this.elements.container.appendChild(inputElement);

            _input.on("pressed", () => {
                inputElement.classList.add("is-active");
            });
            _input.on("unpressed", () => {
                inputElement.classList.remove("is-active");
            });
        }
    }
}
