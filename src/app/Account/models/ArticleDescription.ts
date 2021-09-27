export interface appArticleDescription {
    id: number;
    catId: number;
    category: string;
    header: string;
    description: string;
    status: string;
    timeCreated: Date;
    author: string;
    uname: string;
    viewno: number;
    likecomm: number;
    disLikecomm: number;
    userId: number;
    avgrate: number;
    reporting: string;
    articleUserId: string;
    commentStatus: string;
    isFromArticlePackCredits: number;
    additionalProductId: number;
    passportImageURL: string;
    postingLargeImageUrl: string;
    postingSmallImageUrl: string;
    tag: string;
    imageDescription: string;
    video: string;
    file: string;
    onllinStatus: string;
    lockUnlock: number;
    isActive:boolean;
    picture:string;
    articleComments: appArticleComments[];
}
export interface appArticleList {
    id: number;
    user_Id: number;
    cat_Id: number;
    viewNo: number;
    viewMode:number;
    isFromArticlePackCredits: number;
    recoredsCount: number;
    author: string;
    uname: string;
    city: string;
    aType: string;
    header: string;
    status: string;
    category: string;
    tag: string;
    onllinStatus: string;
    lockUnlock: number;
    time_created: Date;
    passportImageURL: string;
    postingLargeImageUrl: string;
    searchKeyWord:string;
}
export interface appArticleComments {
    id: number;
    articleId: number;
    comments: string;
    name: string;
    emailId: string;
    location: string;
    timeCreated: Date;
    status: string;
    likecomm: number;
    dislikecomm: number;
    uname: string;
    articleCommentStatus: string;
    reportingAbused: string;
    isEdited: boolean;
    editDate: Date;
    commentAuthorImage: string;
}
export interface appBaseArticleComment {
    id: number;
    articleId: number;
    comments: string;
    name: string;
    emailId: string;
    location: string;
    timeCreated: string;
    status: string;
    likecomm: number;
    dislikecomm: number;
    uname: string;
    articleCommentStatus: string;
    reportingAbused: string;
    isEdited: boolean;
    editDate: Date;
}
export interface appCommentLikeDislike {
    id: number;
    cid: number;
    uname: string;
    likec: number;
    dlikec: number;
    likedDate: Date;
}
export interface appArticleCustomFields {
    id: number;
    articleId: number;
    customLabel: string;
    customValue: string;
}
export interface appArticleLikeDislike {
    id: number;
    aid: number;
    uname: string;
    likea: number;
    dlikea: string;
    date: Date;
}
export interface appArticleTrack {
    id: number;
    userId: number;
    articleId: number;
    ratingNo: number;
    date: Date;
}
export interface appArticleCategories {
    cat_Id: number;
    catName: string;
    catLink: string;
}
export interface appRelatedArticles{
    id:number;
    userId:number;
    header:string;
    reporting:string;
    author:string;
    category:string;
    catId:number;
    uName:string;
    profileImage:string;
}

