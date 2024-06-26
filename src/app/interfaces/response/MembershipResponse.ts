// Generated by https://quicktype.io

export interface SuccessMembershipsResponse {
    statusCode: string;
    message:    string;
    url:        string;
    object:     MembershipResponse[];
}

export interface SuccessMembershipResponse {
    statusCode: string;
    message:    string;
    url:        string;
    object:     MembershipResponse;
}

export interface MembershipResponse {
    id:         number;
    userId:     number;
    starDate:   Date;
    endingDate: Date;
    status:     boolean;
}

