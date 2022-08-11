// constants 
// Possible win combinations
const winCombos = [
    [0, 1, 2], [0, 3, 6], [3, 4, 5],
    [6, 7, 8], [1, 4, 7], [2, 4, 6],
    [2, 5, 8], [0, 4, 8]
];

// setting up the basic game board module
let gameBoardModule = (function () {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const isCellTaken = (i) => {
        if (gameBoard[i] == 'X' || gameBoard[i] == 'O') {
            return true; 
        }
        return false; 
    }

    const completeTurn = (cell, id) => {
        gameBoard[cell] = id
        return
    }

    const isGameOver = () => {
        hashCount = {
            x: [], 
            o: [], 
        }

        // check for tie
        let i = 0; 
        ans = false; 
        gameBoard.forEach(x => {
            if (x == 'X') {
                hashCount.x.push(i)
            } else if (x == 'O'){
                hashCount.o.push(i)
            }
            i++; 
        })

        // check for win
        // checking for win combos
        let s = 'tie'
        winCombos.forEach(combo => {
            let isXwinner = combo.every(e => hashCount.x.includes(e));
            let isOwinner = combo.every(e => hashCount.o.includes(e));
            if (isXwinner) {
                s = 'X'
                ans = true
            }
            if (isOwinner) {
                ans = true; 
                s= 'O'
            }
        })

        if (ans == false ) {
            ans = true; 
            s = 'tie'
            gameBoard.forEach(elem => {
                if (elem == '') {
                    ans = false; 
                    s = 'error'
                }
            });
        }
        return [ans, s]
    }

    return { gameBoard, isCellTaken, completeTurn, isGameOver };
})();



let Player = (playerName, marker) => {
    const getPlayerName = () => console.log(`This is player ${playerName}:${marker}`);
    return { getPlayerName, playerName, marker };

}

let displayController = (function () {

    const displayBoard = () => {
        const children = document.querySelectorAll('.text')
        for (let i = 0; i < 9; i++) {
            children[i].textContent = gameBoardModule.gameBoard[i]
        }
    }

    const board = document.querySelector(".board");
    board.addEventListener('click', (e) => {
        //console.log(e.target.id);
        Game.attemptTurn(e.target.id)

    })


    return { displayBoard };
})();



let Game = (function () {
    const player1 = Player('Player1', 'X')
    const player2 = Player('Player2', 'O');
    const message = document.querySelector('.winner')
    let _turn = 'X'; 

    const _changeTurn = () => {
        if (_turn == 'X') {
            _turn = 'O'
        } else {
            _turn = 'X'
        }
    }

    const attemptTurn = (cell) => {
        taken = gameBoardModule.isCellTaken(cell); 
        if (!taken) {
            gameBoardModule.completeTurn(cell, _turn);
            const ans = gameBoardModule.isGameOver(); 
            console.log(ans);
            if (ans[0] == true) {
                if (ans[1] == 'X') {
                    message.textContent = 'Game Over \n X has Won'
                } else if (ans[1] == 'O') {
                    message.textContent = 'Game Over \n O has Won'
                } else {
                    message.textContent = 'TIED GAME'
                }
            }
            _changeTurn();
            displayController.displayBoard()
            //console.log(gameBoardModule.gameBoard);

        }
    }
    displayController.displayBoard()


    return {attemptTurn};
})();


