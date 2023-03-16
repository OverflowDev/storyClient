import { useState } from 'react';
import { useQuery } from '@apollo/client';

import {FETCH_POSTS_QUERY} from '../graphql/posts'

import Story from './Story';
import Pagination from './Pagination';

function Stories() {

    const {data, loading, error} = useQuery(FETCH_POSTS_QUERY)

    const [getData, setGetData] = useState([])
    const [active, setActive] = useState('All')

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
    <div className='mt-2 w-full' >
        {loading ? (
            <div>
                Loading...
            </div>
        ) :(
            <div>
                <h1 className='text-2xl p-4 uppercase font-semibold text-center'>Stories</h1>
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
    </div>
  )
}

export default Stories