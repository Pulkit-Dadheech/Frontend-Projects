import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {IUserData} from "../../dataTypes";

export function useGetUserDetails() {

    const {data, error} = useFetch<IUserData>(createApiUrl(apiQueries.UserDetails));
    return {userDetails: data, userDataError: error}
}