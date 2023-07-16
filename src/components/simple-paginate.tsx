import {
  BiSolidSkipNextCircle,
  BiSolidSkipPreviousCircle,
} from "react-icons/bi";
import React from "react";

type props = {
  children: React.ReactNode;
  backButtonClick: () => void;
  forwardButtonClick: () => void;
  isLastPage: () => boolean;
  isFirstPage: () => boolean;
};

const SimplePaginate: React.FC<props> = ({
  backButtonClick,
  forwardButtonClick,
  children,
  isLastPage,
  isFirstPage,
}) => {
  return (
    <div className="flex h-auto justify-center">
      <div className="z-10 flex h-auto items-end sm:items-center">
        <button
          className="btn btn-circle bg-primary"
          onClick={backButtonClick}
          disabled={isFirstPage()}
        >
          <BiSolidSkipPreviousCircle size={44} />
        </button>
      </div>
      <div className="grid grow grid-cols-1 gap-4 px-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
      <div className="z-10 flex h-auto items-end sm:items-center">
        <button className="btn btn-circle bg-primary" disabled={isLastPage()}>
          <BiSolidSkipNextCircle size={44} onClick={forwardButtonClick} />
        </button>
      </div>
    </div>
  );
};

export default SimplePaginate;
