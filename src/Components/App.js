import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState,useEffect} from "react";
import styled from "styled-components"
import Top from "./Top";
import Home from "./Home";
import Seats from "./Seats";
import Sessions from "./Session";
import Sucess from "./Sucess";
import "./../assets/Estilos/css-reset.css"

/* TIRAR AS FONTES DO CSS RESET E BOTAR EM GLOBAL */

export default function App(){
   const [dataMovie,setDataMovie]= useState([])
   const [dataSeat,setDataSeat]= useState([])
   const [dataUser,setDataUser]= useState([])
return(
    <Conteiner>
        
        <BrowserRouter>
            <Top/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessoes/:idFilme" element={<Sessions setDataMovie={setDataMovie} />}/>
                <Route path="/assentos/:idSessao" element={<Seats dataMovie={dataMovie} setDataMovie={setDataMovie} dataSeat={dataSeat} setDataSeat={setDataSeat} setDataUser={setDataUser}/>}/>
                <Route path="/sucesso" element={<Sucess dataMovie={dataMovie}  dataUser={dataUser} dataSeat={dataSeat}/>} />
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