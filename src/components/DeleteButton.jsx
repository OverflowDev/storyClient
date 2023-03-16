import React from 'react'
import { useApolloClient, useMutation } from '@apollo/client'

import { toast } from 'react-hot-toast'

import { useLocation, useNavigate } from 'react-router-dom'

import {DELETE_POST_MUTATION,FETCH_POSTS_QUERY } from '../graphql/posts'

function DeleteButton({postId, callback, onClose, visible}) {

  const location = useLocation()
  const navigate = useNavigate()
  const client = useApolloClient()

    const [deletePost, {loading}] = useMutation(DELETE_POST_MUTATION, {
      refetchQueries: [{ query: FETCH_POSTS_QUERY }],
      onCompleted: (data) => {
        onClose()
        const deletedPostId = data.deletePost;
        const updatedData = (cache) => {
          const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
          return { posts: data.getPosts.filter((post) => post.id !== deletedPostId) };
        };
        client.writeQuery({ query: FETCH_POSTS_QUERY, data: updatedData })

        // redirect 
        if(location.pathname === `/story/${deletedPostId}`){
          navigate('/')
        }
        toast.success("Post deleted successfully!")

      },

      onError: (error) => {
        console.log(error);
      },

    })

    const handleDelete = async() => {
      try {
      await deletePost({
        variables: { postId }
      });
    } catch (err) {
      console.error(err);
    }
    };

  
    const handleOnClose = (e) => {
        if(e.target.id === 'container') onClose()
    }

    if(!visible) return null

  return (
    <div>
          <div 
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        onClick={handleOnClose}
        id='container'
    >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                    <button
                        onClick={onClose}
                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                    >
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete POST</h3>
                        <div className="mt-2">
                            <p className="text-sm leading-5 text-gray-500">
                            Are you sure you want to delete this POST? This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button onClick={handleDelete} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                          {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </span>
                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button onClick={onClose} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancel
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default DeleteButton