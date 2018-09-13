import React from "react";
import Button from "./Button";
import classNames from "classnames";

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames("button-inline", {
    "button-active": activeSortKey === sortKey
  });

  return (
    <Button className={sortClass} onClick={() => onSort(sortKey)}>
      {children}
    </Button>
  );
};

export default Sort;
