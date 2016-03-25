window.onload = function() {
  // get all items from fisheye-menu
  var items = Array.prototype.slice.call(document.querySelectorAll('.fisheye-menu li'));
  var item = items[0];
  //get horizontal center point of each item
  var itemsMiddle = items.map(function(item){ return item.offsetLeft + (item.offsetWidth / 2); });
  // vertical limits of function running
  var topLimit = item.offsetTop - 10;
  var bottomLimit = item.offsetTop + item.offsetHeight + 10;
  var itemWidth = item.offsetWidth;
  // ratio of new size to default 
  var growRatio = 1.8;
  var sizeDiff = Math.round(itemWidth * (growRatio - 1));

  var makeItemBigger = function(x, y) {
    var verticallyCorrect = (y > topLimit && y < bottomLimit) ? true : false;
    items.forEach(function(item, index) { 
      var middlePoint = itemsMiddle[index];
      // horizontal limit of grow reaction for single item
      var limit = item.offsetWidth * 1.5;
      // horizontal distance from center point to cursor
      var dist = Math.abs(x - middlePoint);
      // if distance is bigger than limit in any direction 
      // ratio is equal to 1 (item size not changed)
      var ratio = (dist > limit) ? 1 : (dist / limit);
      ratio = verticallyCorrect ? ratio : 1;
      var newSize = itemWidth + ((1 - ratio) * sizeDiff);
      // add negative top margin to item equal to half size difference
      // to stay item vertical centered
      var newMarginTop = -((1 - ratio) * (sizeDiff / 2));
      item.style.width = newSize + 'px';
      item.style.marginTop = newMarginTop + 'px';
    });
  };

  document.body.addEventListener('mousemove', function(e) {
    // position of cursor
    var pointerX = e.pageX;
    var pointerY = e.pageY;
    makeItemBigger(pointerX, pointerY);
  });
}();
