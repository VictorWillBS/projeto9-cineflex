import styled from "styled-components"
import { useParams,Link } from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"

export default function Sessions(){
    //Logic
    const{idFilme} = useParams()
    const [movie,setMovie]= useState([])
    const [movieInfos,setMovieInfos]=useState([])
    useEffect(()=>{
        const promise=axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        promise.then((res)=>{ 
            setMovie(res.data.days)
            setMovieInfos(res.data)
        
        });
    },[])
    

    
    function Session({weekday,date,showtimes}){
        return(<>
            <SessionDiv>
                <h4> {weekday}- {date}</h4>
                <div>
                {showtimes.map((e,index)=> <Button key={index} name={e.name} id={e.id}/>)}
                </div>
            </SessionDiv>
           
        </>
        )
    }
    
    function Button({name,id}){
        return(
            <Link to={`/assentos/${id}`}>
            <ButtonStyled > {name}</ButtonStyled>
            </Link>
        )
    }

    function Footer({}){
        return(
        <FooterStyled>
            <figure>
            <img src={movieInfos.posterURL}/>
            </figure>
            <article> <h3>{movieInfos.title}</h3></article>

        </FooterStyled>)
    }

    //UI
    return(<>
        {movie.length===0? `esperando`:        
        <Conteiner_Session>
            <h3>Selecione o Filme</h3>
            <Select_session>
                 {movie.map((e,index)=> <Session key={index}weekday={e.weekday} date={e.date} showtimes={e.showtimes}></Session>)}
            </Select_session>
            <Footer/>
        </Conteiner_Session>}
        </>
    )
}
//CSS
const Conteiner_Session = styled.div`
    display:flex;
    flex-direction:column;
    padding:0 24px;
    justify-content:center;
    align-items:center;
    box-sizing: border-box;
    h3{
        font-size: 24px;
        margin:50px 0;
    }

`
const Select_session = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:flex-start;
    margin-bottom:150px;
`
const SessionDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    h4{
        font-size:20px;
    }
    div{
        margin-top:10px;
        width:100%;
        display:grid;
        grid: 1fr/ 83px 83px;
        column-gap:10px;

    }
`

const ButtonStyled = styled.button`
        color:white;
        font-size:18px;
        background-color:#E8833A;
        border: none;
        border-radius:5px;
        width: 83px;
        height:43px;

`
const FooterStyled = styled.footer`
    position:fixed;
    bottom:0;
    left:0;
    width:100vw;
    height:117px;
    background-color:#DFE6ED;
    border:1px double #9EADBA;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    padding:15px 10px;
    

    
    figure{
        background-color:white;
        width:64px;
        height:89px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:3px;
        box-shadow: 0px 2px 4px 0px #0000001A;
    }

    img{
        width:48px;
        height:72px;
    }
    article{
        height:100%;
        margin-left:15px;
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
        align-items:flex-start;
    }
    h3{
        font-size:26px;
        color:#293845;
        margin:0;   
    }
`