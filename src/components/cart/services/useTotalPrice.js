import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useTotalPrice = () => {
  return useQuery({
    queryKey: ["totalPrice"],
    queryFn: () => request.get("/carts").then((res) => res.data),
  });
};

export default useTotalPrice;
