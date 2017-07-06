export interface IPostAbstract {
    postId?: number;
    author: string;
    publishDate: string;
    bgImageFileName: string;
    header: string;
    subheader: string;
    abstract: string;
}

export interface IPostData {
    id?: number;
    abstract: IPostAbstract;
    text: string;
}