import React, { useState, useEffect } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const [MovieDetail, setMovieDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, []);
  
  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b14e0aeb4a2eb281fe2afcabe7c81940&language=en-US`
    ).then((res) => res.json())
      .then((data) => setMovieDetail(data));
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            MovieDetail ? MovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                MovieDetail ? MovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {MovieDetail ? MovieDetail.original_title : ""}
            </div>
            <div className="movie__tagline">
              {MovieDetail ? MovieDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {MovieDetail ? MovieDetail.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {MovieDetail ? "(" + MovieDetail.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {MovieDetail ? MovieDetail.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {MovieDetail ? "Release date: " + MovieDetail.release_date : ""}
            </div>
            <div className="movie__genres">
              {MovieDetail && MovieDetail.genres
                ? MovieDetail.genres.map((genre) => (
                    <>
                      {" "}
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{MovieDetail ? MovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {MovieDetail && MovieDetail.homepage && (
          <a
            href={MovieDetail.homepage}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {MovieDetail && MovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + MovieDetail.imdb_id}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {MovieDetail &&
          MovieDetail.production_companies &&
          MovieDetail.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie__productionComapany"
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default MovieDetail;
