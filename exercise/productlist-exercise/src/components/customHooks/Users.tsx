import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {UserData} from "../../dataTypes";

export default function useGetAllUsers() {
    const {data, error} = useFetch<UserData>(createApiUrl(apiQueries.User));
    return {userList: data, userListError: error}
}