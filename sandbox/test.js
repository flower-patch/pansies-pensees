$(function() {

  // $('h1').click(function(){
  //   alert('Testy');
  // });

  $("h1").click(function() {
    $(this).toggleClass("clickyHeader");
  });

//Clicky is not working. It's someting with the svg, not the jquery!

  $("#rect3336").click(function() {
    $("#rect3336").toggleClass("clicky");
  });

  $("rect").click(function() {
    $(this).attr('fill', 'green');
    //alert("testy clicky!");
  });

});
