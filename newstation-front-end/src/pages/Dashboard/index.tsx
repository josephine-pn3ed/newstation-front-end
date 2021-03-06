import axios from "axios";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
import NewsContent from "../../components/NewsContent";
import NewsForm from "../../components/NewsForm";
import useStyles from "../../styles/_Dashboard";
import {
  logout,
  getCompanyId,
  getUserId,
  displayConfirmation,
} from "../../utils";
import { State } from "./types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const classes = useStyles();

  const history = useHistory();

  const [closeAddForm, setCloseAddForm] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);

  const [addForm, setAddForm] = useState<boolean>(true);

  const [news, setNews] = useState<State>({
    id: "",
    company_name: "",
    user_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    topic: "",
    body: "",
    status: "Active",
    created_at: "",
    updated_at: "",
  });

  const [newsLoaded, setNewsLoaded] = useState<boolean>(false);

  const [retrievedNews, setRetrievedNews] = useState<State[]>([]);

  const [error, setError] = useState<string[]>([]);

  const handleLogoutButton = () => {
    logout();
    history.push("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCloseAddForm = (open: boolean) => {
    setError([]);
    setNews({
      id: "",
      company_name: "",
      user_id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      topic: "",
      body: "",
      status: "Active",
      created_at: "",
      updated_at: "",
    });
    setCloseAddForm(open);
    setAddForm(true);
  };

  const handleUpdateForm = async (newsId: string) => {
    setError([]);
    setAddForm(false);
    try {
      const response = await axios.get("/news-company/" + newsId);
      const { data } = response;

      if (data === "Database down!" || data === "No news found!") throw data;
      const { id, topic, body, status, created_at, updated_at } = data;
      setCloseAddForm(true);
      setNews({
        id: id,
        company_name: "",
        user_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        topic: topic,
        body: body,
        status: status,
        created_at: created_at,
        updated_at: updated_at,
      });
      setAddForm(false);
    } catch (error) {
      if (error === "No news found!") {
        toast(error, {
          type: "error",
        });
      } else {
        toast("Internal Server Error!", {
          type: "error",
        });
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setNews((news) => ({ ...news, [name]: value }));
  };

  const handleButtonDelete = async (id: string) => {
    const result = await displayConfirmation("delete", "news");
    if (result) {
      try {
        const response = await axios.delete("/news/" + id);
        const { data } = response;

        if (data === "Database down!" || data === "News not deleted!") throw DataView;

        toast("News deleted successfully!", {
          type: "success",
        });

        getNews();
      } catch (error) {
        if (error === "News not deleted!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const handleButtonUpdate = async (id: string) => {
    const { topic, body } = news;
    let errors: string[] = [];

    !topic && errors.push("topic");
    !body && errors.push("body");

    setError(errors);

    if (!errors.length) {
      try {
        const result = await axios.put("/news/" + id, {
          topic: topic,
          body: body,
        });

        const { data } = result;

        if (data === "Database down!" || data === "News not updated!") throw data;

        toast("News updated successfully!", {
          type: "success",
        });

        handleCloseAddForm(false);
        getNews();
      } catch (error) {
        if (error === "News not updated!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const handleButtonSubmit = async () => {
    const { topic, body } = news;
    let errors: string[] = [];

    !topic && errors.push("topic");
    !body && errors.push("body");

    setError(errors);

    if (!errors.length) {
      try {
        const result = await axios.post("/news", {
          topic: topic,
          body: body,
          company_id: getCompanyId(),
          user_id: getUserId(),
        });

        const { data } = result;

        if (data === "Database down!" || data === "News not added!") throw data;

        toast(data, {
          type: "success",
        });
        handleCloseAddForm(false);
        getNews();
      } catch (error) {
        if (error === "News not added!") {
          toast(error, {
            type: "error",
          });
        } else {
          toast("Internal Server Error!", {
            type: "error",
          });
        }
      }
    }
  };

  const getNews = async () => {
    setNewsLoaded(false);

    try {
      const response = await axios.get("/news/" + getCompanyId());
      const { data } = response;

      if (data === "Database down!" || data === "No news found!") throw data;
      setRetrievedNews(data);
      setNewsLoaded(true);
    } catch (error) {
      if (error === "No news found!") {
        toast(error, {
          type: "error",
        });
      } else {
        toast("Internal Server Error!", {
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    getNews();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <ToastContainer />
      <Navbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleLogoutButton={handleLogoutButton}
      />
      <Sidenav open={open} handleDrawerClose={handleDrawerClose} />
      {!newsLoaded ? (
        <div style={{ margin: "400px 800px" }}>
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <NewsContent
          handleCloseAddForm={handleCloseAddForm}
          handleUpdateForm={handleUpdateForm}
          handleButtonDelete={handleButtonDelete}
          closeAddForm={closeAddForm}
          news={retrievedNews}
        />
      )}
      {closeAddForm && (
        <NewsForm
          handleCloseAddForm={handleCloseAddForm}
          handleInputChange={handleInputChange}
          handleButtonSubmit={handleButtonSubmit}
          handleButtonUpdate={handleButtonUpdate}
          addForm={addForm}
          error={error}
          news={news}
        />
      )}
    </div>
  );
};

export default Dashboard;
