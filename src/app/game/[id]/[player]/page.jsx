import GamePageX from '../../../../Components/GameX'
import GamePageO from '../../../../Components/GameO'
export default async function Game({ params }) {
    
    return (
        <div>
            <div className='text-center text-2xl font-semibold mt-2'>Room Id - {params.id}</div>
            {
                (params.player === "X") ? (<GamePageX roomId = {params.id} playerId={params.player}/>) : (<GamePageO roomId = {params.id} playerId={params.player}/>)
            }
            
            <div className='text-center text-2xl font-semibold'>Player - {params.player}</div>
        </div>
    )
}