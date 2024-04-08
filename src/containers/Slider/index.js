import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [radioIndex, setRadioIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  let timeoutId;

  const nextCard = (ifIdx) => {
    timeoutId = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
      setRadioIndex((prevRadioIndex) => (prevRadioIndex === 2 ? 0 : prevRadioIndex + 1));
    }, 5000);
    if (ifIdx) {
      setRadioIndex(ifIdx);
    }
  };

  useEffect(() => {
    nextCard();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIndex === radioIdx}
                  id={`radio-${radioIdx}`}
                  onChange={() => {
                    clearTimeout(timeoutId);
                    setIndex(radioIdx);
                    nextCard(radioIdx);
                    setRadioIndex(radioIdx);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
