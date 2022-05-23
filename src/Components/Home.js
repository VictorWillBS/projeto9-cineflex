import styled from "styled-components"
import axios from "axios";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Movie({url, id, title}){
    return(
        <Link to={`/sessoes/${id}`}>
            <Poster>
                <img src={url} alt={`poster do filme: ${title}`} ></img>
            </Poster>
        </Link>
    )
}

export default function Home(){
    //Logic
    const [movieList, setMovieList]=useState([]);
    
    useEffect(()=> {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        promise.then((res)=>setMovieList(res.data)) 
        },[])
    
    //UI
    return(
    <Conteiner_Body>
        <h3>Selecione o Filme</h3>
        <Movies>
            {movieList.map((item,index)=><Movie 
            key={index} 
            url={item.posterURL} 
            id={item.id}
            title={item.title}
            />)}
        </Movies>
    </Conteiner_Body>
    )
}

const Conteiner_Body = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    h3{
        font-size: 24px;
        margin:50px 0;
    }

`;

const Movies = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap:30px;
    row-gap: 10px;

 
`;

const Poster = styled.figure`
    
    width: 145px;
    height: 209px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:3px;
    box-shadow: 0px 2px 4px 2px #0000001A;


    img{
        width:129px;
        height:193px;
    }
`