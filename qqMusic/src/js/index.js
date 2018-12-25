
//模块化，将每一个功能都做成一个模块
var root = window.player;
var render = root.render;
var len;
var dataList;
var audioControl = root.audioControl;
var timer;
var indexControl;
var addList = root.addList;
var progress = root.progress;
var precentage;
// var key = true;
function getData(url) {
    $.ajax({
        type:'GET',
        url: url,
        success: function(data) {
            console.log(data);
            len = data.length;
            dataList = data;
            audioControl.getLoad(0, data[0].audio);
            indexControl = new root.indexControl(len);
            render(data[0]);
            progress.renderAllTime(data[0].duration);
            progress.updata(0);
            addList(dataList);
            bindTouch();
            bindEvent();

        },
        error: function() {
            console.log("error");
        }
    })
}
getData('../mock/data.json');

function bindEvent() {
    $('body').on('playChange', function(e){
        var i = indexControl.index;
        render(dataList[i]);
        audioControl.getLoad(i,dataList[i].audio);
        if(audioControl.state == 'play'){
            audioControl.play();
            progress.start();
            $('.song-box').attr('data-deg', 0);
            $('.song-box').css({
                'transform':'rotate('+ 0 +'deg)',
                'transition':'none'
            });
            rotated(0);
        }
        progress.renderAllTime(dataList[i].duration);
        progress.updata(0);
    })
    $('.prev').on('click', function() {
        var i = indexControl.prev();
        
        $('body').trigger('playChange');
    });
    $('.next').on('click', function() {
       var i = indexControl.next();
        $('body').trigger('playChange');
    });
    $('.play').on('click', function() {
        if(audioControl.state == 'pause'){
            progress.start();
            audioControl.play();
            
            var deg = parseInt($('.song-box').attr('data-deg'));
            // console.log(precentage);
            
            rotated(deg);
        }else{
            progress.stop();
            audioControl.pause();
            
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
    $('.list').on('click', function(e) {
        e.stopPropagation();
        $('.showInfo').toggle();
        var flag = audioControl.state == 'play';
        $('.showInfo li').on('click', function(e){
            audioControl.pause();
            clearInterval(timer); 
            var index = $(this).index();
            render(dataList[index]);
            audioControl.getLoad(index, dataList[index].audio);
            $('.play').trigger('click');
            if(flag){
                $('.play').addClass('playing');
            }else{
                $('.play').removeClass('playing');
            }
        });
    })
}
function bindTouch(){
    var $circle = $('.circle');
    var offset = $('.process').offset();
    var left = offset.left;
    var width = offset.width;
    $circle.on('touchstart', function() {
        progress.stop();
    }).on('touchmove', function(e){
        
        var x = e.changedTouches[0].clientX;
        var precent = (x - left) / width;
        if(precent > 1 || precent < 0){
            precent = 0;
        }
        progress.updata(precent);
    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var precent = (x - left) / width;
        if(precent > 1 || precent < 0){
            precent = 0;
        }
        var currDuration = dataList[audioControl.index].duration;
        var curTime = precent * currDuration;
        audioControl.jumpToPlay(curTime);
        progress.start(precent);
        $('.play').addClass('playing');
    })
}
function rotated(deg) {
    clearInterval(timer);
    timer = setInterval(function(){
        deg += 2;
        $('.song-box').attr('data-deg', deg);
        $('.song-box').css({
            'transform':'rotateZ('+ deg+'deg)',
            'transition':'all 200ms linear'
        });
    }, 200);
}
//需要完成的模块功能如下
// 1、图片和文字的渲染
//2、图片的旋转以及切换
// 3、点击事件
// 4、切歌，以及选歌模块的实现
// 5、进度条的自动变化以及可拖拽功能
