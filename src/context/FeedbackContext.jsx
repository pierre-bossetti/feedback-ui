import { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    const res = await fetch('/feedback?_sort=id&_order=desc')
    const data = await res.json()

    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedback = async (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    newFeedback.id = uuidv4()

    const data = await res.json()
    setFeedback([data, ...feedback])
  }

  const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete this feedback?')){
      await fetch(`/feedback/${id}`, {method: 'DELETE'})
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const updateFeedback = async (id, updItem) => {
    const res = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(updItem),
        })
    
    const data = await res.json()
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item)))
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Set feedback to edit
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
      feedback,
      feedbackEdit,
      isLoading,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback,
    }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext