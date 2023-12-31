import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./componetes/Square"
import { WinnerModel } from "./componetes/WinnerModal"

const TURNS = {
  X: "x",
  O:"o"
}




const WINNER_COMBOS = [[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]]

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))
  const[turn, setTurn]= useState(TURNS.X)
  const[winner, setWinner]= useState(null)

  const checkWinner = (boartToCheck)=>{
   for(const combo of WINNER_COMBOS){
    const[a,b,c] = combo
    if(
      boartToCheck[a] &&
      boartToCheck[a] === boartToCheck[b] &&
      boartToCheck [a] === boartToCheck[c]
    ){
      return boartToCheck[a]
    }
   }
   return null
  }

  const resetGame =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame= (newBoard)=>{

  return newBoard.every((square)=> square !== null)
  }

  const updateBoard= (index)=>{
    //no actualizamos esta posicion si ya tiene algo
    if(board[index] || winner)return
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index]= turn
    setBoard(newBoard) 

//cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

// revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }
    
    
  }
  
  return (
    <>
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((_,index)=>{
          return(
            <Square 
            key={index} 
            index={index}
            updateBoard={updateBoard}
            >
             {board[index]}
            </Square>
          )
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModel resetGame={resetGame} winner={winner}/>
    </main>
    </>
  )
}


export default App
