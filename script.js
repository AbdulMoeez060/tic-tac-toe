
const gameBoard = (()=>{
    var board = document.querySelector('.board');
    //board.addEventListener('click',mark);

})();


function Player(name,symbol,turn){
    return {name,symbol,turn,won:0};
}

var player1 = Player('moeez','o',true);
