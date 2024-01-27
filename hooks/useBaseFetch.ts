import { baseURL } from "~/common";

const useBaseFetch = <T>(url: string, options = {}) => useFetch<T>(`${baseURL}/${url}`, options);

export default useBaseFetch;