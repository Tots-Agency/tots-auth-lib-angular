export class TotsUser {
    static STATUS_INACTIVE = 0;
    static STATUS_ACTIVE = 1;
    static STATUS_SUSPENDED = 2;

    public id?: number;
    public firstname: string = '';
    public lastname: string = '';
    public email: string = '';
    public photo?: string = '';
    public phone?: string = '';
    public role: number = 0;
    public status: number = 0;
    public is_notification: number = 0;
    public caption?: string = '';
    public timezone?: string = '';
    public created_at: string = '';
}