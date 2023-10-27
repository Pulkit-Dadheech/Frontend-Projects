import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {UserName} from "../../dataTypes";

export function useGetUserDetails() {

    const {data, error} = useFetch<UserName>(createApiUrl(apiQueries.UserDetails));
    return {userDetails: data, userDataError: error}
}