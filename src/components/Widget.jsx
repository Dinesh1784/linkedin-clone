import React from "react";
import "./Widget.css";
import { FiberManualRecord, Info } from "@mui/icons-material";

export const Widget = () => {
  const newsArticles = (heading, subtitle) => {
    return (
      <div className="widgets__articles">
        <div className="widgets__articlesLeft">
          <FiberManualRecord />
        </div>
        <div className="widgets__articlesRight">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <Info />
      </div>
      {newsArticles("React is awesome", "TOP-news")}
      {newsArticles("React is awesome", "TOP-news")}
      {newsArticles("React is awesome", "TOP-news")}
      {newsArticles("React is awesome", "TOP-news")}
      {newsArticles("React is awesome", "TOP-news")}
      {newsArticles("React is awesome", "TOP-news")}
    </div>
  );
};
