function Game() {
    var graphicsDevice;

    this.onLoad = function() {
		if(PLATFORM_PC) {
			init();
			return;
		}
		
        document.addEventListener("deviceready", init, true);
    };

    function init() {
    	var REF_WIDTH = 1280;
    	var REF_HEIGHT = 720;
    	var canvas = document.getElementById("canvas");
    	graphicsDevice = new GraphicsDevice(canvas, REF_WIDTH, REF_HEIGHT);

        touchEventsManager.init(graphicsDevice, canvas);
		ScreensManager.init();
		ScreensManager.switchToNumberSelectionScreen();
		
        setInterval(update, 33);
    }

    function update() {
	    ScreensManager.currentScreen.update(graphicsDevice);	    
	    touchEventsManager.update();	
	    draw();
    }

    function draw() {
        graphicsDevice.clearRect(0, 0, graphicsDevice.viewport.width, graphicsDevice.viewport.height);
        ScreensManager.currentScreen.draw(graphicsDevice);
    }
}