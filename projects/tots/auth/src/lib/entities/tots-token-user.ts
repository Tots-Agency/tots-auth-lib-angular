import { TotsUser } from "./tots-user";

export class TotsTokenUser extends TotsUser {
    public token_type: string = 'bearer';
    public access_token: string = '';
}