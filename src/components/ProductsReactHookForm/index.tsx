import { useFieldArray, useForm } from "react-hook-form";

interface IProduct {
  code: string;
  description: string;
  price?: number;
}

type FormValues = {
  products: IProduct[];
};

export const ProductReactHookForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const add = () => {
    append({
      code: "",
      description: "",
      price: undefined,
    });
  };

  console.log("errors: ", errors);

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {fields.map((item, index) => (
          <div key={item.id} className="row">
            {index + 1}
            <input
              type="text"
              placeholder="Code"
              {...register(`products.${index}.code`)}
            />
            <input
              type="text"
              placeholder="Description"
              {...register(`products.${index}.description`)}
            />
            <input
              type="text"
              placeholder="Price"
              {...register(`products.${index}.price`)}
            />
            <button className="delete" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        ))}
        <button className="send" type="submit">
          Send
        </button>
      </form>
      <button onClick={add} className="add">
        Add
      </button>

      <pre>
        <code>{JSON.stringify(fields, null, 2)}</code>
      </pre>
    </div>
  );
};
