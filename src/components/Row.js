import React, { useEffect, useState} from 'react';
import axios from '../api/axios';
import MovieModal from './MovieModal';
import "./Row.css";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Row({title, id, fetchUrl, isLargeRow}) {
    const [movies, setmovies]=useState([]);
    const [modalOpen, setModalOpen]=useState(false);
    const [movieselected,setmovieselected]=useState({});
    useEffect(() => {
      fetchMovieData();
    }, []);

    const fetchMovieData=async()=>{
        const request = await axios.get(fetchUrl);
        setmovies(request.data.results);
    };
    const handleClick=(movie)=>{
        setModalOpen(true);
        setmovieselected(movie);
    }
    
  return (
    <section className='row'>
        <h2 >{title}</h2>
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} 
        breakpoints={{
          1378: {
            slidesPerView: 6, 
            slidesPerGroup: 6, 
        },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
         },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        }}
        navigation  
        pagination={{ clickable: true }} 
      >
            <div id={id} className="row__posters">
                {movies.map((movie)=>(
                    <SwiperSlide>
                    <img
                    key={movie.id}
                    style={{padding: '25px 0'}}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={()=>handleClick(movie)}/>
                    </SwiperSlide>
                ))}
            </div>
            </Swiper>
        
        {
            modalOpen&&(<MovieModal {...movieselected} setModalOpen={setModalOpen}/>
            )
        }
    </section>
  );
}
