import { useState } from "react";

import { Container, Form, Input, Button } from "./styles";
import imgLogo from "../../assets/logo.jpg";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmite(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        alert("Erro ao fazer login");
        console.log(error);
      });
  }

  return (
    <Container>
      <img src={imgLogo} alt="imagem do logo" />
      <Form onSubmit={handleSubmite}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Digite seu E-mail"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Digite sua Senha"
        />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
}
