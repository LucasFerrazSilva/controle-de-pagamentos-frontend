import { Sort } from "./sort.interface";
import { Pageable } from "./pageable.interface";

export interface Page<T> {
    content: T[];
    pageable: Pageable;
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: Sort,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}