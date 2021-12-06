import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { useFetch } from "./Components/useFetch.js";
import { useState, useEffect } from "react";

function App() {
  const colors = [
    "linear-gradient(315deg, #eec0c6 0%, #e58c8a 74%)",
    "linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)",
    "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
    "linear-gradient(315deg, #772f1a 0%, #f2a65a 74%)",
    "linear-gradient(315deg, #63d471 0%, #233329 74%)",
    "linear-gradient(315deg, #fdb813 0%, #788cb6 74%)",
  ];

  const [color, setColor] = useState(colors[0]);
  const [counter, setCounter] = useState(getRandomNumber(0, 1644));

  useEffect(() => {
    document.body.style.backgroundImage = color;
  }, [color]);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const res = useFetch(`https://type.fit/api/quotes`, {});

  if (!res.response) {
    return <div>Loading...</div>;
  }

  const text = res.response[counter].text;
  const author = res.response[counter].author;

  const handleClick = () => {
    const number = getRandomNumber(0, 1600);
    setCounter(number);
    setColor(colors[getRandomNumber(0, 6)]);
  };

  return (
    <div
      className="h-100 d-flex justify-content-center align-items-lg-center"
      id="quote-box"
    >
      <div className="row justify-content-center py-3">
        <div className="col-lg-8 text-center">
          <div className="card" id="card">
            <div className="card-body p-5">
              <div className="text-center mb-4 pb-2">
                <img
                  src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-quotes/bulb.png"
                  alt="Bulb"
                  width="100"
                />
              </div>

              <figure className="text-center mb-0">
                <blockquote className="blockquote">
                  <p className="pb-3">
                    <i className="fa fa-quote-left fa-xs text-primary"></i>
                    <span className="lead font-italic" id="text">
                      {text}
                    </span>
                    <i className="fa fa-quote-right fa-xs text-primary"></i>
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer pb-3" id="author">
                  {author}
                </figcaption>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  id="new-quote"
                >
                  New Quote
                </button>
                <a
                  className="btn"
                  type="button"
                  id="tweet-quote"
                  title="Tweet this quote!"
                  target="_top"
                  href={"https://twitter.com/intent/tweet?text=" + text}
                >
                  <i className="fa fa-twitter fa-xs text-primary"></i>
                </a>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
