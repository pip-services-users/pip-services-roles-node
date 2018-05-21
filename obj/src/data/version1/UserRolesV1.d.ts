import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class UserRolesV1 implements IStringIdentifiable {
    constructor(id: string, roles: string[]);
    id: string;
    roles: string[];
    update_time: Date;
}
