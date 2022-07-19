import { PaginatedFormParams } from "../generics/paginated.model"

export class ReportModel extends PaginatedFormParams{
    nm_search?: string
    nm_usuario?: string
    nm_categoria?: string
}