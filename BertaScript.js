var PlayerTurn = 1;
var TurnCount = 0;
var colour;
var Restart = false;
var IsCoinMove = false;
var Board =
	[["C", " ", " ", " "],
	["LR", "B", "B", "B"],
	["LR", "LR", "LR", "B"],
	[" ", " ", " ", "C"]];

var BoardCopy = [[], [], [], []];

// Pushes the Board to the copy (copies the board)
function BoardToBC() {
	for (var x = 0; x < 4; x++) {
		//replaces the previous board copy with the new one
		BoardCopy[x].splice(0, 4)
		for (var i = 0; i < 4; i++) {
			BoardCopy[x].push(Board[x][i])
		}
	}
}

// Loads the board onto the screen when it is called
function PlayGame() {
	//the original board with the starting positions
	var Board =
		[["C", " ", " ", " "],
		["LR", "B", "B", "B"],
		["LR", "LR", "LR", "B"],
		[" ", " ", " ", "C"]];

	//calls function BoardToBC
	BoardToBC()

	//Loops through the baord and giving all the squares a function and a colour
	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			if (Board[x][i] == "C") {
				// gives the square a colour
				// gives the square an onclick event that when click runs its own function
				// for all colours
				document.getElementById(x + "" + i).style.backgroundColor = "yellow";
				document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
			} else if (Board[x][i] == "LR") {
				document.getElementById(x + "" + i).style.backgroundColor = "pink";
				document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
			} else if (Board[x][i] == "B") {
				document.getElementById(x + "" + i).style.backgroundColor = "blue";
				document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
			} else if (Board[x][i] == " ") {
				document.getElementById(x + "" + i).style.backgroundColor = "black";
				document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
			}
		}
	}

};

// called when a square is clicked controls all the movemtent
function Move(z) {
	var a = z.substring(0, 1);
	var b = z.substring(1, 2);

	//checks if turn count is less than 4 if it is lets the player move
	if (TurnCount < 4) {
		if (PlayerTurn == 1) {
			//sets the colour after it checks whos turn it is
			colour = "R"
			//makes it so you cant place on a coin, the other colour and the colours that have already been placed
			if (Board[a][b] != "C" && Board[a][b] != "B" && Board[a][b] != "R") {
				//changes the square colour to red
				document.getElementById(z).style.backgroundColor = "red";
				Board[a][b] = "R";
				TurnCount = TurnCount + 1;

			}
		}

		//does the same thing for blue
		if (PlayerTurn == 2) {
			colour = "B"
			if (Board[a][b] != "C" && Board[a][b] != "B" && Board[a][b] != "R") {
				document.getElementById(z).style.backgroundColor = "blue";
				Board[a][b] = "B";
				TurnCount = 4

			}
		}
	}
	//checks if turncount equals 4 and asks if the coin is moved if it hasnt then runs
	if (TurnCount == 4 && IsCoinMove == false) {
		//checks to make sure that the L that has been placed is an actual L
		if (CheckForL(colour) == true) {
			//gets rid of light squares
			ClearBoard()
			//when they click on a coin it turns green if they click on anything else it wont change
			if (Board[a][b] == "C") {
				document.getElementById(z).style.backgroundColor = "green";
				Board[a][b] = " "
				IsCoinMove = true
			}
		}
		//runs when the placed squares is not in a shape of an L
		else {
			//resets the board back to the start of the players go
			for (var x = 0; x < 4; x++) {
				Board[x].splice(0, 4)
				for (var i = 0; i < 4; i++) {
					Board[x].push(BoardCopy[x][i])
				}
			}
			Restart = true
			TurnCount = 0
			NextPlayer()

		}
	}
	//checks if four squares have been placed and the coin they want to move has been picked
	else if (TurnCount == 4 && IsCoinMove == true) {
		//doesnt allow the user to place coin onto another coin or colour squares
		if (Board[a][b] != "C" && Board[a][b] != "B" && Board[a][b] != "R") {
			document.getElementById(z).style.backgroundColor = "yellow";
			Board[a][b] = "C";
			TurnCount = 0;
			IsCoinMove = false
			BoardToBC()
			ClearBoard()
			NextPlayer()

			//checks for how many moves there are and if there are none runs the winning player script
			if (CheckForMoves(colour) == 0) {
				//flips the player
				NextPlayer()

				//loops through the board
				for (var x = 0; x < 4; x++) {
					for (var i = 0; i < 4; i++) {

						//changes all the squares to block colours

						if (Board[x][i] == "LB") {
							Board[x][i] = "B"
							document.getElementById(x + "" + i).style.backgroundColor = "Blue";
							document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
						}
						if (Board[x][i] == "LR") {
							Board[x][i] = "R"
							document.getElementById(x + "" + i).style.backgroundColor = "Red";
							document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
						}
					}
				}

				//takes you to new page where it tells you who won and then allows you to go to home page 
				//or replay the game

				if (colour == "R") {
					alert("Red wins the game")
					console.log("Red wins the game")
					document.write("<center><h1>Red wins the game</h1><button><a href='GameScr.html'>Play again?</Button> <Button><a href='index.html'>Home</Button></center>")
				}
			}
			BertaMove()
		}
	}





}

//changes to the next player and clears the board 
function NextPlayer() {
	//checks to see if it was called because of an L or to switch players
	if (Restart == false) {
		//checks player
		if (PlayerTurn == 1) {
			//switches player to opposite
			PlayerTurn = 2
			//loops through the board
			for (var x = 0; x < 4; x++) {
				for (var i = 0; i < 4; i++) {
					if (Board[x][i] == "B") {
						Board[x][i] = "LB"
						document.getElementById(x + "" + i).style.backgroundColor = "LightBlue";
						document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
					}
				}
			}

		}
		//does the same as above for the blue player
		else if (PlayerTurn == 2) {
			PlayerTurn = 1
			for (var x = 0; x < 4; x++) {
				for (var i = 0; i < 4; i++) {
					if (Board[x][i] == "R") {
						Board[x][i] = "LR"
						document.getElementById(x + "" + i).style.backgroundColor = "pink";
						document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
					}
				}
			}
		}
	}
	//restarting because of a misplaced L
	else if (Restart == true) {
		if (PlayerTurn == 2) {
			PlayerTurn = 1
			//loops through the board and replaces the colours with the colours the need to be
			for (var x = 0; x < 4; x++) {
				for (var i = 0; i < 4; i++) {
					if (Board[x][i] == "LB") {
						Board[x][i] = "B"
						document.getElementById(x + "" + i).style.backgroundColor = "LightBlue";
						document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
					} else if (Board[x][i] == " ") {
						Board[x][i] = " "
						document.getElementById(x + "" + i).style.backgroundColor = "black";
						document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)")
					}
				}
			}
		} else if (PlayerTurn == 1) {
			//loops through the board and replaces the colours with the colours the need to be
			console.log(Board)
			PlayerTurn = 2
			for (var x = 0; x < 4; x++) {
				for (var i = 0; i < 4; i++) {
					if (Board[x][i] == "LR") {
						Board[x][i] = "R";
						document.getElementById(x + "" + i).style.backgroundColor = "pink";
						document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
					} else if (Board[x][i] == " ") {
						Board[x][i] = " "
						document.getElementById(x + "" + i).style.backgroundColor = "black";
						document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)")
					}
				}
			}
		}
		//sets restart to false
		Restart = false
		NextPlayer()
	}
}

// resets the board of all different colours except yellow, red and blue
function ClearBoard() {
	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			if (Board[x][i] == "LR" || Board[x][i] == "LB" || Board[x][i] == " ") {
				Board[x][i] = " "
				document.getElementById(x + "" + i).style.backgroundColor = "black";
				document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
			}
		}
	}
}

// checks for an L shape in the colours
function CheckForL(colour) {
	var isL = false;
	var count = 0
	var samePlc = 0
	//loops through the board to make sure a peice was moved as cant be in same position
	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			//checks all the empty squares
			if (Board[x][i] == " ") {
				if (Board[x][i] != BoardCopy[x][i]) {
					break
				} else {
					//adds one to same place
					samePlc = samePlc + 1
				}
				if (samePlc == 6) {
					//if in same postion returns false
					return isL
				}
			}
		}
	}

	//loops through board
	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			if (count == 2) {
			} else {

				//checks colour and the ones next to its colour 
				//and the one next to that or below if vertical L
				// this will check if its horizontal or vertical 
				//once checked if its horizontal it will then look for the peice on its own the bottom 
				//of the L.

				if (Board[x][i] == colour) {
					if (Board[x][i + 1] == colour && Board[x][i + 2] == colour) {
						//if it is horizontal in these places it cannot have L in certain places
						if (x != 0 && x != 3) {
							//checks all four postions around the main 3
							if (Board[x + 1][i] == colour || Board[x - 1][i] == colour || Board[x + 1][i + 2] == colour || Board[x - 1][i + 2] == colour) {
								//returns true 
								isL = true
								return isL
							}
						} else if (x == 0) {
							//search if x = 0 can only be in two spaces
							if (Board[x + 1][i] == colour || Board[x + 1][i + 2] == colour) {
								//console.log("Can confrim L")
								isL = true
								return isL
							}
						} else if (x == 3) {
							//search if x = 3 can only be in two spaces
							if (Board[x - 1][i] == colour || Board[x - 1][i + 2] == colour) {
								isL = true
								return isL
							} else {
								//not an L as the last bit is not connected to the L
								return isL
							}
						}
					}




					//this checks for a veritcal L so if the 
					else if (x < 2 && Board[x + 1][i] == colour && Board[x + 2][i] == colour) {
						//if it is vertical in these places it cannot have L in certain places
						if (i != 0 && i != 3) {
							//checks all four postions around the main 3
							if (Board[x][i + 1] == colour || Board[x][i - 1] == colour || Board[x + 2][i + 1] == colour || Board[x + 2][i - 1] == colour) {
								//returns true 
								isL = true
								return isL
							}
						} else if (i == 0) {
							//search if i = 0 can only be in two spaces
							if (Board[x][i + 1] == colour || Board[x + 2][i + 1] == colour) {
								//returns true
								isL = true
								return isL

							} else {
								return isL
							}

						} else if (i == 3) {
							//search if i = 3 can only be in two spaces
							if (Board[x][i - 1] == colour || Board[x + 2][i - 1]) {
								//returns true
								isL = true
								return isL

							} else {
								return isL
							}
						}
					}

					else {
						//adds one to count if count goes over 2 there is not an L as it checks all the possibel postions this is uesd for when the L is in the top left or horizontal and the last bit is above
						count = count + 1

					}
				}
			}
		}
	}
	//returns false just to catch anything that doesnt pass through
	return isL
}

// checks for Possilbe moves of the next player if no move avaliable anounces win
function CheckForMoves(colour) {
	var posiMOves1 = [
		[1, 0, 0, 0, 1, 0, 0, 0, 1, 1], // vertical L bottom right 0
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 1], // vertical L top left 1
		[1, 1, 1, 0, 1], // horizontal one bottom left 2
		[1, 0, 1, 1, 1], // horizontal one top right 3
		[1, 0, 0, 0, 1, 0, 0, 1, 1], // vertical L buttom left 4
		[1, 1, 0, 0, 1, 0, 0, 0, 1], // vertical L top right 5
		[1, 1, 1, 0, 0, 0, 1], // horizontal bottom right 6
		[1, 0, 0, 0, 1, 1, 1], // horizontal top left 7
	]


	//certain postions that can only have a specific type of L
	////x=0, i==5,0 		// just right sides
	////x=3,7,11,15   i==4,0		// just  left L 
	//x=8,9,12,13  i==0,1,4,5 		// just horizontal
	// x=2,6 	 i ==0,1,4,5 		//just vert


	//converts the array into a string and removes the colour whos go it is
	var newArrTwoD = [];
	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			if (Board[x][i] == colour || Board[x][i] == "C") {
				newArrTwoD = newArrTwoD + Board[x][i]
			} else {
				newArrTwoD = newArrTwoD + "_"
			}
		}
	}
	//has to be set to minus 1 as it will count the postion it is currently in and you cant place in the same postion
	var howMany = -1;

	//8 times all the different rotations of the L
	for (var i = 0; i < posiMOves1.length; i++) {
		// 16 times one for every square on the board
		for (var x = 0; x <= 16; x++) {
			//no L shapes can start in this postion so it just skips onto the next postion
			if (x != 12 || x != 13 || x != 14 | x != 15) {
				var posileng = posiMOves1[i].length
				var count = 0
				//10,5,9,7


				//loops through for the length of the L shape and what it looks like eg 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 is the L for vertical bottom right
				for (var z = 0; z <= posileng; z++)
					//this long if statement checks all the postions where certain L's cant be so the x determines what square it is on and the i is what L it is eg. cant put a horrizontal on the last coloum.
					if (((x == 0 || x == 4) && (i == 1 || i == 4 || i == 3))
						|| ((x == 3 || x == 7) && (i == 5 || i == 0 || i == 7 || i == 6 || i == 1 || i == 2))
						|| ((x == 8 || x == 9) && (i == 0 || i == 1 || i == 4 || i == 5 || i == 3))
						|| ((x == 10 || x == 11) && (i == 0 || i == 1 || i == 4 || i == 5 || i == 7 || i == 2))
						|| ((x == 2 || x == 6) && (i == 7 || i == 6 || i == 2))) {
					} else {
						//once it knows its not one of them it then sees if there is an empty space and if there is compares it to the shape of the L
						if (newArrTwoD[x + z] == "_" && posiMOves1[i][z] == 1) {
							count = count + 1
							//console.log("dumbb " + "x:" + x + " i:" + i + " count:" + count + " z:" + z)
							//there will be count = 4 when it has found all four peices of the L otherwise it wont run
							if (count == 4) {
								//adds one to how many moves there are
								//	console.log("x:" + x + " i:" + i + " count:" + count)
								//	console.log(howMany)
								howMany = howMany + 1
								count = 0;
							}

						}
						//if its not an empty space and it is a 1 then there cant be an L there
						else if (newArrTwoD[x + z] != "_" && posiMOves1[i][z] != 0) {
							break
						}
					}

			}
		}
	}
	//returns how many moves there are
	console.log(howMany)
	return howMany

}



function BertaMove() {
	console.log("hello im berta")
	var BestSoFar = 100;
	var BertasChoice = [0, 0]
	var BestPlace = [0, 0];
	var BertasBoard = [];
	var BertaHowMany = 0;
	var BertasBoardCopy = [[], [], [], []];

	for (var x = 0; x < 4; x++) {
		//replaces the previous board copy with the new one
		BertasBoardCopy[x].splice(0, 4)
		for (var i = 0; i < 4; i++) {
			if (Board[x][i] == "LB") {
				BertasBoardCopy[x].push(" ")
			} else {
				BertasBoardCopy[x].push(Board[x][i])
			}

		}
	}


	var BertasLs = [
		[1, 0, 0, 0, 1, 0, 0, 0, 1, 1], // vertical L bottom right 0
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 1], // vertical L top left 1
		[1, 1, 1, 0, 1], // horizontal one bottom left 2
		[1, 0, 1, 1, 1], // horizontal one top right 3
		[1, 0, 0, 0, 1, 0, 0, 1, 1], // vertical L buttom left 4
		[1, 1, 0, 0, 1, 0, 0, 0, 1], // vertical L top right 5
		[1, 1, 1, 0, 0, 0, 1], // horizontal bottom right 6
		[1, 0, 0, 0, 1, 1, 1], // horizontal top left 7
	]

	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			if (Board[x][i] == colour || Board[x][i] == "C") {
				BertasBoard = BertasBoard + Board[x][i]
			} else {
				BertasBoard = BertasBoard + "_"
			}
		}
	}

	console.log(BertasBoard)

	//8 times all the different rotations of the L
	for (var i = 0; i < BertasLs.length; i++) {
		// 16 times one for every square on the board
		for (var x = 0; x <= 16; x++) {
			//no L shapes can start in this postion so it just skips onto the next postion
			if (x != 12 || x != 13 || x != 14 | x != 15) {
				var posileng = BertasLs[i].length
				var count = 0
				//10,5,9,7


				//loops through for the length of the L shape and what it looks like eg 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 is the L for vertical bottom right
				for (var z = 0; z <= posileng; z++)
					//this long if statement checks all the postions where certain L's cant be so the x determines what square it is on and the i is what L it is eg. cant put a horrizontal on the last coloum.
					if (((x == 0 || x == 4) && (i == 4 || i == 3))
						|| ((x == 3 || x == 7) && (i == 5 || i == 0 || i == 7 || i == 6 || i == 1 || i == 2))
						|| ((x == 8 || x == 9) && (i == 0 || i == 1 || i == 4 || i == 5 || i == 3))
						|| ((x == 10 || x == 11) && (i == 0 || i == 1 || i == 4 || i == 5 || i == 7 || i == 2))
						|| ((x == 2 || x == 6) && (i == 7 || i == 6 || i == 2))) {
					} else {
						//once it knows its not one of them it then sees if there is an empty space and if there is compares it to the shape of the L
						if (BertasBoard[x + z] == "_" && BertasLs[i][z] == 1) {
							count = count + 1
							//console.log("dumbb " + "x:" + x + " i:" + i + " count:" + count + " z:" + z)
							//there will be count = 4 when it has found all four peices of the L otherwise it wont run
							if (count == 4) {
								//adds one to how many moves there are
								//console.log("x:" + x + " i:" + i + " count:" + count)

								var BertaNewRot = FindBertasBest(BertasBoardCopy, x, BertasLs[i])
								if (BertaNewRot[0] < BestSoFar) {
									var CoinPosi = BertaNewRot[1]
									console.log(CoinPosi[1])
									BestSoFar = BertaNewRot[0]
									BertasChoice.splice(0, 2)
									BertasChoice.push(x, i)
									//console.log(BertasChoice + " " + x + " " + i)
								}

								BertaHowMany = BertaHowMany + 1
								//console.log(BertaHowMany)
								count = 0;
							}

						}
						//if its not an empty space and it is a 1 then there cant be an L there
						else if (BertasBoard[x + z] != "_" && BertasLs[i][z] != 0) {
							break
						}
					}

			}
		}
	}

	//console.log(BertasChoice)
	var BertaOnBoard = 0;
	var BertaOnBoardRow = 0;

	for (var y = 0; y < BertasLs[(BertasChoice[1])].length; y++) {
		//console.log(BertasChoice[0] + y + " " + BertasLs[BertasChoice[1]][y])
		if (BertasBoard[BertasChoice[0] + y] == "_" && BertasLs[BertasChoice[1]][y] == 1) {
			BertaOnBoard = (BertasChoice[0] + y) % 4
			BertaOnBoardRow = Math.floor((BertasChoice[0] + y) / 4)

			Board[BertaOnBoardRow][BertaOnBoard] = "B";
			document.getElementById(BertaOnBoardRow + "" + BertaOnBoard).style.backgroundColor = "blue";

		}
	}


	Board[CoinPosi[0][0]][CoinPosi[0][1]] = " ";
	document.getElementById(CoinPosi[0][0] + "" + CoinPosi[0][1]).style.backgroundColor = "black";
	document.getElementById(CoinPosi[0][0] + "" + CoinPosi[0][1]).setAttribute("onclick", "Move(this.id)");

	Board[CoinPosi[1][0]][CoinPosi[1][1]] = "C";
	document.getElementById(CoinPosi[1][0] + "" + CoinPosi[1][1]).style.backgroundColor = "yellow";


	BoardToBC()
	ClearBoard()
	//Move(BertaOnBoardRow+""+BertaOnBoard)
	NextPlayer()





	//checks for how many moves there are and if there are none runs the winning player script
	if (CheckForMoves("B") == 0) {
		//flips the player
		NextPlayer()

		//loops through the board
		for (var x = 0; x < 4; x++) {
			for (var i = 0; i < 4; i++) {

				//changes all the squares to block colours

				if (Board[x][i] == "LB") {
					Board[x][i] = "B"
					document.getElementById(x + "" + i).style.backgroundColor = "Blue";
					document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
				}
				if (Board[x][i] == "LR") {
					Board[x][i] = "R"
					document.getElementById(x + "" + i).style.backgroundColor = "Red";
					document.getElementById(x + "" + i).setAttribute("onclick", "Move(this.id)");
				}
			}
		}

		//takes you to new page where it tells you who won and then allows you to go to home page 
		//or replay the game

		setTimeout(() => {
			alert("Blue wins the game")
			console.log("Blue wins the game")
			document.write("<center><h1>Blue wins the game</h1><button><a href='Playberta.html'>Play again?</Button> <Button><a href='index.html'>Home</Button></center>")


		}, 2000);

		/*
				alert("Blue wins the game")
				console.log("Blue wins the game")
				document.write("<center><h1>Blue wins the game</h1><button><a href='Playberta.html'>Play again?</Button> <Button><a href='index.html'>Home</Button></center>")
				*/
	}


}


function FindBertasBest(BertasBoardCopy, WhereOnB, WhichL) {
	//console.log(BertasBoardCopy)
	//console.log(WhereOnB + " " + WhichL)
	for (var x = 0; x < 4; x++) {
		for (var i = 0; x < 4; x++) {
			//console.log(BertasBoardCopy[x][i])
			if (BertasBoardCopy[x][i] == "R") {
				BertasBoardCopy[x][i] = "R"
			} else if (BertasBoardCopy[x][i] == "C") {
				BertasBoardCopy[x][i] = "C"
			}

		}
	}

	var BertaOnBoard = 0;
	var BertaOnBoardRow = 0;
	var BertaCount = 0;
	for (var y = 0; y < WhichL.length; y++) {
		BertaOnBoard = (WhereOnB + y) % 4
		BertaOnBoardRow = Math.floor((WhereOnB + y) / 4)

		//console.log(BertaOnBoard)
		//console.log(BertaOnBoardRow)
		//console.log(BertaOnBoardRow+" "+BertaOnBoard+ " " + WhichL[y] + " " + BertasBoardCopy[BertaOnBoardRow][BertaOnBoard]+ "|| " +WhichL)

		if (BertasBoardCopy[BertaOnBoardRow][BertaOnBoard] == " " && WhichL[y] == 1) {
			if (Board[BertaOnBoardRow][BertaOnBoard] == "LB") {
				BertaCount = BertaCount + 1
				if (BertaCount == 4) {
					return 1000
				}
			}




			BertasBoardCopy[BertaOnBoardRow][BertaOnBoard] = "B";
		}
	}


	var BertaBertaHowMany = 1000
	var BestCoin = [0, 0]
	for (var u = 0; u < 4; u++) {
		for (var t = 0; t < 4; t++) {
			if (BertasBoardCopy[u][t] == "C") {
				//console.log("okand")
				BertasBoardCopy[u][t] = " "
				for (var e = 0; e < 4; e++) {
					for (var f = 0; f < 4; f++) {
						if (BertasBoardCopy[e][f] == " ") {
							BertasBoardCopy[e][f] = "C"
							//console.log(BertasBoardCopy)
							if (HowManyBertasTest(BertasBoardCopy) < BertaBertaHowMany) {
								BertaBertaHowMany = HowManyBertasTest(BertasBoardCopy)
								BestCoin = [u + "" + t, e + "" + f]
							}

							BertasBoardCopy[e][f] = " "
						}
					}

				}
				BertasBoardCopy[u][t] = "C"
			}
		}
	}












	for (var x = 0; x < 4; x++) {
		BertasBoardCopy[x].splice(0, 4)
		for (var i = 0; i < 4; i++) {
			if (Board[x][i] == "LB") {
				BertasBoardCopy[x].push(" ")
			} else {
				BertasBoardCopy[x].push(Board[x][i])
			}
		}
	}

	//console.log(BertaBertaHowMany, BestCoin)
	return [BertaBertaHowMany, BestCoin]

}


function HowManyBertasTest(BertasBoardCopy) {
	var howMany = -1;
	var BertaPosiMoves = [
		[1, 0, 0, 0, 1, 0, 0, 0, 1, 1], // vertical L bottom right 0
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 1], // vertical L top left 1
		[1, 1, 1, 0, 1], // horizontal one bottom left 2
		[1, 0, 1, 1, 1], // horizontal one top right 3
		[1, 0, 0, 0, 1, 0, 0, 1, 1], // vertical L buttom left 4
		[1, 1, 0, 0, 1, 0, 0, 0, 1], // vertical L top right 5
		[1, 1, 1, 0, 0, 0, 1], // horizontal bottom right 6
		[1, 0, 0, 0, 1, 1, 1], // horizontal top left 7
	]

	var BertasNewTwo = [];
	for (var x = 0; x < 4; x++) {
		for (var i = 0; i < 4; i++) {
			if (BertasBoardCopy[x][i] == "B" || BertasBoardCopy[x][i] == "C") {
				BertasNewTwo = BertasNewTwo + BertasBoardCopy[x][i]
			} else {
				BertasNewTwo = BertasNewTwo + "_"
			}
		}
	}
	//console.log(BertasNewTwo)


	var BertahowMany = -1;

	for (var i = 0; i < BertaPosiMoves.length; i++) {
		for (var x = 0; x <= 16; x++) {
			if (x != 12 || x != 13 || x != 14 | x != 15) {
				var Bertaposileng = BertaPosiMoves[i].length
				var count = 0
				for (var z = 0; z <= Bertaposileng; z++)
					if (((x == 0 || x == 4) && (i == 4 || i == 3))
						|| ((x == 3 || x == 7) && (i == 5 || i == 0 || i == 7 || i == 6 || i == 1 || i == 2))
						|| ((x == 8 || x == 9) && (i == 0 || i == 1 || i == 4 || i == 5 || i == 3))
						|| ((x == 10 || x == 11) && (i == 0 || i == 1 || i == 4 || i == 5 || i == 7 || i == 2))
						|| ((x == 2 || x == 6) && (i == 7 || i == 6 || i == 2))) {
					} else {
						if (BertasNewTwo[x + z] == "_" && BertaPosiMoves[i][z] == 1) {
							count = count + 1
							if (count == 4) {

								BertahowMany = BertahowMany + 1
								count = 0;
							}

						}
						else if (BertasNewTwo[x + z] != "_" && BertaPosiMoves[i][z] != 0) {
							break
						}
					}
			}
		}
	}





	return BertahowMany
}
