var model = {

	board: {
		rows: 0,
		columns: 0,
		pieces: 0,

		selected: null, 

		positions: [],

		drawTable: function(rows, columns) {
			board = document.querySelector("main").appendChild(document.createElement("div"));
			board.className = "board";

			this.rows = rows;
			this.columns = columns;

			actualRow = 0;
			actualColumn = 0;
			for (var i=0; i< rows*columns; i++) {
				isWhite = parseInt((i / columns) + i) % 2 == 0;
				cell = document.createElement("div");
				cell.setAttribute("row", actualRow);
				cell.setAttribute("column", actualColumn);
				cell.className = isWhite ? 'cell cell-white' : 'cell cell-black';
				cell.addEventListener('click', this.selectCell);
				board.appendChild(cell);	 

				if (actualColumn == 0)
					this.positions[actualRow] = [];
				
				this.positions[actualRow][actualColumn] = new model.Piece(actualRow, actualColumn);

				actualColumn++;
				if (actualColumn >= columns) {
					actualColumn = 0;
					actualRow++;
				}
			}
		},

		putPieces: function (pieces) {
			this.pieces = pieces;

			blackCells = [].slice.call(document.getElementsByClassName("cell-black"));
			whiteCells = [].slice.call(document.getElementsByClassName("cell-black"));
			whiteCells.reverse();

			totalBlack = 0;
			totalWhite = 0;

			for (var i=0; i<this.rows*this.columns/2; i++) {

				blackRow = blackCells[i].getAttribute("row");
				blackColumn = blackCells[i].getAttribute("column");
				whiteRow = whiteCells[i].getAttribute("row");
				whiteColumn = whiteCells[i].getAttribute("column");

				if (totalBlack < pieces) {
					this.positions[blackRow][blackColumn] = new model.WhitePiece(blackRow, blackColumn);
					totalBlack++;
				}

				if (totalWhite < pieces) {
					this.positions[whiteRow][whiteColumn] = new model.BlackPiece(whiteRow, whiteColumn);
					totalWhite++;
				}
			}
		},
		selectCell: function (event) {
			console.log("aqui");
			var cell = this;
			var row = cell.getAttribute("row");
			var column = cell.getAttribute("column");
			var selected = model.board.selected;

			model.board.clearHighlights();
			var piece = model.board.positions[row][column];
			if (selected instanceof model.Piece) {
				selected.selected = false;
				selected.findCell().className = selected.findCell().className.replace(/\b selected\b/,'');
			}

			if (!piece.isEmpty()) {
				piece.selected = true;
				model.board.selected = piece;
				cell.className += " selected";
				piece.highlightMoves();
			}

		},

		clearHighlights: function () {
			[].slice.call(document.getElementsByClassName("highlight")).forEach(function (element, index, array) {
				element.className = element.className.replace(/\b highlight\b/,'');
			});
		},

		isOutOfBounds: function (row, column) {
			return row >= model.board.rows || row < 0 || column >= model.board.columns || column < 0;
		}

	},

	Piece: function (row, column) {
		this.row = parseInt(row);
		this.column = parseInt(column);
		this.src = "";
		this.selected = false;

		this.changePosition = function () {
			var row = this.getAttribute("row");
			var column = this.getAttribute("column");
			console.log(row, column, this);
		}

		this.draw = function () {
			if (this.src != "") {
				var cell = this.findCell();
				var img = document.createElement("img");
				img.src = this.src;
				cell.appendChild(img);
			}
		}
		this.highlightMove = function(row, column) {
			if(!model.board.isOutOfBounds(row, column)) {
				var cellTo = model.board.positions[row][column];
				if (cellTo.isEmpty()) {
					cellTo.findCell().addEventListener('click', this.changePosition);
					cellTo.findCell().className += " highlight";
				}
			}
		}

		this.highlightMoves = function () {
			this.highlightMove(this.row+1, this.column+1);
			this.highlightMove(this.row-1, this.column-1);
			this.highlightMove(this.row-1, this.column+1);
			this.highlightMove(this.row+1, this.column-1);
		}

		this.isEmpty = function () {
			return true;
		}

		this.findCell = function () {
			return document.querySelectorAll('div[row="'+row+'"][column="'+column+'"]')[0];
		}

		this.draw();

	},

	BlackPiece: function (row, column) {
		this.__proto__ = new model.Piece(row, column);
		this.src = 'img/black.png';

		this.isEmpty = function () {
			return false;
		}

		this.draw();

	},

	WhitePiece: function (row, column) {
		this.__proto__ = new model.Piece(row, column);
		this.src = 'img/white.png';

		this.isEmpty = function () {
			return false;
		}

		this.draw();

	}

};

var init = function() {
	model.board.drawTable(8,8);
	model.board.putPieces(5);
}

init();