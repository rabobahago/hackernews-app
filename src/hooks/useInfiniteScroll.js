import {useState, useEffect } from 'react';
import {STORIES_INCREMENT, MAX_STORIES} from '../constants/index';
import {debounce} from '../utils/debounce'

export const useInfiniteScroll = ()=>{
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(STORIES_INCREMENT);
  const handleScroll = debounce(() =>{
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offSetHeight || loading){
      return false;
    }
    setLoading(true)
  }, 100)
  useEffect(()=>{
    if(!loading) return;
    if(count + STORIES_INCREMENT >= MAX_STORIES){
      setCount(MAX_STORIES)
    }else{
      setCount(count + STORIES_INCREMENT)
    }
    setLoading(false);
  }, [loading])
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return ()=> window.removeEventListener('scroll', handleScroll)
  }, [])
  return {count}
}
