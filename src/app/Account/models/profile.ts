export interface appProfile {
    id: number;
    fname: string;
    lname: string;
    sname: string;
    gender: string;
    dob: Date;
    country: string;
    state: string;
    city: string;
    zipcode: number;
    contactno: string;
    emailId: string;
    comments: string;
    status: string;
    time_Created: Date;
    user_Id: number;
    noof_view: number;
    atype: string;
    profile_status: string;
    images: string;
    images_200: string;
    images_500: string;
    lastupdate: Date;
    lastonline: Date;
    mar_status: string;
    per_Info: string;
    religion: string;
    ethnicity: string;
    plang: string;
    slang: string;
    pafflication: string;
    height: string;
    physique: string;
    complexion: string;
    eye: string;
    hair: string;
    living_situ: string;
    smoke: string;
    drink: string;
    ncountry: string;
    hschool: string;
    ucollege: string;
    gradschool: string;
    postgrade: string;
    edu_info: string;
    profesional: string;
    occup: string;
    industry: string;
    memeberof: string;
    cemp: string;
    pemp: string;
    skill: string;
    achieve: string;
    profinfo: string;
    interstinfo: string;
    interest: string;
    hobbies: string;
    lastonlinecur: Date;
    bname: string;
    sector: string;
    finac: string;
    cperson: string;
    pservices: string;
    userType: string;
    reporting: string;
    Featured: string;
    dispName: string;
    uName: string;
    messageservice: string;
    active_Inactive: string;
    status_Deleted: string;
    more: string;
    image: [];
    premium: string;
    connection: number;
    limitDate: Date;
    premLimitDate: Date;
    featureLimit: number;
    premiumLimit: number;
    upgradePrem: string;
    premPeriod: number;
    premRequestDate: Date;
    featureRequestDate: Date;
    featurePeriod: number;
    upgradeFeature: string
    sexuality: string
    childStatus: string;
    income: string;
    value: string;
    specialization: string;
    highestEducation: string;
    activitylevel: string;
    profStatus: string;
    certifications: string;
    phone: string;
    interestedin: string;
    profileType: string;
    inDailyMessagesLeft: number;
    outDailyMessagesLeft: number;
    connectionRequestsLimit: number;
    smallImage: [];
    photoTagline: string;
    publicEmailId: string;
    favoriteMusic: string;
    favoriteMovies: string;
    favoriteReads: string;
    favoriteSports: string;
    favoriteCuisines: string;
    favoriteDressStyle: string;
    favoriteOutings: string;
    sideImage: [];
    rightSideImage: [];
    leftSideImageTile: boolean;
    rightSideImageTile: boolean;
    missionAndVision: string;
    isRecAutoMailsToNewConnectionsRequest: boolean;
    isRecAutoMailsToNewMessagesRequest: boolean;
    tag: string;
    isViewAnonymous: boolean
    canvasImageUrl: string;
    passportImageUrl: string;
    LeftImageUrl: string;
    RightImageUrl: string;
    EnableFollowers: boolean;
    IsRecAutoMailsToAcceptedConnectionsRequest: boolean;
    IsRecAutoMailsToNewFollowers: boolean;
    ShowContactInfo: number;
    TempEmail: string;
    TempEmailVerificationCode: string;
    summary: string;
    EnableStatsEmails: boolean;
    statsEmailSettings: number;
    authorizedPersonnel: string;
    isShowAgeOnly: boolean;
    diet: string;
    exercise: string;
    disability: string;
    fullName: string;
    Seeking: string;
    AgeGroup: string;
    searchKeyWord: string;
    howDoYouKnowAboutUs: string;
    profileStatusByAdmin: string;
    EditsMade: boolean;
    promotionalEmailSetting: number;
    isRecAutoMailsToPostingActivity: boolean;
    mode: string;
    isShowPhotosOnly: boolean;
    relationShip: string;
    contactMail: string;
    website: string;
    messenger: string;
    other: string;
}
export interface appProfileCustomFields {
    id: number;
    uid: number;
    tabName: string;
    aCustomLabel1: string;
    aCustomLabel2: string;
    aCustomLabel3: string;
    aCustomLabel4: string;
    aCustomLabel5: string;
    aCustomLabel6: string;
    aCustomLabel7: string;
    aCustomLabel8: string;
    aCustomText1: string;
    aCustomText2: string;
    aCustomText3: string;
    aCustomText4: string;
    aCustomText5: string;
    aCustomText6: string;
    aCustomText7: string;
    aCustomText8: string;
}
export interface appProfileFavLike {
    profileUserId: number;
    userId: number;
    isLiked: boolean;
}
export interface appCheckUniqueUserNameEmail {
    id: number;
    username: string;
    email: string;
    isValid: number;
    isValidR: number;
}
export interface appProfileBlock {
    abuseId: number;
    userId: string;
    abuseProfileId: string;
    isReport: boolean;
    isBlock: boolean;
    reportCause: string;
    reportDetails: string;
    date: Date;
    sname: string;
    atype: string;
}
export interface appProfilePhoto {
    id: number;
    profileId: number;
    imageName: string;
    imageDescription: string;
    imageAlt: string;
    imageUrl: string;
    dateCreated: Date;
    imageBase64: string;
    imageExtention: string;
}
export interface appRegister {
    id: number;
    userId: string;
    password: string;
    emailId: string;
    validationKey: string;
}
export interface appProfileSeeking {
    id: number;
    userId: number;
    gender: string;
    ms: string;
    children: string;
    sex: string;
    religion: string;
    ethnicity: string;
    political: string;
    disablity: string;
    income: string;
    height: string;
    physique: string;
    eyes: string;
    hair: string;
    diet: string;
    drink: string;
    smoke: string;
    exercise: string;
    slang: string;
    highestEdu: string;
    profession: string;
    sector: string;
    industry: string;
    status: string;
    activityLevel: string;
    country: string;
    ageGroup: string;
}
export interface appRelatedProfiles {
    id: number;
    userId: number;
    sname: string;
    city: string;
    gender: string;
    dob: Date;
    country: string;
    uName: string;
    profileImage: string;
}
