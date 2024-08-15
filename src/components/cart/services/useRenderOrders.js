import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useRenderOrders = () => {
  return useQuery({
    queryKey: ["getOrders"],
    queryFn: () => request.get("/orders").then((res) => res.data),
  });
};

export default useRenderOrders;
