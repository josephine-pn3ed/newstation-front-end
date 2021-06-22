import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import DashboardContent from '../../components/DashboardContent';
import EditNewsForm from '../../components/EditNewsForm';
import AddNewsForm from '../../components/AddNewsForm';
import useStyles from '../../styles/_Dashboard';
import { logout } from '../../utils';
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RestoreIcon from '@material-ui/icons/Restore';
import { Tooltip, IconButton } from "@material-ui/core";
import { News } from './types'

const Dashboard = () => {

  const classes = useStyles();
  const history = useHistory();

  const [closeAddForm, setCloseAddForm] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<string[][]>([]);
  const [error, setError] = useState<string[]>([]);
  const [closeEditNews, setCloseEditNews] = useState<boolean>(false);
  const [editedNews, setEditedNews] = useState<News>({
    id: "",
    news_topic: "",
    news_body: "",
    news_status: "Active"
  })

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

  const handleEditNewsInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedNews({ ...editedNews, [name]: value })
  }

  const handleCloseEditNews = () => {
    setCloseEditNews(false);
  }


  const getNews = async () => {
    const result = await axios.get('/News');
    const { data } = result;
    console.log(data)
    const newsData: string[][] = [];
    data.map((value: News) => {
      const { id, news_topic, news_body, news_status } = value;
      const news: any[] = [];

      news.push(id);
      news.push(news_topic);
      news.push(news_body);
      news.push(news_status);

      news.push(actionButtons(id, news_status));

      newsData.push(news);
    })
    setNewsData(newsData);
  }

  const actionButtons = (id: string, news_status: string) => {
    return (
      <div>
        <Tooltip color="primary" title="Edit" onClick={() => handleEditNewsButton(id)} >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>

        {news_status === 'Active' ?
          <Tooltip color="secondary" title="Delete" onClick={() => handleDeleteNewsButton(id)} >
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip> :
          <Tooltip color="default" title="Delete" onClick={() => handleRestoreNews(id)} >
            <IconButton>
              <RestoreIcon />
            </IconButton>
          </Tooltip>}


      </div>
    )
  }

  const handleUpdateNews = async () => {
    console.log(editedNews)
    const { id } = editedNews
    const result = await axios.put('/employee/' + id, editedNews)
    getNews();
    handleCloseEditNews();
  }


  const handleEditNewsButton = async (id: string) => {

    const result = await axios.get('/news/' + id);
    const { data } = result;
    console.log(data);
    setEditedNews(data)
    setCloseEditNews(true);
  }

  const handleDeleteNewsButton = async (id: string) => {
    const result = await axios.delete('/news/' + id);
    console.log(result)
    getNews();
  }

  const handleRestoreNews = async (id: string) => {
    const result = await axios.put('/news/restore/' + id);
    getNews();
  }

  useEffect(() => {
    getNews();
  }, [])



  return (
    <div className={classes.root}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} handleLogoutButton={handleLogoutButton} />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      <DashboardContent handleCloseAddForm={handleCloseAddForm} />
      {closeAddForm && (<AddNewsForm handleCloseAddForm={handleCloseAddForm} />)}
      {closeEditNews ? (<EditNewsForm handleEditNewsInput={handleEditNewsInput} handleCloseEditNews={handleCloseEditNews}
        handleUpdateNews={handleUpdateNews} error={error} editedNews={editedNews} />) : ""}
    </div>
  )
}

export default Dashboard;