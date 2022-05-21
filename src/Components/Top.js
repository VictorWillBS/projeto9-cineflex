import styled from "styled-components"

export default function Top(){
    return(<Header><h1>CINEFLEX</h1></Header>)
}

const Header = styled.header`
        background-color: #C3CFD9;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height:67px;
    
    h1{
        font-size: 34px;
        color:#E8833A;
    }

`