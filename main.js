var items = Array.prototype.slice.call(document.querySelectorAll('.fisheye-menu li'));

var item = items[0];
var itemsMiddle = items.map(function(item){ return item.offsetLeft + (item.offsetWidth / 2); });

var topLimit = item.offsetTop - 10;
var bottomLimit = item.offsetTop + item.offsetHeight + 10;
var itemWidth = item.offsetWidth;
var growRatio = 1.8;
var sizeDiff = Math.round(itemWidth * (growRatio - 1));

var makeItemBigger = function(x, y) {
  var verticallyCorrect = (y > topLimit && y < bottomLimit) ? true : false;
  items.forEach(function(item, index) { 
    var middlePoint = itemsMiddle[index];
    var limit = item.offsetWidth * 1.5;
    var dist = Math.abs(x - middlePoint);
    var ratio = (dist > limit) ? 1 : (dist / limit);
    ratio = verticallyCorrect ? ratio : 1;
    var newSize = itemWidth + ((1 - ratio) * sizeDiff);
    var newMarginTop = -((1 - ratio) * (sizeDiff / 2));
    item.style.width = newSize + 'px';
    item.style.marginTop = newMarginTop + 'px';
  });
};

document.body.addEventListener('mousemove', function(e) {
  var pointerX = e.pageX;
  var pointerY = e.pageY;
  makeItemBigger(pointerX, pointerY);
});
