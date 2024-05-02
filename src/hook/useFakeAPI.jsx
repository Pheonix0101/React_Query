import React from "react";

import { useQuery } from "@tanstack/react-query";

function useFakeAPI() {
  const fetchProducts = async () => {
    const result = await fetch("https://fakestoreapi.com/products");
    const data = await result.json();
    return data;
  };
  const { data, isLoading, isError,Error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return {
    data,
    isLoading,
    isError,
    Error
  };
}

export default useFakeAPI;
