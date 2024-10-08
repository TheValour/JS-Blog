import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { APIContext } from '../../context/api';

export default function SideSection() {
  const {getAdminTagList} = useContext(APIContext);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState("");

  function onKeyPress(e) {
    if(e.key === 'Enter' && searchTag){
      navigate(`/article?cat=${searchTag}`)
      setSearchTag("");
    }
  }
  function onClickHandler() {
    if(searchTag) {
      navigate(`/article?cat=${searchTag}`)
      setSearchTag("");
    }
  }

  useEffect(() => {
    async function fetchlistData(){
      // backend call
      const response = await getAdminTagList();
      // console.log(response.data.listResponse)
      setTags(response.data.listResponse);
    }
    fetchlistData();
  }, []);

  const tagList = tags.map((ele) => (
    <span key={ele._id}>
      <Link  to={`/article?cat=${ele.title}`} 
        className='bg-yellow-200 mx-2 p-2 rounded-lg'
        >
        {ele.title}
      </Link>
    </span>
  ));

  return (
    <div className='w-1/5 mt-3'>
      <div className='bg-blue-100 p-4 h-full w-full sticky top-0'>
        <div className='mb-5'>
          <input type="text" name="" id="" className='h-7' value={searchTag} 
            onChange={(e) => setSearchTag(e.target.value)} onKeyDown={onKeyPress} 
            />
          <span className=' text-white p-1 bg-gray-400  cursor-pointer' onClick={onClickHandler}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>  
          </span>       
        </div>
        <div id='tagList' className='overflow-hidden h-auto w-full'>
          {tagList}
        </div>
      </div>
    </div>
  )
}
