/**
 * Created by JetBrains WebStorm.
 * User: yunhasnawa
 * Date: 6/6/12
 * Time: 11:05 PM
 * To change this template use File | Settings | File Templates.
 */

function Divbar(div) {

    this.div = div;
    this.data = [];
    this.colors = [];

    this._min = 0;
    this._max = 0;
    this._grid = {};
    this._ceiled = [];
}

Divbar.prototype = {

    init: function(data, colors) {

        this.data = data;

        var dataLength = this.data.length;

        //console.log(dataLength, colors);

        if((colors == null || colors.length == 0 || colors == undefined) && dataLength > 0) {

            //console.log('Generating Colors..');

            this.colors = this.generateRandomColors(dataLength);

        } else {

            this.colors = colors;

        }

        this._findMinMax();

        this._normalizeDataValue();

        this._createGrid();

    },

    generate: function() {

        this.div.appendChild(this._grid);

    },

    generateRandomColors: function(count) {

        var colors = [];

        //console.log('Color count -> ' + count);

        for(var i=0; i<count; i++) {

            //console.log('Repeat until count');

            var ffffff = 16777215;

            var rand = Math.floor((Math.random() * ffffff));

            var strRand = rand.toString(16);

            var color = '#' + strRand;

            //console.log('Color --> ' + color);

            colors.push(color);

        }

        return colors;

    },

    _createGrid: function() {

        var dataCount = this.data.length;

        //console.log('Data count ---> ' + dataCount);

        var gridContainer = this._createGridContainer(dataCount);

        for(var i=0; i<10; i++) {
            var row = this._createRow(dataCount);
            for(var j=0; j<dataCount*2; j++) {
                var col = this._createCol();
                col = this._makeActive(col, i, j);
                row.appendChild(col);
            }
            gridContainer.appendChild(row);
        }

        this._grid = gridContainer;

    },

    _findMinMax: function() {

        var dataDummy = this._copyArray(this.data);

        dataDummy.sort();

        var last = dataDummy.length - 1;

        this._min = dataDummy[0];
        this._max = dataDummy[last];

    },

    _createRow: function(colCount) {

        var row = document.createElement('div');

        var width = 2 * (colCount * (20 + 1));

        var pxWidth = String(width) + 'px';

        //console.log('Row px width -> ' + pxWidth);

        var css = row.style;

        css.borderBottom = '1px solid blue';//#CCCCCC';
        css.height = '19px'; // Because of col top border (20-1)
        css.width = pxWidth;
        css.padding = '0';
        css.margin = '0';

        return row;
    },

    _createCol: function() {

        var col = document.createElement('div');

        var css = col.style;

        css.borderLeft = '1px solid green';//#CCCCCC';
        css.width = '20px';
        css.height = '20px';
        css.display = 'inline-block';
        css.margin = '0';
        css.padding = '0';

        return col;
    },

    _createGridContainer: function(colCount) {

        var gridContainer = document.createElement('div');

        var width = 2 * (colCount * (20 + 1));
        var height = (10 * (20)) + 1;

        var pxWidth = String(width) + 'px';
        var pxHeight = String(height) + 'px';

        var css = gridContainer.style;

        css.borderTop = '1px solid red';//#CCCCCC';
        css.borderRight = '1px solid red';//#CCCCCC';
        css.width = pxWidth;
        css.height = pxHeight;

        return gridContainer;
    },

    _normalizeDataValue: function() {

        var normal = [];

        for(var i=0; i<this.data.length; i++) {
            var ceiled = this.data[i]/this._max * 10;
            ceiled = Math.ceil(ceiled);
            normal.push(ceiled);
        }

        this._ceiled = normal;
        //console.log(normal);
    },

    _makeActive: function(col, rowNum, colNum) {

        if(colNum % 2 != 0) {

            var curDataIndex = Math.floor(colNum / 2);

            var begin = Math.abs(this._ceiled[curDataIndex] - 10);
            var color = this.colors[curDataIndex];

            if(rowNum >= begin) {

                var css = col.style;

                css.backgroundColor = color;

                css.borderTop = '1px solid ' + color;

                /*var curHeight = Number(String(css.height).replace('px', ''));
                var newHeight = --curHeight;

                var height = String(newHeight) + 'px';

                css.height = height;*/
            }

        }

        return col;

    },

    _copyArray: function(target) {

        var duplicate = [];

        for(var i=0; i<target.length; i++) {

            duplicate[i] = target[i];

        }

        return duplicate;

    }

}