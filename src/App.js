import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      let url;
      const urlPage = `&page=${page}`;
      url = `${mainUrl}${clientID}${urlPage}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhotos((oldPhotos) => {
          return [...oldPhotos, ...data];
        });
        setLoading(false);
        console.log(data);
        //console.log(clientID);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchImages();
  }, [page]);

  React.useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      //Window.scrollY is your scrollLevel
      //window.innerHeight is the innerHeight of the window
      //document.body.scrollHeight innerHeight + the amount to scroll
      if (
        !loading &&
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 20
      ) {
        setPage((oldVal) => {
          return oldVal + 1;
        });
        console.log("it worked");
      }
      // console.log(`scrollY ${window.scrollY}`);
      console.log(`innerHeight ${window.innerHeight}`);
      console.log(`body height ${document.body.scrollHeight}`);
    });

    return () => window.removeEventListener("scroll", event);
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <main id="main-photo">
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
