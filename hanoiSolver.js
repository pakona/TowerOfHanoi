function SolvingMove(from, to) {
	this.from = from;
	this.to = to;
}

function HanoiSolver(numberOfDisks) {
	var self = this;
	this.moves = [];

	this.start = function() {
		this.moves = [];
		hanoi_tower(numberOfDisks, 1, 3, 2);
	}
	
	function hanoi_tower(n, from, to, temp)
	{
		if(n > 0)
		{
			hanoi_tower(n-1, from, temp, to);
			self.moves.push(new SolvingMove(from - 1, to - 1));
			hanoi_tower(n-1, temp, to, from);
		}
	}
}