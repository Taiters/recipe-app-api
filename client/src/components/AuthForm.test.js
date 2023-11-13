import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";

test('onSubmit recieves email and password entered on form', async () => {
    const user = userEvent.setup()
    const email = 'email@example.com'
    const password = 'secret password'
    const onSubmit = jest.fn()

    render(<AuthForm onSubmit={onSubmit} />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByTestId('submit');

    await user.click(emailInput)
    await user.keyboard(email)
    await user.click(passwordInput)
    await user.keyboard(password)
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(email, password)
});
