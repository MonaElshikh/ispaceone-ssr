export interface appMessages {
    id: number;
    senderId: number;
    receiverId: number;
    date: Date;
    readDate: Date;
    readIds: number;
    deleteIds:string;
    flagIds: string;
    sname: string;
    rname: string;
    subject: string;
    threadMesgCount: number;
    lastReceiverId: number;
    receiverImage: string;
    senderImage: string;
    receiveruName: string;
    senderuName: string;
    newMesgCount:number;
    mutuallikes:number;
    mutualFav:number;
}
export interface appMessageThreads {
    id: number;
    threadId: number;
    message: string;
    date: string;
    senderId: number;
    receiverId: number;
    sname: string;
    rname: string
    readDate: Date;
    readIds: number;
    receiverImage: string;
    senderImage: string;
    senderuName: string;
}