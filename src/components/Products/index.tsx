import { useState } from "react";

interface IProduct {
  code: string;
  description: string;
  price?: number;
  key: number;
}

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([
    {
      code: "10",
      description: "keyBoard",
      price: 98,
      key: 1,
    },
  ]);

  const add = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        code: "",
        description: "",
        price: undefined,
        key: Date.now(),
      },
    ]);
  };

  const remove = (key: number) => {
    setProducts((prevState) =>
      prevState.filter((product) => product.key !== key)
    );
  };

  const handleInputChange = (
    key: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProducts((prevState) => {
      const newState = prevState.map((product) => {
        if (product.key === key) {
          return {
            ...product,
            [event.target.name]: event.target.value,
          };
        }
        return product;
      });
      return newState;
    });
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((item, index) => (
        <div key={item.key} className="row">
          {index + 1}
          <input
            type="text"
            placeholder="Code"
            name="code"
            onChange={(event) => handleInputChange(item.key, event)}
            value={item.code}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={(event) => handleInputChange(item.key, event)}
            value={item.description}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            onChange={(event) => handleInputChange(item.key, event)}
            value={item.price}
          />
          <button onClick={() => remove(item.key)} className="delete">
            Delete
          </button>
        </div>
      ))}
      <button onClick={add} className="add">
        Add
      </button>

      <pre>
        <code>{JSON.stringify(products, null, 2)}</code>
      </pre>
    </div>
  );
};
