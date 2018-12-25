
(function($, root){
    function IndexControl(len){
        this.index = 0;
        this.len = len;
    }
    IndexControl.prototype = {
        prev: function(){
            return this.getIndex(-1);
        },
        next: function(){
            return this.getIndex(1);
        },
        getIndex: function(val){
            var index = this.index;
            var len = this.len;
            var currIndex = (val + index + len) % len;
            this.index = currIndex;
            return currIndex;
        }
    }
    root.indexControl = IndexControl;
}(window.Zepto, window.player || (window.player = {})))