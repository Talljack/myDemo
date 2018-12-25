//进度条的模块
(function($, root){
    var $body = $(document.body);
    var currDuration;
    var lastPrecent = 0;
    var startTime;
    var frameId;
    function formatTime(duration) {
        duration = Math.round(duration);
        var minuate = Math.floor(duration / 60);
        var second = duration - minuate * 60;
        if(minuate < 10) {
            minuate = '0' + minuate;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minuate + ':' +second;
    }
    function renderAllTime(duration){
        lastPrecent = 0;
        currDuration = duration;
        var allTime = formatTime(duration);
        $body.find('.allTime').html(allTime);
    }
    function updata(precent) {
        var currentTime = precent * currDuration;
        currentTime = formatTime(currentTime);
        $body.find('.currentTime').html(currentTime);
        var percentage = (precent - 1) * 100 + "%";
        $body.find('.top').css({
            transform : "translateX("+percentage+")"
        })
    }
    function start(percentage) {
        lastPrecent = percentage === undefined ? lastPrecent : percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var currTime = new Date().getTime();
            var precent = lastPrecent + (currTime - startTime) / (currDuration * 1000);
            if(precent < 1){
                frameId = requestAnimationFrame(frame);
                updata(precent);
            }else{
                cancelAnimationFrame(frameId);
                $body.find('.next').trigger('click');
            }
        }
        frame(); 
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPrecent = lastPrecent + (stopTime - startTime) / (currDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    root.progress = {
        renderAllTime: renderAllTime,
        updata: updata,
        start: start,
        stop: stop
    }
}(window.Zepto, window.player || (window.player = {})))