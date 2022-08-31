import React,{useEffect} from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom'

export default function DetailPage() {
  const {movieId} = useParams();
  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(`/movie/${movieId}`);
      console.log('request',request)
    }
    fetchData();
},[]);
  
  return (
    <div> DetailPage</div>
  )
}
