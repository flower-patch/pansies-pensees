$(function () {
  var svg = Snap('#svg');

  var palette = [{
    id: 'fabrics-by-danny-ivan.jpg',
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
    $('.palette').html(palette.map(function (pattern) {
      var li = $('<li class="pattern-preview"><img src="' + pattern.url +'"></li>');
      li.data('pattern', pattern);
      return li;
    }));
  }

  drawPalette(palette);

  var currFabric = palette[0];

  console.log(currFabric);

  $('.palette').on('click', '.pattern-preview', function () {
    currFabric = $(this).data('pattern');
    console.log(currFabric);
  });

  svg.selectAll('path').forEach(function (path) {
    console.log(path.attr('fill'));
    if (!path.attr('fill') || path.attr('fill') === 'none') {
      console.log(path);
     path.attr('fill', 'white');
    }
  });

  svg.selectAll('path').forEach(function (path) {
    path.click(function () {
      if (!currFabric) return;
      var svgId = 'img_' + currFabric.id;

      var pattern = svg.select('#' + svgId);

      if (!pattern) {
        pattern = svg.image(currFabric.url, 0, 0, currFabric.size.width, currFabric.size.height)
         .toPattern(0, 0, currFabric.size.width, currFabric.size.height)
         .attr({ id: svgId });
      }

      this.attr('fill', pattern);
    });
  });


});
