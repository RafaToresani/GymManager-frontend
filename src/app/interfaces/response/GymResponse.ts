// Generated by https://quicktype.io
export interface SuccessGymPageResponse {
    statusCode: string;
    message:    string;
    url:        string;
    object:     GymPage;
}

export interface GymPage {
    content:          GymResponse[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface SuccessGymResponse {
    statusCode: string;
    message:    string;
    url:        string;
    object:     GymResponse;
}

export interface GymResponse {
    id:          number;
    title:       string;
    email:       string;
    city:        string;
    street:      string;
    number:      string;
    postalCode:  number;
    phoneNumber: string;
    isActive:    boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

