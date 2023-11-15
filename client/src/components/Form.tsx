import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
`;
const ErrorMsg = styled.p`
  color: red;
  padding: 0;
  margin: 0 0 1em 0;
`;

const TextArea = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 5em;
`;

const Label = styled.label`
  display: block;
  margin-top: 1em;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0;
`;

const Fieldset = styled.fieldset`
  margin-bottom: 1em;
  border: 1px solid #0008;
`;

export { Button, ErrorMsg, Fieldset, Input, Label, TextArea };
