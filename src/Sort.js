import React from "react";
import Button from "./Button";
import classNames from "classnames";

const Sort = ({ sortKey, activeSortKey, sortStatuses, onSort, children }) => {
  const sortClass = classNames("button-inline", {
    "button-active": activeSortKey === sortKey
  });

  let sortIconClass;

  if (sortKey in sortStatuses) {
    sortIconClass = classNames("fa", {
      "fa-sort-up": !sortStatuses[sortKey],
      "fa-sort-down": sortStatuses[sortKey]
    });
  }

  return (
    <Button className={sortClass} onClick={() => onSort(sortKey)}>
      {children}
      &nbsp;
      <i className={sortIconClass} />
    </Button>
  );
};

export default Sort;
