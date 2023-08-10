import "./App.css";
import {
  AiOutlineCoffee,
  AiFillTwitterCircle,
  AiTwotoneHighlight,
} from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [num, setNum] = useState(0)

  const fetchData = async () => {
    setLoad(true);
    try {
      const response = await axios.get("https://type.fit/api/quotes");
      const result = await response.data;
      setData(result);
    } catch (err) {
      setError(true);
    }
    setLoad(false);
  };

  useEffect(() => {
    fetchData();
  }, [num]);

  const handleClick = () => {
    const num = Math.floor(Math.random()*data.length)
    console.log(num)
    setNum(num)
  };

  return (
    <div className="box">
      <div className="card">
        <span className="head">
          <AiOutlineCoffee />
        </span>
        {load ? (
          <h1>Loading...</h1>
        ) : (
          <div className="info">
            <span className="mid">
              <span className="midText">{data[num]?.text}</span>
            </span>
            <span className="secondMid">
              <span className="botLine"></span>
              <br />
              <span className="author">{data[num]?.author}</span>
            </span>
            <span className="foot">
              <button className="lBtn">
                {" "}
                <AiFillTwitterCircle className="logo" />{" "}
                <span className="Tweet">Tweet</span>
              </button>
              <button onClick={handleClick} className="rBtn">
                New Quote
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
