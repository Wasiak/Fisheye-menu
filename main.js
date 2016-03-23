var items = $('#main-menu li');

var item = items[0];
var lastItem = items[items.length - 1];

var topLimit = item.offsetTop - 10;
var bottomLimit = item.offsetTop + item.offsetHeight + 10;
var leftLimit = item.offsetLeft - (item.offsetWidth * 2);
var rightLimit = lastItem.offsetLeft + (lastItem.offsetWidth * 3);

var getItemOffsets = function(item) {
  var offsets = [
    item.offsetLeft,
    item.offsetLeft + item.offsetWidth
  ];
  return offsets;
};

var makeItemBigger = function(x, y) {
  // console.log('run makeItemBigger');
  $.each(items, function(index, item) {
    // console.log(index, item);
    var offsets = getItemOffsets(item);
    // console.log(offsets);
    console.log(x, y);
    
  });
};

$('body').mousemove(function(e) {
  $('#x').text(e.pageX);
  $('#y').text(e.pageY);
  var pointerX = e.pageX;
  var pointerY = e.pageY;
  if (pointerY > topLimit && pointerY < bottomLimit && 
      pointerX > leftLimit && pointerX < rightLimit) {
    makeItemBigger(pointerX, pointerY);
  }

});
