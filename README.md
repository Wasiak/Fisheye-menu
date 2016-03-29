## FISHEYE-MENU by [@Wasiak](https://github.com/Wasiak) ##

Interface with icons geting bigger when cursor is closer to icon horizontal center point
### [DEMO](http://wasiak.github.io/Fisheye-menu/) ###

![screen](https://raw.githubusercontent.com/Wasiak/Fisheye-menu/master/images/screen.jpg)

Pure JS, no jQuery.

Add class '.fisheye-menu' to ul with images in li's

```javascript
<ul class='fisheye-menu'>
    <li>
      <a href=''>
        <img src='images/Legia.png'>
      </a>
    </li>
    ...
</ul>    
```

run a function and enjoy your fisheye menu f.e.

```javascript
window.onload = fisheyeMenu;
```

Possibility to set your own icon grow ratio and limit of icon reaction

```javascript
// vertical limits of function running
var topLimit = item.offsetTop - 10;
var bottomLimit = item.offsetTop + item.offsetHeight + 10;
// ratio of new size to default 
var growRatio = 1.8;
// horizontal limit of grow reaction for single item
var limit = item.offsetWidth * 1.5;
```
