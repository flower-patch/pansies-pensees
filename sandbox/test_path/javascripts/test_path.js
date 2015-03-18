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
    // required arbitrary boolean
    var prevent = false;
    // defines the functions called in timeout
    var timer = 0;

    path
      .click(function () {
      timer = setTimeout(function () {
        if (!prevent) {
          getGroup(path);
        }
        prevent = false;
      }, 200);
      })
      .dblclick(function () {
        clearTimeout(timer);
        prevent = true;
        applyFabricPatch(path);
      });

  });


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
