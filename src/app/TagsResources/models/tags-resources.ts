export interface appTagsResources {
    id: string;
    title: string;
    description: string;
    body: string;
    image: string;
    date: string;
    authors: {
        author: [{
            authorName: string,
            authorLink: string
        }]
    }
}