var categorySize = 3;
var itemSize = 3;
var item = { 
    category: 0,
    index: 0,
    getCard : function() {
        return $('.card').eq(item["index"] + 3*item["category"]);
    },
    getImg : function() {
        return $("img").eq(item["index"] + 3*item["category"]);
    },
    getHeader: function() {
        return $(".card-header").eq(item["index"] + 3*item["category"]);
    }
};

var makePassive = function(item){
    var element = item.getCard();
    element.attr('class', 'card');
    element = item.getHeader();
    element.hide();
}

var makeActive = function(item){
    var element = item.getCard();
    element.attr('class', 'card bg-secondary');
    element = item.getHeader();
    element.show('slow');
}

var app = function(){
    $("img").css('transition', '0.2s');
    $(".card-header").hide('slow');
    makeActive(item);
    var update = function(){
        document.onkeydown = checkKey;
        function checkKey(e) {
            e = e || window.event;
            if (e.keyCode == '38') { // up arrow
                makePassive(item);
                if(item["category"] == 0)
                    item["category"] = categorySize - 1;
                else
                    item["category"] = item["category"] - 1;
                item["index"] = 0;
                makeActive(item);
            }
            else if (e.keyCode == '40') { // down arrow
                makePassive(item);
                item["category"] = (item["category"] + 1) % categorySize;
                item["index"] = 0;
                makeActive(item);
            }
            else if (e.keyCode == '37') { // left arrow
                makePassive(item);
                if(item["index"] == 0)
                    item["item"] = itemSize - 1;
                else
                    item["index"] = item["index"] - 1;
                makeActive(item);
            }
            else if (e.keyCode == '39') { // right arrow
                makePassive(item);
                item["index"] = (item["index"] + 1) % itemSize;
                makeActive(item);
            }
        }

    };
    setInterval(update, 10);
}

window.onload = app;