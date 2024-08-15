import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useGetFoods = () => {
  return useQuery({
    queryKey: ["getFoods"],
    queryFn: () => request.get("/foods").then((res) => res.data.data),
  });
};

export default useGetFoods;
