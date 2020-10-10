const cellSize = 50;

function draw(state) {
    const canvas = document.getElementById("my-canvas");
    const context = canvas.getContext("2d");

    // context.fillStyle = "red";
    // context.fillRect(0, 0, 50, 50);

    context.strokeStyle = "black"
    context.lineWidth = 1;

    const image = state.image;
    const width = image.width();
    const height = image.height();

    const cells = image.cells();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const index = (y * width + x) * 3
            const color = `rgb(${cells[index + 0]}, ${cells[index + 1]}, ${cells[index + 2]})`;
            context.fillStyle = color;
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
    }

    for (let x = 0; x <= width; x++) {
        context.beginPath();
        context.moveTo(x * cellSize + 0.5, 0);
        context.lineTo(x * cellSize + 0.5, height * cellSize);
        context.stroke();
    }

    for (let y = 0; y <= width; y++) {
        context.beginPath();
        context.moveTo(0, y * cellSize + 0.5);
        context.lineTo(width * cellSize, y * cellSize + 0.5);
        context.stroke();
    }
}

function setupCanvas(state) {
    const canvas = document.getElementById('my-canvas');

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();

        // clientX, Y is the mouse position
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        x = Math.floor(x / cellSize);
        y = Math.floor(y / cellSize);

        const image = state.image;
        image.brush(x, y, state.currentColor);

        draw(state)
    });

    canvas.addEventListener("mousedown", event => {
        state.dragging = true;
    })

    canvas.addEventListener("mouseup", event => {
        state.dragging = false;
    })

    canvas.addEventListener('mousemove', event => {
        if (!state.dragging) return;

        const rect = canvas.getBoundingClientRect();

        // clientX, Y is the mouse position
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        x = Math.floor(x / cellSize);
        y = Math.floor(y / cellSize);

        const image = state.image;
        image.brush(x, y, state.currentColor);

        draw(state)
    });

    document.getElementById("red").addEventListener("click", (event) => {
        state.currentColor = [255, 200, 200]
    })
    document.getElementById("green").addEventListener("click", (event) => {
        state.currentColor = [200, 255, 200]
    })
    document.getElementById("blue").addEventListener("click", (event) => {
        state.currentColor = [200, 200, 255]
    })
}

async function main() {
    const lib = await import("../pkg/index.js").catch(console.error);

    const image = new lib.Image(10, 10);

    const state = {
        image,
        currentColor: [200, 255, 200],
        dragging: false,
    }
    setupCanvas(state);

    draw(state);
}

main();