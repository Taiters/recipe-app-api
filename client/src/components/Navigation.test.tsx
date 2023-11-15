import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../app/auth";
import Navigation from "./Navigation";

test("Does not show logout button when user is not authenticated", () => {
  render(
    <AuthContext.Provider value={null}>
      <MemoryRouter>
        <Navigation onLogout={() => {}} />
      </MemoryRouter>
    </AuthContext.Provider>,
  );

  expect(screen.queryByTestId("logout")).toBeNull();
});

test("Shows logout button and email when user is authenticated", async () => {
  const user = userEvent.setup();
  const authUser = {
    email: "test@example.com",
    token: "token-1234",
  };
  const logoutFn = jest.fn();

  render(
    <AuthContext.Provider value={authUser}>
      <MemoryRouter>
        <Navigation onLogout={logoutFn} />
      </MemoryRouter>
    </AuthContext.Provider>,
  );

  const logoutButton = screen.getByTestId("logout");

  expect(screen.getByTestId("current-user")).toHaveTextContent(authUser.email);

  await user.click(logoutButton);

  expect(logoutFn).toHaveBeenCalledTimes(1);
});
