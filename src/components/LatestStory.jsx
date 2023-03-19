import React from 'react'

import { Link } from 'react-router-dom';
import moment from 'moment/moment';

import { useQuery } from '@apollo/client';

import {FETCH_POSTS_QUERY} from '../graphql/posts'

function LatestStory() {

    const {data, loading, error} = useQuery(FETCH_POSTS_QUERY)

    const newData = data?.getPosts.slice(0,2)


    if(error) return null

  return (
    <div className='mt-2 w-full md:px-24 ' >
    {loading ? (
        <div className='flex justify-center'>
            <div className="w-12 h-12 rounded-full border-4 border-blue-800 animate-spin"></div>
        </div>
    ) :(
        <div>
            {/* <h1 className='text-2xl p-4 uppercase font-semibold text-center'>Top Stories</h1> */}
            <div>
                {newData.length > 0 ? (
                    <div>
                        {newData.map((post) => (
                            <div key={post.id}>
                                <div className='py-2' >
                                    <div className='flex justify-center'>

                                        <div className="rounded-xl border border-blue-500 p-5 shadow-md md:w-9/12 w-11/12 bg-white hover:bg-gray-50">
                                        
                                            <div className="flex w-full items-center justify-between border-b pb-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
                                                    <div className="text-lg font-bold text-slate-700 capitalize">{post.name}</div>
                                                </div>
                                                <div className="flex items-center space-x-8">
                                                    <div className="text-xs text-neutral-500">• {moment(post.createdAt).fromNow(true)}</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 mb-6">
                                                <Link to={`/story/${post.id}`} className="mb-3 text-xl font-bold hover:text-blue-500 uppercase">{post.title}</Link>
                                                <div className="mb-3 text-md font-semibold capitalize">{post.chapter}</div>
                                                <div className="text-sm text-neutral-600" dangerouslySetInnerHTML={{__html: post.content?.substr(0, 200) + (post.content?.length > 1 ? ' ...' : '')}}></div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ): (
                    <div className='text-center tracking-wider font-normal'>
                        No story at the moment, check back later
                    </div>
                )}
            </div>
        </div>
    )}


</div>
  )
}

export default LatestStory