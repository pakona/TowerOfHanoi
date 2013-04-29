var TouchEventsEnum = {
    touchstart: PLATFORM_PC ? 'mousedown' : 'touchstart',
    touchend: PLATFORM_PC ? 'mouseup' : 'touchend',
    touchmove: PLATFORM_PC ? 'mousemove' : 'touchmove',
    touchout: PLATFORM_PC ? 'mouseout' : '',
}

var touchEventsManager = {
    events: [],
    update: function() {
        touchEventsManager.events = [];
    },
    
    addEvent: function(type, e, clientToCanvasPosition) {
        var touchPos = PLATFORM_PC ? e : e.touches.item(0) != null ? e.touches.item(0) : {
            x: Number.NaN,
            y: Number.NaN
        };
        
        touchPos = clientToCanvasPosition(touchPos.clientX, touchPos.clientY);
        
        if (!touchEventsManager.events[type]) {
            touchEventsManager.events[type] = [];
        }
        touchEventsManager.events[type].push({
            x: touchPos.x,
            y: touchPos.y
        });
    },

    init: function(graphicsDevice, canvas) {
        touchEventsManager.events = [];
        
        canvas.addEventListener(TouchEventsEnum.touchend, function(e) {
            touchEventsManager.addEvent(TouchEventsEnum.touchend, e, graphicsDevice.convertClientToCanvasPosition);
        }, false);
        
        canvas.addEventListener(TouchEventsEnum.touchstart, function(e) {
            touchEventsManager.addEvent(TouchEventsEnum.touchstart, e, graphicsDevice.convertClientToCanvasPosition);
            e.preventDefault();
        }, false);
        
        canvas.addEventListener(TouchEventsEnum.touchmove, function(e) {
            touchEventsManager.addEvent(TouchEventsEnum.touchmove, e, graphicsDevice.convertClientToCanvasPosition)
        }, false);
        
        canvas.addEventListener(TouchEventsEnum.mouseout, function(e) {
            touchEventsManager.addEvent(TouchEventsEnum.mouseout, e, graphicsDevice.convertRealToVirtualPosition)
        }, false);
    }
};