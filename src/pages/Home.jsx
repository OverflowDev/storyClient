import {useContext, useState} from 'react'

import AuthContext from '../context/AuthContext';

import PostStory from '../components/PostStory'
import Stories from '../components/Stories'

function Home() {

  const {user} = useContext(AuthContext)

  const [showNewPostButton, setShowNewPostButton] = useState(false)
  const handleOnClose = () => setShowNewPostButton(false)

  return (
    <div className='md:px-24 px-6 mt-4'>

      <div className='w-full'>
        <div className='flex justify-end'>
          {user && <button 
            onClick={() => setShowNewPostButton(true)}
            className='flex items-center px-4 py-2 bg-gray-200 rounded-md space-x-2 shadow-inner text-black'
            >
              <ion-icon name="add-circle-outline"></ion-icon>
              <span className='font-semibold'>New Story</span>
            </button>}
        </div>
        <Stories />
      </div>
      
      <PostStory onClose={handleOnClose} visible={showNewPostButton}/>

    </div>
  )
}

export default Home