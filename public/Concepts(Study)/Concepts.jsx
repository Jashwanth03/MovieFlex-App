import { useState , useEffect } from "react";
import "./App.css";

function Card({ title }) {
  const [count , setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false); // useState ===> useLiked(boolean) , setHasLiked(Function to set boolean)

  useEffect(()=>{
    console.log(`${title} has been liked: ${hasLiked}`);
  },[hasLiked]); //adding dependency [hasLiked] make sure that useEffect runs only when the value of the dependency changes , if there is no dependency it wil run for every single render

  return (
    <div className="card" onClick={()=>setCount(count +1)}>
      <h2>{title} <br/> {count || null}</h2>

      <button className="like-btn"
        onClick={() => 
          setHasLiked (!hasLiked)// !hasLiked is used here to toggle the like button
          // writing a callback function is Recommended instead of passing  ref variable
        }
      >
        {hasLiked?"❤️":"🤍" }
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="card-container">
      <Card title="F1" />
      <Card title="Coolie" />
      <Card title="Kaithi" />
    </div>
  );
}

export default App;
