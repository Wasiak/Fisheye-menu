var items = $('#main-menu li');

var item = items[0];
var lastItem = items[items.length - 1];
var itemsMiddle = [];

var topLimit = item.offsetTop - 10;
var bottomLimit = item.offsetTop + item.offsetHeight + 10;
var itemWidth = item.offsetWidth;
var growRatio = 1.8;
var sizeDiff = Math.round(itemWidth * (growRatio - 1));

var getItemMiddle = function(item) {
  var point = item.offsetLeft + (item.offsetWidth / 2);
  return point;
};

var getAllItemsMiddle = function() {
  $.each(items, function(index, item) {
    var middle = getItemMiddle(item);
    itemsMiddle.push(middle);
  });
}();

var makeItemBigger = function(x, y) {
  var verticallyCorrect = (y > topLimit && y < bottomLimit) ? true : false;
  $.each(items, function(index, item) {
    var middlePoint = itemsMiddle[index];
    var limit = item.offsetWidth * 1.5;
    var dist = Math.abs(x - middlePoint);
    var ratio = (dist > limit) ? 1 : (dist / limit);
    ratio = verticallyCorrect ? ratio : 1;
    var newSize = itemWidth + ((1 - ratio) * sizeDiff);
    // I know margin-top value but later I wil get it by code
    // 10 is initial margin 
    var newMarginTop = 10 - ((1 - ratio) * (sizeDiff / 2));

    // I don't know why this jQuery doesn't work but later I'll fix it
    // item.css({
    //   'width': newSize + 'px'
    // });
    item.style.width = newSize + 'px';
    item.style.marginTop = newMarginTop + 'px';
  });
};

$('body').mousemove(function(e) {
  var pointerX = e.pageX;
  var pointerY = e.pageY;
  makeItemBigger(pointerX, pointerY);
});
