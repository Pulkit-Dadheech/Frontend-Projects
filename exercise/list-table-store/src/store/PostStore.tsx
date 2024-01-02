import {ListTableStore} from "./ListTableStore";
import {action, makeObservable} from "mobx";

export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface PostsList {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}

export class PostStore {
    postList: ListTableStore<PostsList>;
    searchTimeout: number=0;
    constructor() {
        this.postList = new ListTableStore<PostsList>(this.fetchPost);
        makeObservable(this);
    }

    async fetchPost(skip: number,search?: string){
        try {
            let response;
            if(search){
                response=await fetch(`https://dummyjson.com/posts/search?q=${search}`)
            }
            else{
                response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching Posts", error);
        }
    };
}