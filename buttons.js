function ImageCircleBtn(x, y, radius, image, onTouchEvent) {
    this.isUnder = function(touchPos) {
        var d = (touchPos.x - x) * (touchPos.x - x) + (touchPos.y - y) * (touchPos.y - y);
        return (d <= (radius * radius));
    };

    this.onTouch = onTouchEvent;

    this.draw = function(graphicsDevice) {
        graphicsDevice.drawImage(image, x - radius, y - radius, 2 * radius, 2 * radius);
    };
}

function ImageRectangleBtn(x, y, height, width, image, text, onTouchEvent) {
    this.onTouch = onTouchEvent;

    this.isUnder = function(touchPos) {
        return (x <= touchPos.x && touchPos.x <= x + width) && (y <= touchPos.y && touchPos.y <= y + height);
    };

    this.draw = function(graphicsDevice) {
        graphicsDevice.drawImage(image, x, y, width, height);
        
        graphicsDevice.fillText(text, 
        	x + 30, 
    		y + 30,
    		20,
    		"Arial",
    		'rgba(0, 0, 0, 1.0)');
    };
}

function RectangleBtn(x, y, height, width, borderWidth, text, fontSize, onTouchEvent) {
    this.onTouch = onTouchEvent;
    this.text = text;

    this.isUnder = function(touchPos) {
        return (x <= touchPos.x && touchPos.x <= x + width) && (y <= touchPos.y && touchPos.y <= y + height);
    };

    this.draw = function(graphicsDevice) {
        graphicsDevice.strokeRect(x, y, width, height, 'rgba(0, 0, 0)', borderWidth);

        graphicsDevice.fillText(this.text, 
        	x, 
    		y + width / 5,
    		fontSize,
    		"Arial",
    		'rgba(0, 0, 0, 1.0)',
    		borderWidth);
    };
}