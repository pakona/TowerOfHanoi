var utils = {
    intersectsSquareAndSquare: function(x1, y1, w1, x2, y2, w2) {
        if (Math.abs(x1 - x2) < (w1 + w2) / 2 && Math.abs(y1 - y2) < (w1 + w2) / 2) {
            return true;
        }
        return false;
    },
    
    norm2: function(vector) {
        var z = vector.z ? vector.z : 0;
        return Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(z, 2);
    },
    
    assert: function(condition, message) {
    	if(DEBUG_VERSION && !condition)
    	{
    		alert(message);
    	}
    }    

}