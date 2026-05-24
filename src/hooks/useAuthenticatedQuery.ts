import { useQuery } from "@tanstack/react-query"
import type { AxiosRequestConfig } from "axios"

import axiosInstance from "../config/axios.config"

const useAuthenticatedQuery = (queryKey: string[], url: string, config: AxiosRequestConfig) => {
    return useQuery({ queryKey, queryFn: async () => {
        const { data } = await axiosInstance.get(url, config)
        return data
    }})
}

export default useAuthenticatedQuery