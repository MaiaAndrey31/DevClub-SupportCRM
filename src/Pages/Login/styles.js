import styled from "styled-components";

export const Container = styled.div`
 min-height:100vh;
 display:flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;

 img{
    width: 150px;
    max-width: 100%;
    margin-bottom: 20px;;
}

`

export const Form = styled.form`
width:100%;
max-width:700px;
padding: 20px;
background-color: #000C24;
border-radius: 4px;
display:flex;
flex-direction:column;
gap: 20px;
`

export const Input = styled.input`
background-color:#2C1258;
max-width:100%;
height:40px;
border-radius: 4px;
color:#fff;
padding:5px;
border:none;
outline-color: #37D252;
font-size:18px;
`

export const Button = styled.button`
background-color:#37D252;
color:#fff;
border:none;
padding:8px;
border-radius:4px;
cursor:pointer;
font-weight: 700;
font-size:20px;

&&:hover{
    opacity: 0.8;
}

&&:active{
    opacity: 0.6;
}

`
