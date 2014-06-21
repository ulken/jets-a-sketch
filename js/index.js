$(document).ready(function () {
  var DEFAULTS = {size: 16, color: 'random'};
  var JaS = new JetSASketch('.grid-container');

  JaS.drawCells();

  var $controls = $('.controls');

  $controls.on('change', '#grid-size', function (event) {
    var size = $(this).val();
    JaS.setSize(size);
  });

  $controls.on('change', '#grid-color', function (event) {
    var color = $(this).val();
    JaS.setColor(color);
  });

  $controls.on('click', '#grid-clear', function () {
    JaS.clear();
  });

  $controls.on('click', '#grid-reset', function () {
    $('#grid-size').val(DEFAULTS.size);
    $('#grid-color').val(DEFAULTS.color);
    JaS.reset();
  });
});
