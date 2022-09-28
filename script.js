
function Player(name,symbol,turn){
    return {name,symbol,turn,won:0};
}


const gamePlay = (()=>{
    var playerOne;
    var playerTwo;

    var cellElements = document.querySelectorAll('.cell');
    var winText = document.querySelector('.game-end-text');
    var winScreen = document.querySelector('.game-end');
    var buttons = document.querySelector('.buttons');
    var board = document.querySelector('.board');
    var turns = document.querySelector('.turns');




    const winningCombs = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    var huButton = document.querySelector('.human');
    var aiButton = document.querySelector('.ai');


    huButton.addEventListener('click',vsHuman);
    aiButton.addEventListener('click',vsAI);



    
    function vsHuman(){
        playerOne = Player('Player 1','x',true);
        playerTwo = Player('Player 2','o',false);
        
        setGame()

    }
    function vsAI(){
        playerOne = Player('Player 1','x',true);
        playerTwo = Player('AI','o',false);
        setGame()
    }
    function setGame(){
        buttons.classList.add('hide');
        board.classList.add('reveal');
        board.classList.add('x');
        buttons.classList.remove('show')
        turns.innerText = "Player 1's Turn"
    }

    function getCurrentPlayer(){
        return playerOne.turn? playerOne : playerTwo;
    }

    function changeTurns(){
        if(playerOne.turn){
            playerOne.turn = false;
            playerTwo.turn = true;
            if (playerTwo.name === 'AI') {
                
                aiController.bestMove();

            }
            else{
                turns.innerText = "Player 2's Turn"

            }


        }
        else{
            playerOne.turn = true;
            playerTwo.turn = false;
            turns.innerText = "Player 1's Turn"

            
        }
    }

    function checkWin(playerSymbol){
        return winningCombs.some(comb=>{
            return comb.every(index =>{
                return cellElements[index].classList.contains(playerSymbol);
            })
        })
    }

    function endGame(isDraw){
        if (isDraw) {
            winText.innerText = "Draw, Sadly no one Wins...";
            
        }
        else{
            winText.innerText = `${this.getCurrentPlayer().name} '${this.getCurrentPlayer().symbol}' Wins!!`;
        }
        
        winScreen.classList.add('show');
    }

    function isDraw(){
        return [...cellElements].every(cell =>{
            return (cell.classList.contains('x')|| cell.classList.contains('o'));
        })
    }

    
    return {getCurrentPlayer,changeTurns,checkWin,endGame,isDraw};

})();



const boardController = (()=>{
    var board = document.querySelector('.board');
    var cells = document.querySelectorAll('.cell');
    var restart = document.querySelector('.restart');
    var winScreen = document.querySelector('.game-end');
    var buttons = document.querySelector('.buttons');

    var origBoard = ['','','','','','','','',''];

    restart.addEventListener('click',restartGame);

    gameStart()

    function gameStart(){
        for (let i = 0; i < 9; i++) {
            origBoard[i] = '';         
        }
        board.classList.remove('x');
        board.classList.remove('o');

        board.classList.add('x');

        cells.forEach((cell)=> {
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.addEventListener('click',handleClick,{once:true})
        })

        board.classList.remove('reveal');
        buttons.classList.add('show');

        winScreen.classList.remove('show');

    }



    function handleClick(e){

        var symbol = gamePlay.getCurrentPlayer().symbol;

        placeMark(e.target,symbol)

        if(gamePlay.checkWin(symbol)){
            gamePlay.endGame(false)
        }
        else if (gamePlay.isDraw()) {
            gamePlay.endGame(true)
            
        }
        else{
            gamePlay.changeTurns()
            changeBoardHover();
        }

    }

    function placeMark(cell,player){
        origBoard[cell.getAttribute('data-cell')] = player;
        
        cell.classList.add(player);
        //console.log(aiController.checkWinner());
    }

    function changeBoardHover(){
        board.classList.remove('x');
        board.classList.remove('o');
        board.classList.add(gamePlay.getCurrentPlayer().symbol);
    }

    function restartGame(){
        gameStart();
    }

    return {origBoard,placeMark};

})()



const aiController = (()=>{
    var cells = document.querySelectorAll('.cell');

    function equals3(a, b, c) {
        return a == b && b == c && a != '';
      }

    function checkWinner() {
        let winner = null;
        var board = boardController.origBoard;
        // horizontal
        for (let i = 0; i < 9; i=i+3) {
          if (equals3(board[i], board[i+1], board[i+2])) {
            winner = board[i];
          }
        }
      
        // Vertical
        for (let i = 0; i < 3; i++) {
          if (equals3(board[i], board[i+3], board[i+6])) {
            winner = board[i];
          }
        }
      
        // Diagonal
        if (equals3(board[0], board[4], board[8])) {
          winner = board[0];
        }
        if (equals3(board[2], board[4], board[6])) {
          winner = board[2];
        }
      
        let openSpots = 0;
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                openSpots++;
              }
        }
      
        if (winner == null && openSpots == 0) {
          return 'tie';
        } else {
          return winner;
        }

    }


    function bestMove(){
        let bestScore = -Infinity;
        let bMove
        for (let i = 0; i < 9; i++) {
            if(boardController.origBoard[i]===''){
                boardController.origBoard[i] = 'o'
                var score = minimax(boardController.origBoard,0, false);
                boardController.origBoard[i] = ''

                if (score>bestScore) {
                    bestScore = score;
                    bMove = i;
                }
            }
            
        }
        boardController.placeMark(cells[bMove],'o')
        if(gamePlay.checkWin('o')){
            gamePlay.endGame(false)
        }
        gamePlay.changeTurns()
    }

    let scores = {
        x : -1,
        o : 1,
        tie :0
    }

    function minimax(board,depth,isMaximizing){
        let result = checkWinner();
        if(result!=null){
            let score = scores[result];
            return score;
        }

        if(isMaximizing){
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i]=='') {
                    board[i] = 'o';
                    let score = minimax(board,depth+1,false);
                    board[i] = '';

                    bestScore = Math.max(score,bestScore);

                    
                }
            }
            return bestScore;
        }
        else{
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i]=='') {
                    board[i] = 'x';
                    let score = minimax(board,depth+1,true);
                    board[i] = '';

                    bestScore = Math.min(score,bestScore);
                    
                }
            }
            return bestScore;
        }
    }

    return {bestMove,checkWinner}
})()