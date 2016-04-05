var fisheyeMenu = function(options) {
  // get all items from fisheye-menu
  var items = Array.prototype.slice.call(document.querySelectorAll('.fisheye-menu li'));
  var item = items[0];
  //get horizontal center point of each item
  var itemsMiddle = items.map(function(item){ return item.offsetLeft + (item.offsetWidth / 2); });

  // var itemsVertMiddle = items.map(function(item){ return item.offsetTop + (item.offsetHeight / 2); });
  var itemWidth = item.offsetWidth;
  // vertical limits of function running
  var topLimit = item.offsetTop - (options.verticalLimit || 10);
  var bottomLimit = item.offsetTop + item.offsetHeight + (options.verticalLimit || 10);
  // ratio of new size to default 
  var growRatio = options.growRatio || 1.8;
  // horizontal limit of grow reaction for single item
  var limit = item.offsetWidth * (options.horizontalLimit || 1.5);

  var sizeDiff = Math.round(itemWidth * (growRatio - 1));

  var removeGoDown = function(evt) {
    evt.target.parentNode.classList.remove('go-down');
  };
  var setListeners = function() {
    items.forEach(function(itm, index) {
      itm.addEventListener("transitionend", removeGoDown);
    });
  }();

  var makeItemBigger = function(x, y) {
    var verticallyCorrect = (y > topLimit && y < bottomLimit) ? true : false;
    
    // if mouse out from vertically cirrect area make items small with transition
    if (!verticallyCorrect && !item.parentNode.classList.contains('go-down')) {
        item.parentNode.classList.add('go-down');
    }

    items.forEach(function(item, index) { 
      var middlePoint = itemsMiddle[index];
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
};
