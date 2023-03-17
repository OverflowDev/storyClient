import {useContext, useState} from 'react'

// import AuthContext from '../context/AuthContext';

import PostStory from '../components/PostStory'
import LatestStory from '../components/LatestStory';
import Landing from '../layouts/Landing';

function Home() {

  // const {user} = useContext(AuthContext)

  const [showNewPostButton, setShowNewPostButton] = useState(false)
  const handleOnClose = () => setShowNewPostButton(false)

  return (
    <div className=''>
      {/* <div className='flex justify-end md:px-24 px-6 mt-4'>
        {user && <button 
          onClick={() => setShowNewPostButton(true)}
          className='flex items-center px-4 py-2 bg-blue-200 hover:bg-blue-100 uppercase rounded-md space-x-2 shadow-inner text-black'
          >
            <ion-icon name="add-circle-outline"></ion-icon>
            <span className='font-semibold'>ADD NEW</span>
          </button>
        }
      </div> */}
      <Landing />
    <div className='md:px-24 px-6 mt-4'>
    
      <div className='w-full'>
        <LatestStory />
      </div>
      
      <PostStory onClose={handleOnClose} visible={showNewPostButton}/>

    </div>
    </div>
  )
}

export default Home