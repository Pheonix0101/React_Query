import useProducts from "../hook/useProducts";
import { useMutation } from "@tanstack/react-query";
import "./App.css";

function Products() {
  const mutation = useMutation({
    mutationFn: () =>
      fetch("https://fakestoreapi.com/products/7", {
        method: "PUT",
        body: JSON.stringify({
          title: "test product",
          price: 13.5,
          description: "lorem ipsum set",
          image: "https://i.pravatar.cc",
          category: "electronic",
        }),
      })
        .then((res) => res.json())
        .then((json) => console.log(json)),
  });

  const { data, ispending, isError, Error } = useProducts();
  if (ispending) {
    return <h2>Loading.....</h2>;
  }
  if (isError) {
    return <h2>{Error.message}</h2>;
  }

  return (
    <>
      <div>
        {mutation.isPending ? (
          "Adding Product..."
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}

            <button onClick={() => {mutation.mutate()}}>Add Products</button>
            {mutation.isSuccess ? <div>Product added!</div> : null}

          </>
        )}
      </div>
      <div className="products">
        {data
          ? data.map((product) => {
              return (
                <div key={product.id} className="product">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default Products;
