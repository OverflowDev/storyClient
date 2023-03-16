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
        title,
        content,
        category,
        createdAt
    } = post

  return (
    <div className='py-2' >
      <div className='flex justify-center'>

        <div className="rounded-xl border p-5 shadow-md md:w-9/12 w-11/12 bg-white hover:bg-gray-50">
          
          <div className="flex w-full items-center justify-between border-b pb-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
              <div className="text-lg font-bold text-slate-700 capitalize">{username}</div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-xs text-neutral-500">• {moment(createdAt).fromNow(true)}</div>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <Link to={`/story/${id}`} className="mb-3 text-xl font-bold">{title}</Link>
            {/* <div className="text-sm text-neutral-600" dangerouslySetInnerHTML={{__html: content?.substr(0,25) + (content?.length > 1 ? `<Link>Read More</Link>` : '')}}></div> */}
            <div className="text-sm text-neutral-600" dangerouslySetInnerHTML={{__html: content?.substr(0, 25) + (content?.length > 1 ? ' ...' : '')}}></div>
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