import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input``
const Label = styled.label``
const Button = styled.button``

type Props = {
    onSubmit: (email: String, password: String) => void,
}

const AuthForm = ({ onSubmit }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        onSubmit(email, password);
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />

            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

            <Button type="submit" data-testid="submit">Log In</Button>
        </form>
    );
}

export default AuthForm;
