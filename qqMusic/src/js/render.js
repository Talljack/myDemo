

(function ($, root){
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            $('.song-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    };
    function renderInfo(info) {
        var str = '';
        str += `<div class="song-name">${info.song}</div>
        <div class="singer-name">${info.singer}</div>
        <div class="song-album">${info.album}</div>`;
        $('.song-info').html(str);
    };
    function renderIsLike(isLike) {
        if(isLike) {
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    root.render = function(data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})))  //类似于jQuery，将变量挂到全局上去然后暴露出接口即可