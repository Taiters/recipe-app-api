/**
 * The page header with the title and some navigation.
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthenticatedUser } from "../app/auth";

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  text-decoration: underline;
  flex-grow: 1;
`;

type Props = {
  onLogout: () => void;
};

function Navigation({ onLogout }: Props) {
  const currentUser = useAuthenticatedUser();

  return (
    <Nav>
      <Title>
        <Link to="/">Recipe App</Link>
      </Title>
      {currentUser != null && (
        <span data-testid="current-user">
          Hello <b>{currentUser.email}</b>{" "}
          <button data-testid="logout" onClick={onLogout}>
            Logout
          </button>
        </span>
      )}
    </Nav>
  );
}

export default Navigation;
