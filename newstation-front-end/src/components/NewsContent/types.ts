export interface Props {
<<<<<<< HEAD:newstation-front-end/src/components/DashboardContent/types.ts
    handleCloseAddForm: (open: boolean) => void;
    handleUpdateForm: (id: string) => void;
    handleButtonDelete: (id: string) => void;
    addForm: boolean;
    company: string;
    max_width: any;
    news: News[];
=======
  handleCloseAddForm: (open: boolean) => void;
  handleUpdateForm: (id: string) => void;
  handleButtonDelete: (id: string) => void;
  closeAddForm: boolean;
  max_width: any;
  news: News[];
>>>>>>> 4e6983b8e6ced4a0a2abf8ba38b670d6efb9eb4e:newstation-front-end/src/components/NewsContent/types.ts
}

export interface News {
<<<<<<< HEAD:newstation-front-end/src/components/DashboardContent/types.ts
    id: string;
    company_id: string;
    news_topic: string;
    news_body: string;
    news_image: any | null;
    news_status: Status;
    created_at: string;
    updated_at: string;
=======
  id: string;
  company_name: string;
  user_id: string;
  user_first_name: string;
  user_middle_name: string;
  user_last_name: string;
  news_topic: string;
  news_body: string;
  updated_at: string;
>>>>>>> 4e6983b8e6ced4a0a2abf8ba38b670d6efb9eb4e:newstation-front-end/src/components/NewsContent/types.ts
}
