import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import moment from 'moment/moment';

import {FETCH_POST_QUERY} from '../graphql/posts'


function SingleStory() {

    const param = useParams()
    const postId = param.postId

    const {data, loading, error} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const post = data && data.getPost

    const paragraphs = post?.content.split("\n\n")

    if(error) console.log(error)


  return (
    <div className='flex justify-center md:px-24 px-6 mt-4'>

        {loading ? (
            <div>Loading...</div>
        ) : (
            <div className="md:mt-10">
                <div className='md:ml-24'>
                    <Link to='/' className='py-2 px-3 m-4 w-fit space-x-3 flex justify-start items-center bg-blue-300 hover:bg-blue-400 shadow-inner border-none rounded-md'>
                        <ion-icon name="arrow-undo-outline"></ion-icon>
                        <span>Back</span>
                    </Link>
                </div>
                <div className="rounded-2xl mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative h-96">
                    <div className="absolute left-0 bottom-0 w-full h-full z-10 bg-gradient-to-b from-blue-800/10 to-blue-800/5 bg-clip-padding backdrop-filter backdrop-blur-sm backdrop-brightness-50 bg-opacity-60"></div>
                    <img 
                        src={post.imageUrl} 
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://media.istockphoto.com/id/515807051/photo/short-story-in-wood-type.jpg?s=612x612&w=0&k=20&c=h36rZbsPgLPGNZlPa139WhglQXDRfFRxKRNSDyk7jR4=';
                        }} 
                        className="absolute left-0 top-0 w-full h-full z-0 object-cover " 
                        alt='postImage' 
                    />
                    <div className="p-4 absolute bottom-0 left-0 z-20">
                        <div className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2 rounded-md">
                            {post.category}
                        </div>
                        <h2 className="text-4xl font-semibold text-gray-100 leading-tight capitalize">
                            {post.title}
                        </h2>
                        <div className="flex mt-3">
                            <img src="https://i.pravatar.cc/32" className="h-10 w-10 rounded-full mr-2 object-cover" alt='img' />
                            <div>
                                <p className="font-semibold text-gray-200 text-sm uppercase"> {post.username} </p>
                                <p className="font-semibold text-gray-400 text-xs"> • {moment(post.createdAt).fromNow(true)} </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 text-center lg:px-24 mt-12 text-gray-700 flex justify-center w-screen mx-auto text-lg leading-relaxed">
                    <p className="pb-6">
                        {paragraphs.map((paragraph, index) => (
                            <div key={index} className="mb-4">
                                <p>{paragraph}</p>
                            </div>
                        ))}
                    </p>

                </div>
            </div>
        )}

    </div>
  )
}

export default SingleStory


