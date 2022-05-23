import styled from "styled-components"
import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"



export default function Seats({dataMovie,setDataMovie,dataSeat,setDataSeat,dataUser,setDataUser}){
    //Logic
    const {idSessao}=useParams()
    const [session,setSession] = useState([])
    const navigate = useNavigate()
    let arrIds = []
    let seatNumber = []

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)
        promise.then((res)=>
           { setSession(res.data)
            setDataMovie(res.data)
            }
        )

    },[])
    
    function selectIds(id,name){
         {arrIds.includes(id)? arrIds=(arrIds.filter((item)=>!(item===id))): arrIds.push(id)}
         {seatNumber.includes(name)? seatNumber=(seatNumber.filter((item)=>!(item===name))): seatNumber.push(name)}
     }

    function ButtonHelper({name, color, border}){
        return(
            <div>
            <ButtonStyled color={color} border={border} ></ButtonStyled>
           <h4>{name}</h4>  
            </div>
        )
    }
    
    function SeatsButton({name,isAvailable,id ,index}){
        //Logic
            const available=isAvailable
            const [color,setColor]=useState([])

            function selectcolor(){    
                {!available?alert("Esse assento não está disponível"):
                    color === "select"?setColor(""):setColor("select")};
            }

            
        //UI
            return(
                <ButtonStyled 
                color=  {!available?"#FBE192": color=== "select"?  "#8DD7CF": ""}
                border= {!available?"#FBE192": color=== "select"?  "#8DD7CF": ""}
                onClick={()=>{
                    selectcolor()
                    {!available?alert("Esse assento não está disponível"):
                    color === "select"?selectIds(id,name):selectIds(id,name) }      
                    }
                }
                >
                    {name}
                </ButtonStyled>
                )
    }
    
    function UserImput(){
        const [name,setName]=useState("")
        const [cpf,setCpf]=useState("")
        
        function reservar(e){
            if(arrIds.length){  e.preventDefault()
                const body={
                    ids:arrIds,
                    name,
                    cpf,
                }
                setDataUser(body)
                setDataSeat(seatNumber)
                const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",body)
                promise.then(()=>
                navigate("../sucesso"))
                promise.catch(()=>alert("não foi possível reservar esse assento"))}
                else{alert("escolha um assento")}
          
        }

        return(
            <FormStyled onSubmit={reservar}>
                <section>
                    <label>Nome do Comprador:</label>
                    <input placeholder="Digite seu nome..." value={name} onChange={(e)=> setName(e.target.value) }></input>
                    <label>CPF do comprador:</label>
                    <input placeholder="Digite seu CPF..." value={cpf} onChange={(e)=> setCpf(e.target.value)}></input>
                </section>
                <ButtonFinish type="submit">Reservar assento(s)</ButtonFinish>
            </FormStyled>
        )
    }

    function Footer({}){
        return(
        <FooterStyled>
            <figure>
            <img src={session.movie.posterURL}/>
            </figure>
            <article> 
                <h3>{session.movie.title}</h3>
                <h3>{`${session.day.weekday} - ${session.day.date}`}</h3>
            </article>

        </FooterStyled>)
    }

     //UI
    return(<>
        {session.length===0? `esperando`: 
        <Conteiner_Assentos>
            <div>
             <h3>Selecione o(s) assento(s)</h3>
            <Seat>
                {session.seats.map((seat,index)=> <SeatsButton 
                key={index} 
                name={seat.name} 
                isAvailable={seat.isAvailable} 
                id={seat.id}/>)}
            </Seat>
            <Helper>
                <ButtonHelper name="Selecionado" color="#8DD7CF" border="#1AAE9E"></ButtonHelper>
                <ButtonHelper name="Disponível" ></ButtonHelper>
                <ButtonHelper name="Indisponível" color="#FBE192" border="#F7C52B"></ButtonHelper>
            </Helper>
            <UserImput/>
            </div>
            <Footer />
        </Conteiner_Assentos>}
       
        </>
    )
}



//CSS
const Conteiner_Assentos= styled.section`
    height:100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom:150px;
    box-sizing: border-box;
    h3{
        font-size: 24px;
        margin:50px 0 30px 0;
    }
    &&>div{
        margin-bottom:200px;
    }
`
const Seat = styled.article`
   
    display: grid;
    grid: repeat(5, 26px) / repeat(10,26px);
    column-gap:8px;
    row-gap:18px;
   
`;

const Helper = styled.article`
    width:100%;
    margin-top:20px;
    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
    align-items:center;
    
    div{
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
    }

    h4{
        font-size:13px; 
        margin-top:8px;
    }
   
`

const ButtonStyled = styled.button`
        width:28px;
        height:28px;
        text-align:center;
        border-radius:100%;
        border:1px solid ${props=> props.border || "#7B8B99"};
        /* border-color: ; */
        background-color:${props=> props.color || "#C3CFD9"};
`

const FormStyled = styled.form`
    width:100%;
    height:100%;
    max-height:270px;
    margin-top:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    

    section{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
    }

    label{
        max-width:325px;
        width: 100%;
        text-align:left;
        font-size:18px;
    }
    input{
        max-width:325px;
        width: 100%;
        height:51px;
        margin-bottom:10px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        padding-left:18px;
        text-align:left;
    }
    input::placeholder{
        font-size: 18px;
        font-style:italic;
        color:#AFAFAF;
    }
`

const ButtonFinish =styled.button`
    width:225px;
    height:42px;
    background-color:#E8833A;
    border:none;
    border-radius:3px;
    color:white;
    font-size:18px;
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
        justify-content:center;
        align-items:flex-start;
    }
    h3{
        font-size:26px;
        color:#293845;
        margin:0;   
    }
`