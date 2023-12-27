import {ListTableStore} from "./ListTableStore";
import {action, makeObservable, observable, toJS} from "mobx";

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
    @observable dataLoading: boolean = true;
    @observable skip: number = 0;

    constructor() {
        this.postList = new ListTableStore<PostsList>("", this.skip);
        this.skip = this.postList.skip;
        this.fetch();
        makeObservable(this);
    }

    @action
    async fetch() {
        const fetchedData = this.fetchPost();
        this.postList.data = await fetchedData;
        console.log(toJS(this.postList.data));
    }

    fetchPost = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${this.postList.skip}`);
            const data = await response.json();
            this.updateLoading();
            return data;
        } catch (error) {
            console.error("Error fetching Posts", error);
            throw error;
        }
    };

    @action nextPage() {
        this.postList.nextPage();
        this.skip = this.postList.skip;
        this.fetch();
        console.log(this.skip);
    }

    @action updateLoading() {
        this.dataLoading = !this.dataLoading;
    }
}