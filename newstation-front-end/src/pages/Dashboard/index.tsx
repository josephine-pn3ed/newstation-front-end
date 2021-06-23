import axios from "axios";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidenav from "../../components/Sidenav";
import DashboardContent from "../../components/DashboardContent";
import NewsForm from "../../components/NewsForm";
import useStyles from "../../styles/_Dashboard";
import { logout, getCompanyId } from "../../utils";
import { State } from "./types";

const Dashboard = () => {
  const classes = useStyles();

  const history = useHistory();

  const [company, setCompany] = useState<string>("");

  const [closeAddForm, setCloseAddForm] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);

  const [addForm, setAddForm] = useState<boolean>(true);

  const [news, setNews] = useState<State>({
    id: "",
    company_id: "",
    company_name: "",
    news_topic: "",
    news_body: "",
    news_image: null,
    news_status: "Active",
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
    setNews({
      id: "",
      company_id: "",
      company_name: "",
      news_topic: "",
      news_body: "",
      news_image: null,
      news_status: "Active",
      created_at: "",
      updated_at: "",
    });
    setCloseAddForm(open);
    setAddForm(!open);
  };

  const handleUpdateForm = async (newsId: string) => {
    setAddForm(false)
    try {
      const newsById = await axios.get("/news-company/" + newsId);
      const { result, success } = newsById.data;
      const {
        id,
        company_id,
        news_topic,
        news_body,
        news_image,
        news_status,
        created_at,
        updated_at,
      } = result;

      if (!success) throw Error;
      setCloseAddForm(true);
      setNews({
        id: id,
        company_id: company_id,
        company_name: "",
        news_topic: news_topic,
        news_body: news_body,
        news_image: news_image,
        news_status: news_status,
        created_at: created_at,
        updated_at: updated_at,
      });
      setAddForm(false);
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setNews({ ...news, [name]: value });
  };

  const handleButtonDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This news will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete("/news/" + id);

          Swal.fire("Deleted!", "News has been deleted.", "success");

          getNews();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Deleting news has been cancelled.", "error");
        }
      });
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleButtonUpdate = async (id: string) => {
    const { news_topic, news_body } = news;
    let errors: string[] = [];
    try {
      !news_topic && errors.push("news_topic");
      !news_body && errors.push("news_body");

      setError(errors);

      const result = await axios.put("/news/" + id, {
        news_topic: news_topic,
        news_body: news_body,
      });

      const { success } = result.data;

      if (!success) throw Error;
      Swal.fire("Updated!", "News updated successfully!", "success");
      handleCloseAddForm(false);
      getNews();
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleButtonSubmit = async () => {
    const { news_topic, news_body } = news;
    let errors: string[] = [];

    try {
      !news_topic && errors.push("news_topic");
      !news_body && errors.push("news_body");

      setError(errors);

      if (!errors.length) {
        const result = await axios.post("/news", {
          news_topic: news_topic,
          news_body: news_body,
          news_image: null,
          company_id: getCompanyId(),
        });

        const { success } = result.data;

        if (!success) throw Error;
        Swal.fire("Added!", "News added successfully!", "success");
        handleCloseAddForm(false);
        getNews();
      }
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const getNews = async () => {
    setNewsLoaded(false);
    try {
      const response = await axios.get("/news/" + getCompanyId());
      const { success, company, news } = response.data;

      if (!success) throw Error;
      setRetrievedNews(news);
      setCompany(company.company_name);
      setNewsLoaded(true);
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className={classes.root}>
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
        <DashboardContent
          handleCloseAddForm={handleCloseAddForm}
          handleUpdateForm={handleUpdateForm}
          handleButtonDelete={handleButtonDelete}
          addForm={addForm}
          news={retrievedNews}
          company={company}
          max_width={closeAddForm ? "lg" : "xl"}
        />
      )}
      {closeAddForm && (
        <NewsForm
          handleCloseAddForm={handleCloseAddForm}
          handleInputChange={handleInputChange}
          handleButtonSubmit={handleButtonSubmit}
          handleButtonUpdate={handleButtonUpdate}
          addForm={addForm}
          news={news}
        />
      )}
    </div>
  );
};

export default Dashboard;
