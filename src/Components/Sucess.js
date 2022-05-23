import styled from "styled-components"
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

export default function Sucess ({dataMovie, dataUser, dataSeat}){
    console.log(dataMovie)
    const hour = dataMovie.name;
    const day = dataMovie.day.date;
    const title= dataMovie.movie.title; 
    const username= dataUser.name;
    const cpf = dataUser.cpf
    const seatList=dataSeat
    function Order_Info(){
        return(
        <Info_Order>
            <Info>
                <h3>Filme e Sessão</h3>
                <div>
                    <h4>{title}</h4>
                    <h4>{`${day} ${hour}`}</h4>
                </div>
            </Info>
            <Info>
                <h3>Ingressos</h3>
                <div>
                    {seatList.map((seat)=><h4>{`Assento ${seat}`}</h4> )}
                </div>
            </Info>

            <Info>
                <h3>Comprador</h3>
                <div>
                    <h4>{`Nome: ${username}`}</h4>
                    <h4>{`CPF: ${cpf}`}</h4>
                </div>
            </Info>
        </Info_Order>)
    }
    function Button_End(){
        return(
            <Link to="/">
            <Button_the_end>Voltar para Home</Button_the_end>
            </Link>
        )
    }
    return(
    <Conteiner_Sucesso> 
        <h3>Pedido feito com sucesso!</h3>
        <Order_Info/>
        <Button_End/>
    </Conteiner_Sucesso>)
}

const Conteiner_Sucesso = styled.section`
    
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    

    h3{ 
        box-sizing:border-box;
        margin:25px;
        font-size:24px;
        font-weight:bold;
        width:180px;
        color:#247A6B;
        word-break: break-word;
        text-align:center;
    }
`
const Info_Order=styled.section`
width:100%;
padding:0 30px;

`
const Info= styled.article`
    width:100%;
    margin-bottom:50px;
    display: flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:flex-start;
    
    div{
        margin-top:10px;
    }

    h3{
        margin:0;
        font-size:24px;
        font-weight:bold;
        color:#293845;
        text-align:start;
        letter-spacing:4%;
       
    }
    h4{
        margin-top:5px;
        font-size:22px;
        color:#293845;
        letter-spacing:4%;
    }
`

const Button_the_end=styled.button`
    width:225px;
    height:45px;
    margin-top:50   px;
    background-color: #E8833A;
    text-align:center;
    color:white;
    font-size:18px;
    border:none;
    border-radius:3px;
`