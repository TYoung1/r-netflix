import React,{useEffect} from 'react'
const useOnClickOutside= (ref,handler)=>{
    useEffect(() => {
        const listner = (event)=>{
            if(!ref.current || ref.current.contains(event.targtet)){
                return;
            }
            handler();
        };
        document.addEventListener("mousedown",listner)
        document.addEventListener("touchstart",listner)
      return () => {
        document.addEventListener("mousedown",listner)
        document.addEventListener("touchstart",listner)
      };
    }, [ref,handler])
    
  
}
export default useOnClickOutside;