/**
 * The form used to log a user in.
 */
import { useState } from "react";
import styled from "styled-components";
import { Button, Input, Label } from "./Form";

const Title = styled.h3`
  text-align: center;
`;
const Form = styled.form`
  width: 320px;
  margin: 0 auto;
`;

type Props = {
  onSubmit: (email: string, password: string) => void;
};

function AuthForm({ onSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(email, password);
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="auth-form">
      <Title>Log in to continue</Title>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" data-testid="submit">
        Log In
      </Button>
    </Form>
  );
}

export default AuthForm;
