function NumberSelectionScreen(hanoiSolvingScreen, max) {
	var self = this;
	
	var buttonsManager;
	
	var incrementBtn;
	var decrementBtn;
	var okBtn;
	
	var minusImg = new Image();
	minusImg.src = "minus.png";
	
	var plusImg = new Image();
	plusImg.src = "plus.png";
	
	var okImg = new Image();
	okImg.src = "ok.png";
	
	this.value;
	
	this.init = function(defaultValue) {
		this.value = defaultValue;
		
		buttonsManager = new ButtonsManager();
		
		decrementBtn = new ImageRectangleBtn(550, 100, 30, 30, minusImg, "", decrementValue);
		incrementBtn = new ImageRectangleBtn(650, 100, 30, 30, plusImg, "", incrementValue);
		okBtn = new ImageRectangleBtn(700, 100, 30, 30, okImg, "", confirmValue);
		
		buttonsManager.add(decrementBtn);
		buttonsManager.add(incrementBtn);
		buttonsManager.add(okBtn);
	}
	
	function incrementValue() {
		self.value = (max + self.value + 1) % max;
		hanoiSolvingScreen.init(self.value);
	}
	
	function decrementValue() {
		self.value = (max + self.value - 1) % max;
		hanoiSolvingScreen.init(self.value);
	}
	
	function confirmValue(){
		ScreensManager.switchToGameplayScreen(self.value);
	}
	
	this.update = function(){
		buttonsManager.update();
	}
	
	this.draw = function(graphicsDevice) {
		hanoiSolvingScreen.draw(graphicsDevice);
		buttonsManager.draw(graphicsDevice);
		graphicsDevice.fillText("" + this.value, 610, 120, 18, 'Arial', 'black');
	}
}