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
            const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${this.postList.skip}`);
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
}