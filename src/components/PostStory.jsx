import {useState} from 'react'

import { toast } from 'react-hot-toast';

import { useQuery, useMutation, gql } from '@apollo/client'

import {CREATE_POST_MUTATION } from '../graphql/posts'
import {FETCH_CATEGORIES_QUERY} from '../graphql/categories'

function PostStory({visible, onClose}) {

  const [err, setErr] = useState(null)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (e) => {
    setImagePreview(null)
  }

  const onChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}

// Fetch category 
const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(FETCH_CATEGORIES_QUERY)

const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
  refetchQueries: [{ query: FETCH_CATEGORIES_QUERY }],

  update(cache, { data: {createPost} }) {
    cache.modify({
      fields: {
        getPosts(existingPosts = []) {
          const newPostRef = cache.writeFragment({
            data: createPost,
            fragment: gql`
              fragment NewPost on Post{
                id
                title
                content
                category
              }
            `
          })
          return [newPostRef, ...existingPosts]
        }
      }
    })
  }, 
  onCompleted(){
    onClose()
    toast.success("Quote saved successfully!")
  }
})


const onSubmit = async (e) => {
  e.preventDefault();
  try {
    await createPost({
      variables: { 
        title: formData.title, 
        content: formData.content, 
        category: formData.category 
      }
    });
    setFormData({
      title: '',
      content: '',
      category: ''
    });
    setErr(null)
    onClose()
  } catch (error) {
    setErr(error)
  }
}


const handleOnClose = (e) => {
  if(e.target.id === 'container') onClose()
}

if(!visible) return null
if (categoriesLoading) return <p>Loading categories...</p>;
if (categoriesError) return <p>Error loading categories.</p>;

  return (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      onClick={handleOnClose}
      id='container'
    >
      <div className="bg-white rounded-md md:mx-auto w-full mx-3 md:max-w-[550px]">
        {/* Close button  */}
        <button
          onClick={onClose}
          className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
        >
          <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form 
          onSubmit={onSubmit}
          className="py-6 px-9"
        >
          {/* title  */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Title
            </label>
            <input
              required
              name='title'
              onChange={onChange}
              value={formData.title}
              type="text"
              placeholder="Title"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          {/* Category  */}
          <div className="mb-5">
            <label htmlFor="categories" className="mb-3 block text-base font-medium text-[#07074D]">Select an option</label>
            <select 
              name='category'
              value={formData.category}
              onChange={onChange}
              id="countries" 
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option defaultValue>Select a Category</option>
              {categoriesData?.getCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content  */}
          <div className="mb-2">
            <label
              htmlFor="content"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Content
            </label>
            <textarea
              type='text'
              value={formData.content}
              name='content'
              onChange={onChange}
              rows="6"
              placeholder="Your Story"
              className="w-full rounded py-3 px-[14px] text-gray-800 text-base border border-gray-700 resize-none outline-none focus-visible:shadow-none focus:border-primary"
            ></textarea>
          </div>

          {/* Image  */}
          <div className="mb-6 ">
            <div className="w-full md:w-full relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg">
              {/* select image and remove image  */}
              <div className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 ">
                <label
                  className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                  htmlFor="restaurantImage"
                >
                  Select image
                  <input
                    id="restaurantImage"
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </label>
                <button
                  className="inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                  onClick={handleRemoveImage}
                >
                  Remove image
                </button>
              </div>
              {/* Preview Image  */}
              <div
                className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover bg-contain"
                style={{ backgroundImage: `url(${imagePreview})` }}
              >
                {!imagePreview && (
                  <span className="text-gray-400 opacity-75 flex items-center space-x-2">
                    <ion-icon name="image-outline" size='large'></ion-icon>
                    <span className="mt-2 text-sm font-medium">
                      No image selected
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Button  */}
          <div>
            <button
              type='submit'
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Post Story
            </button>
            <br />
          </div>

          {err && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded mt-2">
              {error?.graphQLErrors[0].message}
            </div>
          )}
        </form>

      </div>
  </div>
  )
}

export default PostStory