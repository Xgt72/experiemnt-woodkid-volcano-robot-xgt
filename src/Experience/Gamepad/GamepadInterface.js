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
            // Element
            const inputElement = document.createElement("div");
            inputElement.classList.add(
                "input",
                `is-${_input.name}`,
                `is-${_input.type}`
            );
            this.elements.container.appendChild(inputElement);

            if (_input.type === "button") {
                // Fill element
                const fillElement = document.createElement("div");
                fillElement.classList.add("fill");
                inputElement.appendChild(fillElement);

                // Listen to events and update thye DOM
                _input.on("pressed", () => {
                    inputElement.classList.add("is-active");
                });
                _input.on("unpressed", () => {
                    inputElement.classList.remove("is-active");
                });
                _input.on("pressureChanged", (_index, _name, _value) => {
                    fillElement.style.transform = `scaleY(${_value})`;
                });
            }

            if (_input.type === "joystick") {
                // Tip element
                const tipElement = document.createElement("div");
                tipElement.classList.add("tip");
                inputElement.appendChild(tipElement);

                // Listen to events and update thye DOM
                _input.on(
                    "changed",
                    (_index, _name, _x, _y, _distance, _rotation) => {
                        const x = _x * 50;
                        const y = _y * 50;

                        tipElement.style.transform = `translate(${x}%, ${y}%)`;
                        console.log(x, y, _distance, _rotation);
                    }
                );
            }
        }
    }
}
