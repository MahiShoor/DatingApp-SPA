export interface Pagination {
    totalPages: number;
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
}

export class PaginatedResult <T> {
result: T;
pagination: Pagination;
}
