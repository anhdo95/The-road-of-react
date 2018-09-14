import React from "react";
import Button from "./Button";
import classNames from "classnames";

const Sort = ({ sortKey, activeSortKey, sortStatuses, onSort, children }) => {
  const sortClass = classNames("button-inline", {
    "button-active": activeSortKey === sortKey
  });

  const sortIconClass = classNames("fa", {
    "fa-sort-up": !sortStatuses[sortKey],
    "fa-sort-down": sortStatuses[sortKey]
  });

  return (
    <Button className={sortClass} onClick={() => onSort(sortKey)}>
      {children}&nbsp;
      <i className={(sortKey in sortStatuses) && sortIconClass} />
    </Button>
  );
};

export default Sort;
