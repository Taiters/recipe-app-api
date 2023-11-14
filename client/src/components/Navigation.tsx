import React from "react";
import styled from "styled-components";
import { useAuthenticatedUser } from "../app/auth";

const Nav = styled.nav``;
const Title = styled.h1``;
const CurrentUser = styled.span``;
const Button = styled.button``;

type Props = {
    onLogout: () => void,
}

const Navigation = ({ onLogout }: Props) => {
    const currentUser = useAuthenticatedUser();

    return (
        <Nav>
            <Title>Recipe App</Title>
            {currentUser != null && (
                <CurrentUser data-testid="current-user">Hello {currentUser.email}
                    <Button data-testid="logout" onClick={onLogout}>Logout</Button>
                </CurrentUser>
            )}
        </Nav>
    )
}

export default Navigation;
