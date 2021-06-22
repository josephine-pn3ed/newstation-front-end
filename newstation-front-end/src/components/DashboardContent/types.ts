//type Status = "Active" | "Inactive";

export interface Props {
    handleCloseAddForm: () => void;
<<<<<<< HEAD
}

// export interface News {
//     id: string;
//     news_topic: string;
//     news_body: string;
//     news_status: Status;
// }
=======
    handleUpdateForm: (id: string) => void;
    max_width: any;
    news: News[]
}

type Status = "Active" | "Inactive";

export interface News {
    id: string,
    company_id: string,
    news_topic: string,
    news_body: string,
    news_image: any | null,
    news_status: Status,
    created_at: string,
    updated_at: string
}
>>>>>>> 32054668505ec360329909e82c3005397eca54da
