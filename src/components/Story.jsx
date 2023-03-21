import {useState, useContext} from 'react'

import moment from 'moment/moment';
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthContext';
import DeleteButton from './DeleteButton';

function Story({post}) {

    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const handleOnClose = () => setShowDeleteButton(false)

    const {user} = useContext(AuthContext)

    const {
        id,
        username,
        author,
        title,
        content,
        chapter,
        category,
        createdAt
    } = post

  return (
    <div className='py-2' >
      <div className='flex justify-center'>

        <div className="rounded-xl border p-5 shadow-md md:w-9/12 w-11/12 bg-white hover:bg-blue-50">
          
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <img src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png" className="h-10 w-10 rounded-full mr-2 object-cover" alt='img' />
              <h1 className='text-xs font-semibold uppercase text-blue-900'>Posted By: <span>{username}</span> </h1>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-xs text-neutral-500">• {moment(createdAt).fromNow(true)}</div>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <Link to={`/story/${post.id}`} className="mb-3 text-xl font-bold hover:text-blue-500 uppercase">{post.title}</Link>
            <h1 className='text-xs font-semibold uppercase text-blue-900'>By: <span>{author}</span> </h1>
            <div className="mb-3 text-md font-semibold text-blue-800 uppercase">{chapter}</div>
            <div className="text-sm text-neutral-600" dangerouslySetInnerHTML={{__html: content?.substr(0, 200) + (content?.length > 1 ? ' ...' : '')}}></div>
          </div>

          {/* Delete button  */}
          <div className='flex justify-between items-center'>
          <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold">{category}</button>
            {user && user.username === username && 
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDeleteButton(true)
                }}
                className='flex items-center space-x-2 text-red-600'
                >
                  <ion-icon name="trash-outline"></ion-icon>
              </button>
            }
          </div>

        </div>

      </div>
      {/* delete button  */}
      <DeleteButton onClose={handleOnClose} visible={showDeleteButton} postId={id}/>
    </div>
  )
}

export default Story