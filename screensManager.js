var ScreensManager = new function() {
	var hanoiSolvingScreen;
	var numberSelectionScreen;
	
	this.currentScreen;
	
	this.init = function() {
		hanoiSolvingScreen = new HanoiSolvingScreen();
		hanoiSolvingScreen.init(3);
	}
	
	this.switchToNumberSelectionScreen = function() {
		numberSelectionScreen = new NumberSelectionScreen(hanoiSolvingScreen, 20);
		numberSelectionScreen.init(3);
		this.currentScreen = numberSelectionScreen;
	}
	
	this.switchToGameplayScreen = function(numberOfDisks) {
		hanoiSolvingScreen.init(numberOfDisks);
		hanoiSolvingScreen.start();
		this.currentScreen = hanoiSolvingScreen;
	}
}