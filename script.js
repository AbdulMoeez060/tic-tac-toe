

function Player(name,symbol,turn){
    return {name,symbol,turn,won:0};
}

const boardController = (()=>{
var board = document.querySelector('.board');
    var cells = document.querySelectorAll('.cell');

    cells.forEach(cell=> cell.addEventListener('click',handleClick,{once:true}))
    

    function handleClick(e){
        console.log(e.target)
    }
    
})()

const playerController = (()=>{

})()


const gamePlay = (()=>{
    
    //board.addEventListener('click',mark);,{once:true}to only fire event listener once

})();
