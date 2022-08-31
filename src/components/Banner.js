import axios from '../api/axios';
import React, { useEffect, useState} from 'react';
import requests from"../api/requests";
import './Banner.css';
import styled from 'styled-components';

export default function Banner() {
    const [movie, setmovie] = useState([]);
    const [isclicked,setisclicked]=useState(false);
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData=async ()=>{
        //현재상영작 여러개 가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        const movieId =request.data.results[
          //영화중 하나의 아이디 랜덤으로 가져오기
          Math.floor(Math.random()*request.data.results.length)
        ].id;
        //영화의 상세정보 가져오기
        const {data: movieDetail} = await axios.get(`movie/${movieId}`,{
          params:{append_to_response : "videos"},
        });
        setmovie(movieDetail);
      };
      const truncate=(str,n)=>{
        return str?.length > n ? str.substr(0,n-1) + "...":str;
      }
      if(!isclicked){
        return(
          <header className='banner' style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                  backgroundPosition:"top center",
                  backgroundSize:"cover",}}>
              <div className='banner__contents'>
                <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
                <div className='banner__buttons'>
                  <button className="banner__button play" 
                  onClick={()=>setisclicked(true)}>play</button>
                  <button className="banner__button info">More information</button>
                </div>
                <h1 className='banner__description'>{truncate(movie?.overview,100)}</h1>
              </div>
              <div className='banner--fadeBottom'/>
  
          </header>
        );
      }else{
        return(
          <Container>
            <HomeContainer><Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen>
              </Iframe></HomeContainer>
          </Container>
        )
      }
    }
    const Iframe= styled.iframe`
    width:100%;
    height:100%;
    z-index:-1;
    opacity:0.65;
    border:none;
    &::after{
      content:"";
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
    `
    const Container= styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100%;
    height:100vh;
    `
    const HomeContainer=styled.div`
    width:100%;
    height:100%;
    `
    