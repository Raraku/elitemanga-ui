import React, { useState, useEffect } from "react";
import axios from "axios";

export function getMangas(WrappedComponent) {
  const [Mangas, setManga] = useState([]);
  useEffect(() => {
    axios
      .get("/manga/", {
        limit: 15
      })
      .then((res) => {
        setManga(res.data);
      });
  });
  return <WrappedComponent mangas={Mangas} {...props} />;
}

export function getManga(WrappedComponent, props) {
  const [Manga, setManga] = useState([]);
  useEffect(() => {
    axios
      .get(`/manga/${props.match.params.manga}`)
      .then((res) => setManga(res.data));
  });
  return <WrappedComponent manga={Manga} {...props} />;
}
