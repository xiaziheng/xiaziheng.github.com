function getStyle(obj, name) {
    return (obj.currentStyle || getComputedStyle(obj, null))[name];
}

function move(obj, json, op) {
    op = op || {};
    op.time = op.time || 700;
    op.type = op.type || 'ease_out';

    clearInterval(obj.timer);
    var iCount = Math.floor(op.time / 30);
    var start = {};
    var dis = {};
    var cou = 0;
    var s = 0;

    for (var name in json) {
        if(name == 'value'){
            start[name] = parseFloat(obj[name]);
            dis[name] = json[name] - start[name];
        }else {
            start[name] = parseFloat(getStyle(obj, name));
            dis[name] = json[name] - start[name];
        }
    }


    obj.timer = setInterval(function () {
        cou++;

        for (var name in json) {
            switch (op.type) {
                case 'linear':
                    s = dis[name] * cou / iCount;
                    break;
                case 'ease_in':
                    s = dis[name] * (cou / iCount) * (cou / iCount) * (cou / iCount);
                    break;
                case 'ease_out':
                    s = dis[name] * (1 - cou / iCount) * (1 - cou / iCount) * (1 - cou / iCount);
                    break;
            }
            if (name == 'opacity') {
                obj.style[name] = dis[name] / iCount * cou + start[name];
                obj.style.filter = 'alpha(opacity:' + dis[name] * 100 + ')'
            } else if(name == 'value') {
                obj[name] = parseFloat(s) + parseFloat(start[name]);
            }else{
                obj.style[name] = s + start[name] + 'px';
            }
        }

        if (cou == iCount) {
            clearInterval(obj.timer);
            op.end && op.end();
        }
    }, 30)
}