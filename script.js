
function boarde() {
    const row = 3;
    const col = 3;


    var board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = []
        for (let j = 0; j < 3; j++) {
            board[i].push(``);
        }
    }

    const players = [
        {
            name: "Player 1",
            token: "X",
            score: 0
        }, {
            name: "Computer",
            token: "O",
            score: 0
        }

    ];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getPlayer = () => players;



    const reset = () => {

        for (let i = 0; i < 3; i++) {

            for (let j = 0; j < 3; j++) {
                document.getElementById(`${i * 3 + j}`).innerText = '';
                board[i][j] = '';
            }
        }
    }
    const getboard = () => board;
    const addtoken = (i, j) => {
        // count+=1;
        document.getElementById(`${i * 3 + j}`).innerText = activePlayer.token;
        board[i][j] = activePlayer.token;
    };
    const printboard = () => {
        // console.log(count);
        for (let i = 0; i < 3; i++) {
            console.log(board[i])
        }
    };

    const iswon = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return board[0][j];
            }
        }

        // Check diagonals
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        // No winner
        return 0;
    };
    const printCards = () => {
        document.getElementById('user-score').textContent = `(${players[0].token}) ${players[0].name}: ${players[0].score}`;
        document.getElementById('computer-score').textContent = `(${players[1].token}) ${players[1].name}: ${players[1].score}`;
    }
    const getactiveplayer = () => activePlayer;

    return { getboard, addtoken, printboard, iswon, printCards, reset, switchPlayerTurn, getPlayer, getactiveplayer };

};



function game(play) {
    let count = 0;
    let mode = 1;
    let difficulty=0;       //0ease 1med 2hard

    const takeTurn = async (rowNumber, colNumber) => {
        if (isNaN(rowNumber) || isNaN(colNumber) || rowNumber < 0 || rowNumber > 2 || colNumber < 0 || colNumber > 2) {
            console.log('Invalid input. Please enter valid row and column numbers.');
        } else if (play.getboard()[rowNumber][colNumber] !== '') {
            console.log('Cell already occupied. Choose another cell.');
        } else {
            count++;
            play.addtoken(rowNumber, colNumber);
            play.printboard();

            console.log(count);

            if (count === 9) {
                setTimeout(() => {
                    alert("Game Draw");
                    play.getPlayer()[0].score += 0.5;
                    play.getPlayer()[1].score += 0.5;
                    play.printCards();
                    play.reset();
                    count = 0;
                }, 101);  
            } else {
                play.switchPlayerTurn();
                const winner = play.iswon();

                if (winner) {
                    console.log(`${winner} wins!`);
                    winner === "X" ? play.getPlayer()[0].score++ : play.getPlayer()[1].score++;
                    play.printCards();
                    setTimeout(() => {
                        alert(`${winner === "X" ? play.getPlayer()[0].name : play.getPlayer()[1].name} wins`);
                        play.reset();
                        count = 0;
                    }, 101);  
                } else {
                    if (mode === 1) {
                        computerTurn();
                         
                    }
                }
            }
        }
    }



    const computerTurn = () => {
        let temp = [];
        let available = [];
        let BestScore = 1000;
        let move;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (play.getboard()[i][j] === '') {
                    available.push({ i, j });
                    let x = play.getactiveplayer().token;
                    play.getboard()[i][j] = x;
                    play.switchPlayerTurn();
                    score = minimax(true, 9 - count, play.getactiveplayer().token, x);

                    temp.push({ i, j }, score, BestScore);

                    if (BestScore > score) {
                        BestScore = score;
                        move = { i, j };
                    }
                    play.getboard()[i][j] = '';
                    play.switchPlayerTurn();
                }
            }
        }
        // console.log(temp);
        let turn
        if(difficulty===0){
            turn= available[Math.floor(Math.random() * available.length)];
        }
        else if(difficulty===1){
            if(Math.random<0.5){
                turn= available[Math.floor(Math.random() * available.length)];
            }
            else{
                turn=move;
            }
        }
        else{
            turn=move;
        }
        play.addtoken(turn.i, turn.j);
        // play.printboard();
        count++;
        
        // console.log(available);


        // play.addtoken(turn.i, turn.j);
        console.log(count);

        if (count === 9) {
            setTimeout(() => {
                alert("Game Draw");
                play.getPlayer()[0].score += 0.5;
                play.getPlayer()[1].score += 0.5;
                play.printCards();
                play.reset();
                count = 0;
            }, 101);  
        } else {
            const winner = play.iswon();
            if (winner) {
                console.log(`${winner} wins!`);
                winner === "X" ? play.getPlayer()[0].score++ : play.getPlayer()[1].score++;
                play.printCards();
                setTimeout(() => {
                    alert(`${winner === "X" ? play.getPlayer()[0].name : play.getPlayer()[1].name} wins`);
                    play.reset();
                    count = 0;
                }, 101);  
            } else {
                play.switchPlayerTurn();
            }
        }
    }


    const minimax = (isMaximizing, tempcount, token, computer) => {
        const win = play.iswon();

        if (win === token) {
            return 10;
        }
        else if (win === computer) {
            return -10;
        }
        let flag;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (play.getboard()[i][j] === '') {
                    flag = true;
                }
            }
        }
        if (!flag) {
            return 0;
        }

        if (isMaximizing) {
            let BestScore = -1000;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (play.getboard()[i][j] === '') {
                        play.getboard()[i][j] = token;
                        // console.log({i,j});
                        // play.printboard();
                        // play.switchPlayerTurn();

                        score = minimax(false, tempcount - 1, token, computer);
                        // BestScore = score+BestScore;
                        BestScore = Math.max(score, BestScore);


                        play.getboard()[i][j] = '';
                        // play.switchPlayerTurn();

                    }
                }
            }
            return BestScore;
        }
        else {
            let BestScore = 1000;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (play.getboard()[i][j] === ``) {
                        play.getboard()[i][j] = computer;
                        // play.switchPlayerTurn();

                        score = minimax(true, tempcount - 1, token, computer);

                        // BestScore=score+BestScore;
                        BestScore = Math.min(score, BestScore);
                        play.getboard()[i][j] = '';
                        // play.switchPlayerTurn();

                    }
                }
            }
            return BestScore;
        }
    }

    const toggleDifficulty=()=>{
        if(difficulty===0){
            difficulty=1;
            document.getElementById("difficulty-btn").innerText = 'Difficulty: Medium'
        }
        else if(difficulty===1){
            difficulty=2;
            document.getElementById("difficulty-btn").innerText = 'Difficulty: Hard'
            
        }
        else{
            difficulty=0;
            document.getElementById("difficulty-btn").innerText = 'Difficulty: Easy'

        }
    }
    const modechange = () => {
        mode = 2;
        play.getPlayer()[1].name = "Player 2"
        play.getPlayer()[1].score = 0;
        play.printCards();
        document.getElementById("change-mode-btn").innerText = 'Click For Single Player'
    }

    const reset = () => {
        play.reset();
    }
    const startgame = () => {
        gam.reset();
        play.printCards();
        play.printboard();
    }

    return { takeTurn, reset, modechange, startgame, computerTurn,toggleDifficulty};

}


const play = boarde();
var gam = game(play);
play.printCards();



