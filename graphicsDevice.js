function GraphicsDevice(canvas, refWidth, refHeight) {
	var self = this;
	var ctx = canvas.getContext("2d");
	this.context = ctx;
    
    canvas.width = document.width;
    canvas.height = document.height;
    var offsetX = 0;
    var offsetY = 0;
    ajustCanvasSize();
    
    var ajustX = canvas.width / refWidth;
    var ajustY = canvas.height / refHeight;
    
    utils.assert(ajustX != 0 && ajustY != 0, "Banaloba mikasso!");
    
    this.viewport = {
        borderLeft: 0,
        borderTop: 0,
        width: refWidth,
        height: refHeight
    };

    this.strokeRect = function(x, y, width, height, color, lineWidth) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(ajustX * x, ajustY * y, ajustX * width, ajustY * height);
    };
    
    this.fillRect = function(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(ajustX * x, ajustY * y, ajustX * width, ajustY * height);
    };
    
    this.fillCircle = function(x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(ajustX * x, ajustY * y, ajustX * radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };
    
    this.fillText = function(text, x, y, fontSize, fontName, color)
    {
    	var oldFont = ctx.font;
    	ctx.font = "" + ajustX * fontSize + "pt " + fontName;
    	ctx.fillStyle = color;
        ctx.fillText(text, ajustX * x, ajustY * y);
    	ctx.font = oldFont;
    };

    this.drawImage = function(img, x, y, width, height) {
        ctx.drawImage(img, ajustX * x, ajustY * y, ajustX * width, ajustY * height);
    };
    
    this.clearRect = function(x, y, width, height)
    {
    	ctx.clearRect(ajustX * x, ajustY * y, ajustX * width, ajustY * height);
    };

    this.convertClientToCanvasPosition = function(clientX, clientY) {
        return {
            x: (clientX - offsetX) / ajustX,
            y: (clientY - offsetY) / ajustY
        };
    };
    
    this.convertVirtualToRealPosition = function(x, y) {
        return {
            x: x / ajustX,
            y: y / ajustY
        };
    };
    
    this.getCanvasRealSize = function(){
    	return {
    		width: canvas.width,
    		height: canvas.height
    	}
    }
    
    function ajustCanvasSize() {
	    var refRatio = refWidth / refHeight;
	
	    var defaultWidth = canvas.width;
	    var defaultHeight = canvas.height;
	    var screenRatio = defaultWidth / defaultHeight;
	    
	    // Resize canvas
	    if(screenRatio < refRatio)
	    {
	    	canvas.height = canvas.width / refRatio;
	    }
		else
		{
			canvas.width = canvas.height * refRatio;
		}
	    
	    // Replace canvas
	    offsetX = (defaultWidth - canvas.width) / 2;
	    offsetY = (defaultHeight - canvas.height);
	    
	    canvas.style.marginLeft = offsetX + "px";
	    canvas.style.marginTop = offsetY + "px";
	}
}
