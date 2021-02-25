import React, { Component } from "react";

class DataRender extends Component {
  render() {
    const newsArticles = this.props.news;

    return newsArticles.map((player) => {
      const { author, content, title, publishedAt ,url} = player;

      return (
        <div class="col-md-6 col-lg-4 sm-12 item">
          <div class="box" style={{ minHeight: "320px" }}>
            <h3 class="name">{author}</h3>
            <p class="title">{title}</p>
            <p class="description">{publishedAt}</p>
            <p class="description">{content}</p>
            <a href={url} target="_blank">View News Details</a>
          </div>
        </div>
      );
    });
  }
}
export default DataRender;
