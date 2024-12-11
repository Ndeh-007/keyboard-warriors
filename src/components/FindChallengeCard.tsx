import React from "react";
import { Challenge } from "../core/interfaces/data";
import { ChallengeCardView } from "../core/interfaces/components";
import { getTimeAgoString } from "../core/utils/date_formatting";

const FindChallengeCard: React.FC<{
  challenge?: Challenge;
  view: ChallengeCardView;
  btnClickedCallback: Function;
  showActionBtn?: boolean;
}> = ({ challenge, view, btnClickedCallback, showActionBtn = true }) => {
  
  function handleBtnClicked(){
    btnClickedCallback(challenge)
  }
  
  return (
    <div className="challenge-card">
      {/* top section */}

      <div className="challenge-card-header">
        {/* left side */}
        <div className="finance-group">
          <div className="currency-chip">CAD</div>
          <div className="cost-value">${challenge?.cost}</div>
          <div className="earnings">
            <div className="earnings-chip">earnings</div>
            <div className="earnings-value">${challenge?.earnings}</div>
          </div>
        </div>

        {/* right */}
        {view === "delete" ? (
          <div className="action-group"></div>
        ) : (
          <div className="action-group">
            {view === "browse" ? (
              <button className="accept-button button" onClick={()=>handleBtnClicked()}>Accept</button>
            ) : (
              <button className="delete-button button" onClick={()=>handleBtnClicked()}>Delete</button>
            )}
          </div>
        )}
      </div>

      {/* mid section */}
      <div className="challenge-card-body">
        <div className="stack-items-holder">
          <div className="stack-items">
            <div className="top-item">WPM</div>
            <div className="bottom-item">{challenge?.wpm}</div>
          </div>
          <div className="stack-items">
            <div className="top-item">Accuracy</div>
            <div className="bottom-item">{challenge?.accuracy}</div>
          </div>
          <div className="stack-items">
            <div className="top-item">Time</div>
            <div className="bottom-item">{challenge?.duration}</div>
          </div>
          <div className="stack-items">
            <div className="top-item">Consistency</div>
            <div className="bottom-item">{challenge?.consistency}</div>
          </div>
        </div>
      </div>

      {/* footer sections */}
      <div className="challenge-card-footer">
        <div className="time-ago">
          <div className="time-ago-icon material-icons">
            <span className="material-icons">schedule</span>
          </div>
          <div className="time-ago-text">
            {getTimeAgoString(challenge?.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindChallengeCard;
