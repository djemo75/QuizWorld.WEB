import React, { useEffect, useState } from "react";

import { infoNotification } from "../../../utils/notifications";

export const TestTimer = ({ duration, setConfirmDialog, score }) => {
  const [time, setTime] = useState(duration === 0 ? null : duration * 60);

  useEffect(() => {
    if (!score && time !== null) {
      if (time !== 0) {
        setTimeout(() => setTime(time - 1), 1000);
        if (
          time === 60 * 15 ||
          time === 60 * 10 ||
          time === 60 * 5 ||
          time === 60 * 3 ||
          time === 60
        ) {
          infoNotification(`You have ${time / 60} minutes left`);
        }
      } else {
        setConfirmDialog({ visible: true, hasTime: false });
      }
    }
  }, [time, score]); // eslint-disable-line

  const hours = Math.floor(time / (60 * 60));
  const divisor_for_minutes = time % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);
  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  return (
    <>
      <div className="timer">
        {time !== null && (
          <>
            <div>
              {String(hours).length === 1 ? "0" + hours : hours}
              <span>HRS</span>
            </div>
            <div>
              {String(minutes).length === 1 ? "0" + minutes : minutes}
              <span>MIN</span>
            </div>
            <div>
              {String(seconds).length === 1 ? "0" + seconds : seconds}
              <span>SEC</span>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .timer {
          display: flex;
          font-size: 26px;
        }
        .timer > div {
          margin-right: 10px;
        }
        .timer > div:last-child {
          margin: 0px;
        }
        .timer span {
          font-size: 12px;
          margin-left: 2px;
        }
      `}</style>
    </>
  );
};
