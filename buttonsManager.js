function ButtonsManager() {
    this.buttons = [];

    this.add = function(btn) {
        this.buttons.push(btn);
    };

    this.clear = function() {
        this.buttons = [];
    };

    this.update = function() {
        var touchstartEvents = touchEventsManager.events[TouchEventsEnum.touchstart];
        var nbTouchstartEvents = touchstartEvents ? touchstartEvents.length : 0;
        for (i = 0; i < nbTouchstartEvents; i++) {
            this.pressButtons(touchstartEvents[i]);
        }
    };

    this.pressButtons = function(touchPos) {
        for (i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].disabled)
                continue;

            if (!this.buttons[i].isUnder(touchPos))
                continue;

            this.buttons[i].onTouch(touchPos);
        }
    };

    this.draw = function(graphicsDevice) {
        for (i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(graphicsDevice);
        }
    };
}