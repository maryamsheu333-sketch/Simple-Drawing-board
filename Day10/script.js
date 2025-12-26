const canvas = document.getElementById('drawing-canvas');
// Get the 2D rendering context for the canvas
const ctx = canvas.getContext('2d');

// Controls
const colorPicker = document.getElementById('color-picker');
const sizeInput = document.getElementById('size-input');
const clearBtn = document.getElementById('clear-btn');

// Drawing State Variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// --- INITIAL SETUP ---

// Set initial context properties
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = sizeInput.value;
ctx.lineCap = 'round'; // Makes lines look smooth at the ends and joints
ctx.lineJoin = 'round';

// --- CORE DRAWING FUNCTIONS ---

/**
 * Updates drawing parameters based on control panel inputs.
 */
function updateContext() {
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = sizeInput.value;
}

/**
 * Handles the drawing motion.
 * @param {MouseEvent} e - The mouse move event object.
 */
function draw(e) {
    if (!isDrawing) return; // Stop the function if the mouse is not held down

    // Update context parameters in case they changed during drawing
    updateContext();

    // Start drawing a path
    ctx.beginPath();
    
    // Move from the last known point (lastX, lastY)
    ctx.moveTo(lastX, lastY); 
    
    // Draw a line to the current mouse position (e.offsetX, e.offsetY)
    ctx.lineTo(e.offsetX, e.offsetY);
    
    // Render the line
    ctx.stroke();

    // Update the last position to the current position for the next movement
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
}

// --- EVENT HANDLERS ---

// 1. Mouse Down: Start the drawing process
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    
    // Set the starting position for the line segment
    [lastX, lastY] = [e.offsetX, e.offsetY]; 
});

// 2. Mouse Move: Draw the line
canvas.addEventListener('mousemove', draw);

// 3. Mouse Up / Mouse Out: Stop drawing
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// 4. Clear Button
clearBtn.addEventListener('click', () => {
    // Fills the entire canvas with a solid color (white in this case)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 5. Control Changes (Color and Size)
colorPicker.addEventListener('change', updateContext);
sizeInput.addEventListener('change', updateContext);
sizeInput.addEventListener('input', updateContext); // Use 'input' for live updates while typing