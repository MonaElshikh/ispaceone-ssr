export interface appTicketMaster {
    id: number;
    userId: number;
    adminId: number;
    typeOfProblem: string;
    problemName: string;
    problemDate: Date;
    problemStatus: string;
    problemSolvingRate: string;
    userComments: string;
    adminComments: string;
}
export interface appTicketDetailstbl {
    id: number;
    ticketId: number;
    senderId: number;
    receiverId: number;
    body: string;
    replyDate: Date;
}