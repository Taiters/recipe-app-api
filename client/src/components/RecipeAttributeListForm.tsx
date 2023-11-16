/**
 * Renders a list of attributes (ingredients / tags) in a recipe form.
 */
import styled from "styled-components";
import { RecipeAttribute } from "../app/models";
import { Input as FormInput } from "./Form";

const InputRow = styled.div`
  display: flex;
  margin-bottom: 1em;
  gap: 0.5em;
`;
const Input = styled(FormInput)`
  margin-bottom: 0;
`;

type Props = {
  attributeType: string;
  list: RecipeAttribute[];
  onChange: (list: RecipeAttribute[]) => void;
};

function RecipeAttributeListForm({ attributeType, list, onChange }: Props) {
  const setItem = (name: string, i: number) => {
    const copiedList = [...list];
    copiedList[i] = { name };
    onChange(copiedList);
  };

  const removeItem = (i: number) => {
    const copiedList = [...list];
    copiedList.splice(i, 1);
    onChange(copiedList);
  };

  const addItem = () => {
    onChange([...list, { name: "" }]);
  };

  return (
    <div>
      {list.map((item, i) => (
        <InputRow key={i}>
          <Input
            data-testid={`${attributeType}-${i}`}
            type="text"
            value={item.name}
            onChange={(e) => setItem(e.target.value, i)}
          />
          <button
            type="button"
            data-testid={`remove-${attributeType}-${i}`}
            onClick={() => removeItem(i)}
          >
            Remove
          </button>
        </InputRow>
      ))}
      <button
        type="button"
        data-testid={`add-${attributeType}`}
        onClick={addItem}
      >
        Add
      </button>
    </div>
  );
}

export default RecipeAttributeListForm;
