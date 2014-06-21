window.JetSASketch = (function($) {

  var DEFAULTS = {
    gridSize: 16,
    cellColor: 'random'
  };

  function Cell(size, color) {
    var gap = size / 10;
    var dimension = size - 2 * gap;

    this.width = dimension;
    this.height = dimension;
    this.gap = gap;
    this.color = color;
  }

  Cell.prototype = {
    constructor: Cell,

    render: function () {
      var self = this;
      var $cell = $('<div/>', {
        'class': 'cell'
      });
      this.$cell = $cell;

      $cell.width(this.width);
      $cell.height(this.height);
      $cell.css('margin', this.gap);

      $cell.hover(function () {
        self.paint();
      });

      return $cell[0];
    },

    paint: function () {
      this.$cell.css('background-color', this.color);
    },

    setColor: function (color) {
      this.color = color;
    },

    clear: function () {
      this.$cell.css('background-color', 'transparent');
    }
  };

  function JetSASketch(element, _options) {
    this.$grid = $(element);
    this.options = $.extend({}, _options, DEFAULTS);

    this.gridWidth = this.$grid.width();
  }

  JetSASketch.prototype = {
    constructor: JetSASketch,

    drawCells: function () {
      this.calculateDimensions();
      this.cells = this.createCells();
      var cells = this.cells.map(function (cell) {
        return cell.render();
      });

      this.$grid.html(cells);
    },

    createCells: function () {
      var options = this.options;
      var size = this.cellSize;
      var color = options.cellColor === 'random' ? getRandomColor : options.cellColor;
      var cells = [];

      for (var i = 0, cell; i < this.cellCount; i++) {
        cell = new Cell(size, color);
        cells.push(cell);
      }

      return cells;
    },

    calculateDimensions: function () {
      var gridSize = this.options.gridSize;
      var gridWidth = this.gridWidth;

      this.cellCount = gridSize * gridSize;
      this.cellSize = gridWidth / gridSize;
      console.log(this);
    },

    setSize: function (size) {
      this.options.gridSize = size;
      this.drawCells();
    },

    setColor: function (color) {
      this.options.cellColor = color;
      this.cells.forEach(function (cell) {
        cell.setColor(color);
      });
    },

    clear: function () {
      this.cells.forEach(function (cell) {
        cell.clear();
      });
    },

    reset: function () {
      this.options = $.extend({}, DEFAULTS);
      this.drawCells();
    }
  };

  return JetSASketch;

  // Utils

  function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

})(jQuery);
