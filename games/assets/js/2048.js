        const gridSize = 5;
        let board = [];
        let score = 0;

        function initBoard() {
            board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
            score = 0;
            updateScore();
            addRandomTile();
            addRandomTile();
            updateBoard();
            getLeaderboard();
        }

        function updateScore() {
            document.getElementById('score').textContent = `Score: ${score}`;
        }

        function addRandomTile() {
            let emptyTiles = [];
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (board[i][j] === 0) {
                        emptyTiles.push({ x: i, y: j });
                    }
                }
            }

            if (emptyTiles.length > 0) {
                let { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
                board[x][y] = Math.random() < 0.9 ? 2 : 4;
            }
        }

        function updateBoard() {
            const gameBoard = document.getElementById('game-board');
            gameBoard.innerHTML = '';
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    let tile = document.createElement('div');
                    tile.className = 'tile';
                    tile.textContent = board[i][j] !== 0 ? board[i][j] : '';
                    if (board[i][j] !== 0) {
                        tile.setAttribute('data-value', board[i][j]);
                    }
                    gameBoard.appendChild(tile);
                }
            }
        }

        function moveTiles(direction) {
            let moved = false;

            function slide(row) {
                let arr = row.filter(val => val);
                let missing = gridSize - arr.length;
                let zeros = Array(missing).fill(0);
                moved = true;
                return arr.concat(zeros);
            }

            function combine(row) {
                for (let i = 0; i < gridSize - 1; i++) {
                    if (row[i] !== 0 && row[i] === row[i + 1]) {
                        row[i] *= 2;
                        row[i + 1] = 0;
                        score += row[i];  // Ajouter la valeur de la tuile fusionnée au score
                        updateScore();  // Mettre à jour l'affichage du score
                        moved = true;
                    }
                }
                return row;
            }

            function operate(row) {
                row = slide(row);
                row = combine(row);
                row = slide(row);
                return row;
            }

            for (let i = 0; i < gridSize; i++) {
                let row;
                if (direction === 'left' || direction === 'right') {
                    row = board[i].slice();
                    if (direction === 'right') row.reverse();
                    row = operate(row);
                    if (direction === 'right') row.reverse();
                    board[i] = row;
                } else if (direction === 'up' || direction === 'down') {
                    row = board.map(row => row[i]);
                    if (direction === 'down') row.reverse();
                    row = operate(row);
                    if (direction === 'down') row.reverse();
                    for (let j = 0; j < gridSize; j++) {
                        board[j][i] = row[j];
                    }
                }
            }
            if (moved) {
                addRandomTile();
            }
        }

        function checkGameOver() {
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    if (board[i][j] === 0) {
                        return false;
                    }
                    if (i < gridSize - 1 && board[i][j] === board[i + 1][j]) {
                        return false;
                    }
                    if (j < gridSize - 1 && board[i][j] === board[i][j + 1]) {
                        return false;
                    }
                }
            }
            gameOver();
            return true;
        }

        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    moveTiles('up');
                    break;
                case 'ArrowDown':
                    moveTiles('down');
                    break;
                case 'ArrowLeft':
                    moveTiles('left');
                    break;
                case 'ArrowRight':
                    moveTiles('right');
                    break;
            }
            updateBoard();
            checkGameOver();
        });

        /*LEADERBOARD*/
        async function addScoreToLeaderboard(playerName, score) {
            try {
                const docRef = await db.collection("leaderboard").add({
                    username: playerName,
                    score: score,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        async function getLeaderboard() {
            const leaderboard = document.getElementById('leaderboard');
            leaderboard.innerHTML = ''; // Clear current leaderboard
            const title = document.createElement('h2');
            title.textContent = "Leaderboard";
            leaderboard.appendChild(title);

            try {
                const querySnapshot = await db.collection("leaderboard")
                    .orderBy("score", "desc")
                    .limit(10) // Limite à 10 les scores affichés
                    .get();
                
                cnt = 1;
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const entry = document.createElement('div');
                    entry.textContent = `${cnt}        |       ${data.username} | highest score: ${data.score}`;
                    cnt += 1;
                    leaderboard.appendChild(entry);
                    console.log(entry.textContent);
                });
            } catch (e) {
                console.error("Error getting documents: ", e);
            }
        }
        function gameOver() {
            const playerName = prompt("Game Over. Enter your name for the leaderboard:");
            if (playerName) {
                addScoreToLeaderboard(playerName, score);
            }
            initBoard();  // Redémarre le jeu
        }

    initBoard();