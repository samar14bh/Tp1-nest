import { Injectable } from "@nestjs/common";
import { ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class PaginationService {

constructor() { }

async paginate<T extends ObjectLiteral>(
    repository:Repository<T>,
    page: number=1,
    limit: number=10,
):Promise<any>
{
    const skip= (page - 1) * limit;
    const [result, total] = await repository.findAndCount({
        skip,
        take: limit,
    });
    return {
        data: result,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };

}


}
