function HanoiDisk (position, radius) {
	this.position = position;
	this.radius = radius;
	this.isMoving = false;
	this.moveAnimation = null;
}

function HanoiDiskMoveAnimation(beginPos, endPos, duration) {
	this.currentPos = {x: beginPos.x, y: beginPos.y};
	this.isDone = false;
	
	var FRAME_RATE = 33;
	var distance = Math.sqrt(Math.pow(endPos.x - beginPos.x, 2) + Math.pow(endPos.y - beginPos.y, 2));
	var speed = distance / (duration / FRAME_RATE);
	var direction = {x: (endPos.x - beginPos.x) / distance, y: (endPos.y - beginPos.y) / distance};
	
	var currentDistance = 0;
	
	this.update = function() {
		this.currentPos.x += speed * direction.x;
		this.currentPos.y += speed * direction.y;
		
		currentDistance = Math.sqrt(Math.pow(this.currentPos.x - beginPos.x, 2) + Math.pow(this.currentPos.y - beginPos.y, 2));
		if(currentDistance >=  distance) {
			this.currentPos = endPos;
			this.isDone = true;
		}
	}
}

function HanoiTower (x) {
	this.centerX = x;
	this.disks = [];
}

function HanoiSolvingScreen() {
	var diskHeight = 12;
	
	var towers;
	var towerWidth = 5;
	var towerHeight = 500;
	var screenHeight = 720;
	var screenWidth = 1280;
	
	var hanoiSolver;
	var currentMove = null;
	var currentMoveIndex = -1;
	var currentMovingDisk = null;
	
	this.init = function(numberOfDisks) {
		currentMove = null;
		currentMoveIndex = -1;
		currentMovingDisk = null
	
		towers = [];
		towers.push(new HanoiTower(screenWidth * 1/6));
		towers.push(new HanoiTower(screenWidth * 3/6));
		towers.push(new HanoiTower(screenWidth * 5/6));
		
		disks = [];
		var baseRadius = 10;
		for(var i = 0; i < numberOfDisks; i++) {
			towers[0].disks.push(new HanoiDisk({x: towers[0].centerX, y: screenHeight - diskHeight/2 - i * diskHeight},
				baseRadius + (numberOfDisks - 1 - i) * 10));
		}
		
		hanoiSolver = new HanoiSolver(numberOfDisks);
	}
	
	this.start = function() {
		hanoiSolver.start();
	}
	
	this.update = function() {
		if(currentMovingDisk != null && currentMovingDisk.isMoving == true) {
			currentMovingDisk.moveAnimation.update();
			currentMovingDisk.position = currentMovingDisk.moveAnimation.currentPos;
		}
		
		if(currentMovingDisk != null && currentMovingDisk.isMoving == true && currentMovingDisk.moveAnimation.isDone == true) {
			currentMovingDisk.isMoving = false;
			currentMovingDisk.moveAnimation = null;
			towers[currentMove.from].disks.splice(towers[currentMove.from].disks.indexOf(currentMovingDisk));
			towers[currentMove.to].disks.push(currentMovingDisk);
		}
		
		if(currentMoveIndex < hanoiSolver.moves.length && (currentMovingDisk == null || currentMovingDisk.isMoving == false)) {
			if(currentMoveIndex == hanoiSolver.moves.length - 1) {
				ScreensManager.switchToNumberSelectionScreen();
			}
			else {
				currentMoveIndex++;
				currentMove = hanoiSolver.moves[currentMoveIndex];
				executeMove(currentMove);
			}
		}
	}
	
	function executeMove(move) {
		currentMovingDisk = towers[move.from].disks[towers[move.from].disks.length - 1];
		var beginPos = currentMovingDisk.position;
		var endPos = {x: towers[move.to].centerX, y: screenHeight - diskHeight/2 - towers[move.to].disks.length * diskHeight};
		
		var moveAnim = new HanoiDiskMoveAnimation(beginPos, endPos, 500);
		currentMovingDisk.isMoving = true;
		currentMovingDisk.moveAnimation = moveAnim;
	}
	
	this.draw = function(graphicsDevice) {
		var i = 0;
		var j = 0;
		for(i = 0; i < towers.length; i++) {
			//draw the towers
			graphicsDevice.strokeRect(towers[i].centerX - towerWidth/2, screenHeight - towerHeight, towerWidth, towerHeight, 'black', 3);
			
			//draw the tower disks
			for(j = 0; j < towers[i].disks.length; j++) {
				disk = towers[i].disks[j];
				graphicsDevice.fillRect(disk.position.x - disk.radius, disk.position.y - diskHeight/2, disk.radius * 2, diskHeight, 'black');
			}
		}
		
		var copyright = "Developed by Patrick Kongpinda. Hanoi solver algorithm from Christian & Steve Tchatchouang.";
		graphicsDevice.fillText(copyright, 900, 10, 6, 'Arial', 'black');
	}
}