import React, { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom'
import { APIContext } from '../../context/api';

const TagsBar = ()=> {
  const {getTagList} = useContext(APIContext);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function fetchlistData(){
      // backend call
      const response = await getTagList();
      setTags(response.data.listResponse);
    }
    fetchlistData();
  }, []);

  const tagList = tags.slice(0, 5).map((ele) => (
    <Link key={ele._id} to={`/article?cat=${ele.title}`} >{ele.title}</Link>
  ));
    
  return (
    <div className='sticky top-0 z-10 bg-green-200'>
      <nav className='mt-3 p-2 border-b-2 border-gray-200 ' id='category-link'>
        <Link to="/article?cat=all">All</Link>
        {tagList}
        <Link to='/write'>Write</Link>
      </nav>
    </div>
  )
}
export default TagsBar;
