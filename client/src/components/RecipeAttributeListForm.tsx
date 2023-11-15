import { RecipeAttribute } from "../app/models";

type Props = {
    attributeType: string,
    list: RecipeAttribute[],
    onChange: (list: RecipeAttribute[]) => void,
}

const RecipeAttributeListForm = ({ attributeType, list, onChange }: Props) => {
    const setItem = (name: string, i: number) => {
        const copiedList = [...list];
        copiedList[i] = { name }
        onChange(copiedList);
    }

    const removeItem = (i: number) => {
        const copiedList = [...list];
        copiedList.splice(i, 1)
        onChange(copiedList);
    }

    const addItem = () => {
        onChange([
            ...list,
            { name: "" }
        ]);
    }

    return (
        <div>
            {list.map((item, i) => (
                <div key={i}>
                    <input
                        data-testid={`${attributeType}-${i}`}
                        type="text"
                        value={item.name}
                        onChange={e => setItem(e.target.value, i)} />
                    <button type="button" data-testid={`remove-${attributeType}-${i}`} onClick={() => removeItem(i)}>Remove</button>
                </div>
            ))}
            <button type="button" data-testid={`add-${attributeType}`} onClick={addItem}>Add</button>
        </div>
    );
}

export default RecipeAttributeListForm;
