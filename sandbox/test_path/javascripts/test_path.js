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
  //
  // $('.container').on('click', 'path', function () {
  //   addPattern(currFabric);
  //
  //   $(this).css({'fill': 'url("#' + currFabric.id + '")'});
  //
  // });

  // $('svg path').each(function () {
  //   if (!$(this).css('fill') || $(this).css('fill') === 'none') {
  //
  //     $(this).css({'fill': 'white'});
  //   }
  // });

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

  // function addPattern (currFabric) {
  //   if (!$('[id="' + currFabric.id + '"]').length) {
  //     var img = $(document.createElementNS('http://www.w3.org/2000/svg','image'));
  //     img.attr({
  //       x: 0,
  //       y: 0,
  //       height: 50,
  //       width: 50,
  //       'xlink:href': currFabric.url
  //     });
  //
  //     var pattern = $('<pattern id="' + currFabric.id + '" patternUnits="userSpaceOnUse" height="50" width="50"></pattern>');
  //
  //     pattern.append(img);
  //
  //     $('defs').append(pattern);
  //   };
  // }

  // <image x="0" y="0" height="50" width="50" xlink:href="' + currFabric.url + '"></image>

  // $('#greatphoto').attr({
  //   alt: 'Beijing Brush Seller',
  //   title: 'photo by Kelly Clark'
  // });

//
  // function findPattern (currFabric) {
  //   var patterns = $('defs');
  //   for (var i = 0; i < patterns.length; ++i) {
  //       if (patterns[i].id === currFabric.id) {
  //           return patterns[i];
  //       }
  //   }
  // }

  // function removePattern

  // $('.container').on('click', 'path', function () {
  //   var patterns = $('defs')
  //   $(this).css({'fill': 'url('')'})
  //
  //
  // })





  // $('svg path').each(function () {
  //   if (!$(this).css('fill') || $(this).css('fill') === 'none') {
  //
  //     $(this).css({'fill': 'white'});
  //   }
  // });
  //
  // $('.container').on('click', 'path', function () {
  //   $(this).css({'fill': 'url("#image")'});
  //
  // });



});
