import React from "react";

const Spinner = () => (
  <div className="spinner border-none">
    <div className="double-bounce1 border-none"></div>
    <div className="double-bounce2 border-none"></div>

    <style jsx>{`
      .spinner {
        width: 40px;
        height: 40px;
        position: relative;
        margin: 100px auto;
      }

      .double-bounce1,
      .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        animation: sk-bounce 2s infinite ease-in-out;
      }

      .double-bounce2 {
        animation-delay: -1s;
      }

      @keyframes sk-bounce {
        0%,
        100% {
          transform: scale(0);
        }
        50% {
          transform: scale(1);
        }
      }
    `}</style>
  </div>
);

export default Spinner;