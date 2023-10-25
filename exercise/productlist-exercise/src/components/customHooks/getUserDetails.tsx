import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {UserData} from "../../dataTypes";

export function useGetUserDetails() {

    const {data, error} = useFetch<UserData>(createApiUrl(apiQueries.UserDetails));
    return {userDetails: data, userDataError: error}
}