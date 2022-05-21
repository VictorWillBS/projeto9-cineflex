import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components"
import Top from "./Top";
import Home from "./Home";
import Seats from "./Seats";
import "./../assets/Estilos/css-reset.css"

/* TIRAR AS FONTES DO CSS RESET E BOTAR EM GLOBAL */

export default function App(){
return(
    <Conteiner>
        
        <BrowserRouter>
            <Top/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/sessoes/:idFilme" />
                <Route path="/assentos/:idSessao" element={<Seats/>}/>
                <Route path="/sucesso"/>
            </Routes>
        </BrowserRouter>
    </Conteiner>
)
}

const Conteiner = styled.div`
    display : flex;
    flex-direction: column;
    width:100vw;
    height: 100vh; 
    margin:0;
    top:0;
    left:0;
`;