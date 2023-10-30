import useFetch, {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {IUserData} from "../../dataTypes";

export default function useGetAllUsers() {
    const {data, error} = useFetch<IUserData>(createApiUrl(apiQueries.User));
    return {userList: data, userListError: error}
}