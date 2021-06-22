type Status = 'Active' | 'Inactive';

export interface Props {
    handleEditNewsInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleCloseEditNews: () => void,
    handleUpdateNews: (e: React.MouseEvent<HTMLButtonElement>) => void,
    editedNews: News;
    error: string[]
}

export interface News {
    id: string;
    news_topic: string;
    news_body: string;
    news_status: Status;
}
