import React from "react";
import useFakeAPI from "../hook/useFakeAPI";
import { useMutation } from "@tanstack/react-query";

import "../App.css";

function MyProducts() {
  const mutation = useMutation({
    mutationFn: () =>
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
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
  const { data, isLoading, isError, Error } = useFakeAPI();

  if (isLoading) {
    return <h2>LOADING.........</h2>;
  }

  if (isError) {
    return <h3>{Error.message}</h3>;
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

            <button
              onClick={() => {
                mutation.mutate();
              }}
            >
              {mutation.isSuccess ? <div>Product added!</div> : null}
              Add Product
            </button>
          </>
        )}
      </div>
      <div className="myprod">
        {data &&
          data.map((item) => {
            return (
              <div key={item.id} className="prod">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <h3>{item.price}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default MyProducts;
