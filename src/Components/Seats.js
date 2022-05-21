import styled from "styled-components"
import axios from "axios"

export default function Seats(){

const seatsList = []

function counter(){
    for (let i = 0; i < 50; i++) {
       seatsList.push(i+1)
 
 }
}
counter()
    return(
        <Conteiner_Assentos>
        <h3>Selecione o(s) assento(s)</h3>
        <Seat>
            {seatsList.map((seat)=> <div>{seat}</div>)}
        </Seat>
        </Conteiner_Assentos>
    )
}

const Conteiner_Assentos= styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3{
        font-size: 24px;
        margin:50px 0;
    }
`
const Seat = styled.article`
    max-width:300   px;
    height: 180px;
    display: grid;
    grid: repeat(5, 30px) / repeat(10,30px);
`;
