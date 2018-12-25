

(function($, root){
    function addDom(dom, data){
        var ul = $('<ul></ul>');
        $(ul).addClass('showInfo');
        var str = '';
        for(var i = 0, len = data.length; i < len; i++) {
            str += `<li><div>${data[i].song}</div><div>${data[i].singer}</div><div>${(data[i].duration / 60).toFixed(2)} </div></li>`
        }
        $(ul).html(str);
        dom.append($(ul));
        addCss(ul);
    }
    function addCss(dom){
        $(dom).css({
            display:'none',
            width: '70%',
            height: '200px',
            background: '#fff',
            position: 'absolute',
            bottom: '0',
            right: '0',
            border: '1px solid #000',
            // 'z-index':'999'
        });
        $(dom).find('li').css({
            'width': '100%',
            'height': '30px',
            'line-height': '30px',
            'display': 'flex',
            // 'justify-content': '',
            // 'align-items': 'center',
            'border': '1px solid #ccc'
        });
        $(dom).find('li').find('div').css({
            'text-overflow': 'ellipsis',
            'overflow':'hidden',
            'white-space': 'nowrap',
            'font-size':'12px',
            'flex':'1'
        })
    }
    root.addList = function(data){
        addDom($('.wrapper'), data);
    }
}(window.Zepto, window.player ||(window.player = {})))