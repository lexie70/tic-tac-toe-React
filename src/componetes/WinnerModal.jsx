import { Square } from "./Square"
export function WinnerModel({winner , resetGame}){
    if(winner === null) return null

const winnerText = winner === false ? 'empate': 'gano'

return(

    winner !== null &&(
    <section className="winner">
    <div className="text">
      <h2>{winnerText}</h2>

      <header className="win">
        {winner && <Square>{winner}</Square>}
      </header>
      
      <footer>
        <button onClick={resetGame}>Empezar de nuevo</button>
      </footer>
    </div>
    </section>
      
    )
)
    
      }

