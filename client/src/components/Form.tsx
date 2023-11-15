import styled from "styled-components";

const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1em;
`;

const TextArea = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 5em;
  margin-bottom: 1em;
`;

const Label = styled.label`
  display: block;
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

export { Button, Fieldset, Input, Label, TextArea };
