import { useState,useEffect } from 'react'
import ReactStars from "react-rating-stars-component";

import './App.css'

function App() {
  const [rating,setRating] = useState(5);
  const [comment,setComment]= useState("");
  const [feedback,setFeedBack] = useState([]);

  const handleSubmit = ()=>{
    let newFeedback = {
      rating: rating,
      comment: comment,
    }
  
    
    setFeedBack([...feedback,newFeedback])
    setRating(5);
    setComment("");
  
   
  }

  useEffect(()=>{
    const storedFeedbackData = localStorage.getItem('feedback');
    if (storedFeedbackData) {
      setFeedBack(JSON.parse(storedFeedbackData));
    }
  },[])

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);





  const handleStarChange = (newRating)=>{
      setRating(newRating)
  }

  const handleChange =(event)=>{
    setComment(event.target.value)
}




  return (
    <>
    <h2 className='header' >Give Feedback:</h2>
    <ReactStars
     count={5}
     size={35}
     value={rating}
     activeColor="#ffd700"
     onChange={handleStarChange}
    />
    <p className='rating'>{rating} (stars) </p>
    <div className="textarea">
      <textarea placeholder="Comments" value={comment} onChange={handleChange} cols="30" rows="10"/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    
    {feedback.map((feedback, index) => (
          <div key={index} className="feedback-item">
              <ReactStars
                count={5}
                value={feedback.rating}
                edit={false}
                size={20}
                activeColor="#ffd700"
              />
            <p>{feedback.comment}</p>
          </div>
        ))}
    </>
  )
}

export default App
