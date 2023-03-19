import { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';

import AuthContext from '../context/AuthContext';

import {FETCH_POSTS_QUERY} from '../graphql/posts'

import Story from './Story';
import Pagination from './Pagination';

import PostStory from '../components/PostStory'

function Stories() {

    const {user} = useContext(AuthContext)

    const {data, loading, error} = useQuery(FETCH_POSTS_QUERY)

    const [getData, setGetData] = useState([])
    const [active, setActive] = useState('All')

    const [showNewPostButton, setShowNewPostButton] = useState(false)
    const handleOnClose = () => setShowNewPostButton(false)

    // Filter 
    const filterData = [ ...new Set(data?.getPosts.map((Val) => Val.category )), 'All']

    const fetchFilterData = (curCat) =>() => {
        if(curCat === 'All') {
            setGetData(data?.getPosts)
        } else {
            const result = data?.getPosts.filter((cat) => {
                return cat.category === curCat
            })

            if(result) {
                setGetData(result)
            }

            setActive(curCat)
        }
    }

    // Pagination 
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    
    // check if getData value is more than 0 to know what to render 
    const currentData = getData.length > 0 ? getData.slice(firstIndex, lastIndex) : data?.getPosts.slice(firstIndex, lastIndex)
    // Pagination 

    if(!data) return null
    if (error) console.log(error)

  return (
    <div className='mt-2 w-full md:px-24 px-6 ' >
        {/* new post  */}
        <div className='flex justify-end'>
          {user && <button 
            onClick={() => setShowNewPostButton(true)}
            className='flex items-center px-4 py-2 bg-blue-200 hover:bg-blue-100 rounded-md space-x-2 shadow-inner text-black'
            >
              <ion-icon name="add-circle-outline"></ion-icon>
              <span className='font-semibold'>New Story</span>
            </button>
          }
        </div>
        {loading ? (
            <div className='flex justify-center'>
                <div className="w-12 h-12 rounded-full border-4 border-t-blue-800 animate-spin"></div>
            </div>
        ) :(
            <div>
                <h1 className='text-2xl p-4 uppercase font-semibold text-center'>Stories</h1>
                <div className='flex items-center'>
                    <h1 className='uppercase'>Filter Stories</h1>
                    {currentData.length > 0 ? (
                        <div className='flex items-center mb-4 break-normal m-4 overflow-y-hidden scrollbar-hide space-x-2'>
                            {filterData.map((val, i) => (
                                <button
                                    key={i}
                                    onClick={fetchFilterData(val)}
                                    className={`py-2 px-4 rounded-md whitespace-nowrap uppercase w-fit ${active === val ? 'bg-gray-400 text-gray-900' : 'bg-gray-200' }`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>

                <div>
                    {currentData.length > 0 ? (
                        <div>
                            {currentData.map((post) => (
                                <Story key={post.id} post={post}  />
                            ))}
                        </div>
                    ): (
                        <div className='text-center tracking-wider font-semibold'>
                            No story at the moment, check back later
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Pagination  */}
        <div className='static'>
            <Pagination 
                totalItems={data?.getPosts.length} 
                itemsPerPage={itemsPerPage} 
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                loading={loading}
                lastIndex={lastIndex}
            />

        </div>

      <PostStory onClose={handleOnClose} visible={showNewPostButton}/>

    </div>
  )
}

export default Stories