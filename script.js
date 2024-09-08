
let drawing = false;
let currentShape = null;
let startX, startY;
let points = [];
let fillColor = document.getElementById("fill-color");
let strokeColor = document.getElementById("stroke-color");
let strokewidth = document.getElementById("stroke-width");
function resetFill(){
    fillColor.value = 'none';
}
// Start drawing shapes
function startDrawing(shape) {
    currentShape = shape;
}

// Start freehand drawing
function startFreehand() {
    currentShape = 'freehand';
}

// Clear the canvas
function clearCanvas() {
    const svgCanvas = document.getElementById('svgCanvas');
    svgCanvas.innerHTML = '';
}

// Handle mouse down (start drawing)
document.getElementById('svgCanvas').addEventListener('mousedown', function (e) {
    drawing = true;
    const svgCanvas = e.target;
    const rect = svgCanvas.getBoundingClientRect();
    startX = e.clientX-rect.left;
    startY = e.clientY-rect.top;
    points = [];

    if (currentShape === 'rect') {
        const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rectElement.setAttribute('x', startX);
        rectElement.setAttribute('y', startY);
        rectElement.setAttribute('width', 1);
        rectElement.setAttribute('height', 1);
        rectElement.setAttribute('fill', 'none');
        rectElement.setAttribute('stroke-width',strokewidth.value);
        rectElement.setAttribute('stroke', strokeColor.value);
        rectElement.setAttribute('id', 'currentShape');
        svgCanvas.appendChild(rectElement);
    } else if (currentShape === 'line') {
        const lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineElement.setAttribute('x1', startX);
        lineElement.setAttribute('y1', startY);
        lineElement.setAttribute('x2', startX);
        lineElement.setAttribute('y2', startY);
        lineElement.setAttribute('stroke-width',strokewidth.value);
        lineElement.setAttribute('stroke', strokeColor.value);
        lineElement.setAttribute('id', 'currentShape');
        svgCanvas.appendChild(lineElement);
    } else if (currentShape === 'circle') {
        const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circleElement.setAttribute('cx', startX);
        circleElement.setAttribute('cy', startY);
        circleElement.setAttribute('r', 1);
        circleElement.setAttribute('fill', 'none');
        circleElement.setAttribute('stroke-width',strokewidth.value);
        circleElement.setAttribute('stroke', strokeColor.value);
        circleElement.setAttribute('id', 'currentShape');
        svgCanvas.appendChild(circleElement);
    } else if (currentShape === 'ellipse') {
        const ellipseElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipseElement.setAttribute('cx', startX);
        ellipseElement.setAttribute('cy', startY);
        ellipseElement.setAttribute('rx', 1);
        ellipseElement.setAttribute('ry', 1);
        ellipseElement.setAttribute('fill', 'none');
        ellipseElement.setAttribute('stroke-width',strokewidth.value);
        ellipseElement.setAttribute('stroke', strokeColor.value);
        ellipseElement.setAttribute('id', 'currentShape');
        svgCanvas.appendChild(ellipseElement);
    } else if (currentShape === 'polygon') {
        points.push([startX, startY]);
    } else if (currentShape === 'freehand') {
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', `M${startX+10},${startY+10}`);
        pathElement.setAttribute('stroke', fillColor.value);
        pathElement.setAttribute('fill', fillColor.value);
        pathElement.setAttribute('stroke-linecap','round');
        pathElement.setAttribute('stroke-linejoin','round')
        pathElement.setAttribute('stroke-width',strokewidth.value);
        pathElement.setAttribute('id', 'currentShape');
        svgCanvas.appendChild(pathElement);
    }
});

// Handle mouse move (draw)
document.getElementById('svgCanvas').addEventListener('mousemove', function (e) {
    if (!drawing) return;
    const svgCanvas = e.target;
    const rect = svgCanvas.getBoundingClientRect();
    const mouseX = e.clientX-rect.left;
    const mouseY = e.clientY-rect.top ;
    const currentElement = document.getElementById('currentShape');

    if (currentShape === 'rect') {
        const width = Math.abs(mouseX - startX);
        const height = Math.abs(mouseY - startY);
        currentElement.setAttribute('width', width);
        currentElement.setAttribute('height', height);
        currentElement.setAttribute('x', Math.min(mouseX, startX));
        currentElement.setAttribute('y', Math.min(mouseY, startY));
    } else if (currentShape === 'line') {
        currentElement.setAttribute('x2', mouseX);
        currentElement.setAttribute('y2', mouseY);
    } else if (currentShape === 'circle') {
        const radius = Math.sqrt(Math.pow(mouseX - startX, 2) + Math.pow(mouseY - startY, 2));
        currentElement.setAttribute('r', radius);
    } else if (currentShape === 'ellipse') {
        const rx = Math.abs(mouseX - startX);
        const ry = Math.abs(mouseY - startY);
        currentElement.setAttribute('rx', rx);
        currentElement.setAttribute('ry', ry);
    } else if (currentShape === 'freehand') {
        const path = currentElement.getAttribute('d');
        currentElement.setAttribute('d', path + `L${mouseX},${mouseY}`);
    }
});

// Handle mouse up (end drawing)
document.getElementById('svgCanvas').addEventListener('mouseup', function () {
    drawing = false;
    document.getElementById('currentShape').removeAttribute('id');
});

// Save SVG
function saveSVG() {
    const svgData = document.getElementById('svgCanvas').outerHTML;
    const svgBlob = new Blob([svgData], { type: 'image/svg' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'drawing.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
console.log(strokewidth.value);