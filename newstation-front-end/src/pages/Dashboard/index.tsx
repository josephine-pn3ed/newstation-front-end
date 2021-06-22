import axios from 'axios';
import { useDebugValue, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import DashboardContent from '../../components/DashboardContent';
import NewsForm from '../../components/NewsForm';
import useStyles from '../../styles/_Dashboard';
import { logout, getCompanyId } from '../../utils';
import { State } from './types';

const Dashboard = () => {

  const classes = useStyles();
  const history = useHistory();

  const [closeAddForm, setCloseAddForm] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);
  const [news, setNews] = useState<State>({
    id: '',
    company_id: '',
    news_topic: '',
    news_body: '',
    news_image: null,
    news_status: 'Active',
    created_at: '',
    updated_at: ''
  })

  const [retrievedNews, setRetrievedNews] = useState<State[]>([]);

  const [error, setError] = useState<string[]>([]);

  const handleLogoutButton = () => {
    logout();
    history.push('/login');
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseAddForm = () => {
    setCloseAddForm(!closeAddForm);
  }

  const handleUpdateForm = async (newsId: string) => {
    try {
      const newsById = await axios.get('/news-company/' + newsId);
      const { result, success } = newsById.data;
      const { id, company_id, news_topic, news_body, news_image, news_status, created_at, updated_at } = result;

      if (!success) throw Error;
      setCloseAddForm(true);
      setNews({
        id: id,
        company_id: company_id,
        news_topic: news_topic,
        news_body: news_body,
        news_image: news_image,
        news_status: news_status,
        created_at: created_at,
        updated_at: updated_at
      })
    } catch (error) {
      alert('There is an error while getting news!')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setNews({ ...news, [name]: value });
  };

  const handleButtonUpdate = async (id: string) => {
    const { news_topic, news_body } = news;
    let errors: string[] = [];
    try {
      !(news_topic) && errors.push('news_topic');
      !(news_body) && errors.push('news_body');

      setError(errors);

      const result = await axios.put('/news/' + id, {
        news_topic: news_topic,
        news_body: news_body,
      });

      const { success } = result.data;

      if (!success) throw Error;

      handleCloseAddForm();
      getNews();
    } catch (error) {
      alert('There is an error while updating news!')
    }
  }

  const handleButtonSubmit = async () => {
    const { news_topic, news_body, news_image } = news;
    let errors: string[] = [];

    try {
      !(news_topic) && errors.push('news_topic');
      !(news_body) && errors.push('news_body');

      setError(errors);

      if (!errors.length) {
        const result = await axios.post('/news', {
          news_topic: news_topic,
          news_body: news_body,
          news_image: null,
          company_id: getCompanyId()
        })

        const { success } = result.data;

        if (!success) throw Error;
        success && handleCloseAddForm();
        getNews();
      }
    } catch (error) {
      alert('An error occurred while adding news!');
    }
  }

  const getNews = async () => {
    const news = await axios.get('/news/' + getCompanyId(), {

    });
    const { result } = news.data;
    setRetrievedNews(result)
  }

  useEffect(() => {
    getNews();
  }, [])

  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <DashboardContent
        handleCloseAddForm={handleCloseAddForm}
        handleUpdateForm={handleUpdateForm}
        news={retrievedNews}
        max_width={closeAddForm ? "lg" : "xl"}
      />
      {closeAddForm &&
        (<NewsForm
          handleCloseAddForm={handleCloseAddForm}
          handleInputChange={handleInputChange}
          handleButtonSubmit={handleButtonSubmit}
          handleButtonUpdate={handleButtonUpdate}
          news={news}
        />)}
    </div>
  )
}

export default Dashboard;
