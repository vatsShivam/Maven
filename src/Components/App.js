import React, { Component, Suspense } from "react";
import "./App.css";
import axios from "axios";
const DataRender = React.lazy(() => import("./Elements/dataRender"));
const AntComponent = React.lazy(() => import("./Elements/antdesign"));

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pageSize: 9,
      sortBy: "popularity",
    };
  }

  componentWillMount() {
    this.callApi(this.state.pageSize, this.state.sortBy);
  }
  callApi(page, sort) {
    console.log(page, sort);
    axios
      .get(
        `https://newsapi.org/v2/everything?q=Apple&from=2021-02-25&pageSize=${page}&sortBy=${sort}&apiKey=184c042b84af400fbd615d1aa0bc3872`
      )
      .then(
        (response) => {
          console.log(response);
          this.setState({ data: response.data.articles });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  handleToggle = (e) => {
    document.documentElement.classList.toggle("dark-mode");
  };
  selectFilter = (e) => {
    this.setState({ pageSize: e.target.value });
    this.callApi(e.target.value, this.state.sortBy);
  };
  handleSort = (e) => {
    this.setState({ sortBy: e.target.value });
    this.callApi(this.state.pageSize, e.target.value);
  };
  render() {
    return (
      <body>
        <div class="news-box">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <select
                className="form-control col-sm-3"
                onChange={this.selectFilter}
              >
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="27">27</option>
                <option value="36">36</option>
                <option value="45">45</option>
                <option value="default" selected disabled>
                  Select Page Size
                </option>
              </select>
              <select
                style={{ marginLeft: "20px" }}
                className="form-control col-sm-3"
                onChange={this.handleSort}
              >
                <option value="relevancy">relevancy</option>
                <option value="popularity">popularity</option>
                <option value="publishedAt">publishedAt</option>
                <option value="default" selected disabled>
                  Sort By
                </option>
              </select>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <AntComponent toggle={this.handleToggle} />
            </Suspense>
          </div>
          <div class="container-fluid">
            <div class="news_heading">
              <h2 class="text-center">News Article Page </h2>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <div class="row people">
                <DataRender news={this.state.data} />
              </div>
            </Suspense>
          </div>
        </div>
      </body>
    );
  }
}

export default App;
