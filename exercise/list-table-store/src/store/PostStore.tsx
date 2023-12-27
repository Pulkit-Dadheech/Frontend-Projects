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
        this.postList = new ListTableStore<PostsList>({posts: [], total: 0, skip: 0, limit: 0});
        this.fetch();
        makeObservable(this);
    }

    @action
    async fetch() {
        const fetchedData = this.fetchPost();
        this.postList.updateData(await fetchedData);
    }

    fetchPost = async () => {
        try {
            let response;
            if(this.postList.title){
                response=await fetch(`https://dummyjson.com/posts/search?q=${this.postList.title}`)
            }
            else{

                response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${this.postList.skip}`);
            }
            const data = await response.json();
            this.postList.total = data.total;
            return data;
        } catch (error) {
            console.error("Error fetching Posts", error);
            throw error;
        }
    };

    @action nextPage() {
        this.postList.nextPage();
        this.fetch();
    }

    @action prevPage() {
        this.postList.prevPage();
        this.fetch();
    }

    @action search(title: string){
        this.postList.SearchData(title);
        this.fetch();
    }
}