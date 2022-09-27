
function Player(name,symbol,turn){
    return {name,symbol,turn,won:0};
}


const gamePlay = (()=>{
    var playerOne;
    var playerTwo;

    var cellElements = document.querySelectorAll('.cell');
    var winText = document.querySelector('.game-end-text');
    var winScreen = document.querySelector('.game-end');


    const winningCombs = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    var huButton = document.querySelector('.human');
    huButton.addEventListener('click',vsHuman);
    function vsHuman(){
        playerOne = Player('Player 1','x',true);
        playerTwo = Player('Player 2','o',false);
        var buttons = document.querySelector('.buttons');
        buttons.style.display = 'none'
        var board = document.querySelector('.board');
        board.classList.add('reveal');

    }
    function getCurrentPlayer(){
        return playerOne.turn? playerOne : playerTwo;
    }

    function changeTurns(){
        if(playerOne.turn){
            playerOne.turn = false;
            playerTwo.turn = true;
        }
        else{
            playerOne.turn = true;
            playerTwo.turn = false;
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
            
        }
        else{
            winText.innerText = `${this.getCurrentPlayer().name} '${this.getCurrentPlayer().symbol}' Wins!!`;
        }
        
        winScreen.classList.add('show');
    }

    
    return {getCurrentPlayer,changeTurns,checkWin,endGame};

})();



const boardController = (()=>{
    var board = document.querySelector('.board');
    var cells = document.querySelectorAll('.cell');


    cells.forEach(cell=> cell.addEventListener('click',handleClick,{once:true}))
    board.classList.add('x');



    function handleClick(e){

        placeMark(e.target,gamePlay.getCurrentPlayer().symbol)

        if(gamePlay.checkWin(gamePlay.getCurrentPlayer().symbol)){
            gamePlay.endGame(false)
        }

        gamePlay.changeTurns()
        changeBoardHover();
    }

    function placeMark(cell,player){
        cell.classList.add(player);
    }

    function changeBoardHover(){
        board.classList.remove('x');
        board.classList.remove('o');
        board.classList.add(gamePlay.getCurrentPlayer().symbol);
    }
})()



