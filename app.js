var categorySize = 3;
var itemSize = 6;
var scaleFactor = 0.8;
var item = { 
    category: 0,
    index: 1,
    getCard : function(index) {
        return $('.card').eq(index + 3*item["category"]);
    },
    getImg : function(index) {
        return $("img").eq(index + 3*item["category"]);
    }
};

var makePassive = function(item, index){
    var element = item.getCard(index);
    element.attr('class', 'card');
    element = item.getImg(index);
    element.attr('src', 'img/' + ((item["category"] + 1) + '-' + (item["index"] + 1) + '.png'));
    element.css({
        'opacity': '0.2',
        'transform': 'scale(0.8)'
    });

}

var makeActive = function(item, index){
    var element = item.getCard(index);
    element.attr('class', 'card bg-secondary');
    element = item.getImg(index);
    element.attr('src', 'img/' + ((item["category"] + 1) + '-' + (item["index"] + 1) + '.png'));
    element.css({
        'opacity': '1',
        'transform': 'scale(0.85)'
    });
}

var app = function(){
    $(".card").css('overflow-y', 'hidden');
    makeActive(item, 1);
    var grow = true;
    var update = function(){
        if(grow) scaleFactor += 0.007;
        else     scaleFactor -= 0.007;
        item.getImg(1).css('transform', 'scale(' + scaleFactor + ')');
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            if (e.keyCode == '38') { // up arrow
                item["index"] = 0;
                makePassive(item, 0);
                item["index"] = 1;
                makePassive(item, 1);
                item["index"] = 2;
                makePassive(item, 2);
                if(item["category"] == 0)
                    item["category"] = categorySize - 1;
                else
                    item["category"] = item["category"] - 1;
                item["index"] = 1;
                makeActive(item, 1);
            }
            else if (e.keyCode == '40') { // down arrow
                item["index"] = 0;
                makePassive(item, 0);
                item["index"] = 1;
                makePassive(item, 1);
                item["index"] = 2;
                makePassive(item, 2);
                item["category"] = (item["category"] + 1) % categorySize;
                item["index"] = 1;
                makeActive(item, 1);
            }
            else if (e.keyCode == '37') { // left arrow
                makePassive(item, 2);
                if(item["index"] == 0)
                    item["index"] = itemSize - 1;   
                else
                    item["index"] = item["index"] - 1;
                console.log(item["index"]);
                makeActive(item, 1);
                item["index"]--;
                if(item["index"] < 0) item["index"] += itemSize;
                makePassive(item, 0);
                item["index"] = (item["index"] + 1) % itemSize;
            }
            else if (e.keyCode == '39') { // right arrow
                makePassive(item, 0);
                console.log(item["index"]);
                item["index"] = (item["index"] + 1) % itemSize;
                makeActive(item, 1);
                console.log(item["index"]);
                item["index"] = (item["index"] + 1) % itemSize;
                makePassive(item, 2);
                console.log(item["index"]);
                item["index"]--;
                if(item["index"] < 0) item["index"] += itemSize;
            }
        }

        if(scaleFactor >= 0.87) grow = false;
        else if(scaleFactor <= 0.8) grow = true;
    };
    setInterval(update, 50);
}

window.onload = app;
