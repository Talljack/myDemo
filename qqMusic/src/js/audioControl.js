
(function ($, root){
    function AudioManager() {
        this.index = 0;
        this.audio = new Audio();
        this.state = 'pause';
    }
    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.state = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.state = 'pause';
        },
        getLoad:function(index,src) {
            this.audio.src = src;
            this.index = index;
            this.audio.load();
        },
        jumpToPlay : function(time){           
            this.audio.currentTime = time;
            this.play();
        } 
    }

    root.audioControl = new AudioManager();
}(window.Zepto, window.player || (window.player = {})))