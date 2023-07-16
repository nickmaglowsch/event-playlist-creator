import React from "react";

type props = {
  children?: React.ReactNode;
  title: string;
  buttonClick: () => void;
  buttonText: string;
};

const Card: React.FC<props> = ({
  title,
  children,
  buttonClick,
  buttonText,
}) => {
  return (
    <div className="card h-80 w-80 bg-accent-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={buttonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
