import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const fetchProducts = async () => {
    const products = await fetch('https://fakestoreapi.com/products');
    const data = await products.json();
    return data;
  };

  
  const { data, isPending, error, isError } = useQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
    });
    
  return {
    data,
    isPending,
    error,
    isError,
  };
};

export default useProducts;
