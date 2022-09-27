
const gamePlay = (()=>{
    var playerOne;
    var playerTwo;
    var huButton = document.querySelector('.human');
    huButton.addEventListener('click',vsHuman);
    function vsHuman(){
        playerOne = Player('Player 1','x',true);
        playerTwo = Player('Player 2','o',false);
        var buttons = document.querySelector('.buttons');
        buttons.style.display = 'none'
        var board = document.querySelector('.board');
        board.style.display = 'grid'

    }
    function getCurrentPlayer(){
        return playerOne.turn? playerOne : playerTwo;
    }

    
    return {getCurrentPlayer};

})();


function Player(name,symbol,turn){
    return {name,symbol,turn,won:0};
}

const boardController = (()=>{
    var board = document.querySelector('.board');
    var cells = document.querySelectorAll('.cell');

    cells.forEach(cell=> cell.addEventListener('click',handleClick,{once:true}))
    

    function handleClick(e){
        console.log(gamePlay.getCurrentPlayer());
    }
})()



