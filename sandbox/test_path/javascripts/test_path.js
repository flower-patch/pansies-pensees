$(function () {
  var svg = Snap('#svg');

  var palette = [{
    id: 'patterns-by-danny-ivan.jpg',
    url: 'http://www.crafthubs.com/thumbs/patterns-by-danny-ivan.jpg',
    size: {
      width: 50,
      height: 50
    }
  }, {
    id: 'fun-with-shapes-and-patterns.jpg',
    url: 'http://www.crafthubs.com/thumbs/fun-with-shapes-and-patterns.jpg',
    size: {
      width: 50,
      height: 50
    }
  }, {
    id: '44250.jpg',
    url: 'http://www.housefabric.com/assets/ProductDetail/44250.jpg',
    size: {
      width: 50,
      height: 50
    }
  }];

  function drawPalette(palette) {
    $('.palette').html(palette.map(function (fabric) {
      var li = $('<li class="fabric-preview"><img src="' + fabric.url +'"></li>');
      //.data(key, value) key= string 'fabric', value is fabric object
      // .data makes the thing a part of the DOM
      li.data('fabric', fabric);
      return li;
    }));
  }

  drawPalette(palette);

  var currFabric = palette[0];

  console.log(currFabric);


  $('.palette').on('click', '.fabric-preview', function () {
    currFabric = $(this).data('fabric');
    console.log(currFabric);
  });


  svg.selectAll('path').forEach(function (path) {
    //this only works with fill:none; svg's
    console.log(path.attr('fill'));
    if (!path.attr('fill') || path.attr('fill') === 'none') {
      console.log(path);
      path.attr('fill', 'white');
    }
  });


  svg.selectAll('path').forEach(function (path) {
    var prevent = false;
    var timer = 0;
    var delay = 200;

    path
      .click(function () {
      timer = setTimeout(function () {
        if (!prevent) {
          console.log('group clicked');
          getGroup(path);
        }
        prevent = false;
      }, delay);
      })
      .dblclick(function () {
        clearTimeout(timer);
        prevent = true;
        console.log('path clicked');
        applyFabricPatch(path);
      });

  });


// var timer = 0;
// var delay = 200;
// var prevent = false;
//
// $("#target")
//   .on("click", function() {
//     timer = setTimeout(function() {
//       if (!prevent) {
//         doClickAction();
//       }
//       prevent = false;
//     }, delay);
//   })
//   .on("dblclick", function() {
//     clearTimeout(timer);
//     prevent = true;
//     doDoubleClickAction();
//   });
//

  function applyFabricPatch (path) {
    //empty palette, nothing happens!
    if (!currFabric) return;
    //use id for snappy shtuffz
    var svgId = 'img_' + currFabric.id;
    //pattern is used here because of svg pattern tag
    var pattern = svg.select('#' + svgId);

    if (!pattern) {
      pattern = svg.image(currFabric.url, 0, 0, currFabric.size.width, currFabric.size.height)
       .toPattern(0, 0, currFabric.size.width, currFabric.size.height)
       .attr({ id: svgId });
    }

    path.attr('fill', pattern);
  }

  function getGroup (path) {
    //empty palette, nothing happens!
    if (!currFabric) return;
    //use id for snappy shtuffz
    var group = path.parent();
    console.log(group);

    group.selectAll('path').forEach(applyFabricPatch);
  }

});
