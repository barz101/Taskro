
import React from 'react';

function ErrorModal() {
    return (
        <div className="frame">
        <div className="modal">
      {/* <img src="http://100dayscss.com/codepen/alert.png" width="44" height="38" /> */}
              <span className="title">Oh snap!</span>
              <p>An error has occured while creating an error report.</p>
              <div className="button">Dismiss</div>
        </div>
      </div>
    )
}

export default ErrorModal;
