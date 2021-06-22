type Status = 'Active' | 'Inactive';

export interface News {
    id: string;
    news_topic: string;
    news_body: string;
    news_status: Status;
}
