import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { CommentIcon } from "./Icons";

const ResultTitle = React.memo(({ children: title, domain, url }) => {
  return (
    <div className="flex flex-row flex-wrap items-center">
      <a className="mr-2.5 font-bold" href={domain ? url : url.replace("item?id=", "/item/")} target="_blank" rel="nofollow noopener noreferrer">
        {title}
      </a>
      <div className="text-sm text-black dark:text-white text-opacity-80">({domain ? domain : "self.hackernews"})</div>
    </div>
  );
});

const ResultMetaData = React.memo(({ index, score }) => {
  return (
    <div className="flex flex-row justify-between sm:items-center sm:justify-start sm:w-24">
      {index && <div className="order-2 text-sm text-black dark:text-white sm:inline sm:order-1 text-opacity-80">{index}</div>}
      <div className="order-1 pr-2 text-lg font-bold sm:order-2 sm:pl-3 text-orange">{score}</div>
    </div>
  );
});

const ResultInfo = ({ user, numComments, time, id }) => {
  const timeAgo = useMemo(() => getTimeAgo(time), [time]);

  return (
    <div className="flex flex-row text-sm text-black divide-x divide-black dark:divide-white dark:text-white text-opacity-80 divide-opacity-25">

      <div className="py-1 pr-2">
        <span title={(new Date(time * 1000)).toLocaleString()}>
          {timeAgo}
        </span>
        {user && <span> by <Link className="ml-1.5 hover:text-black dark:hover:text-white" to={`/user/${user}`} style={{color: '#FF6600'}}><b>{user}</b></Link></span>}
      </div>

      <Link to={`/item/${id}`}>
        <div className="pl-3">
          <div className="flex flex-row items-center py-1 rounded hover:text-black dark:hover:text-white">
            <CommentIcon size={15} /> {numComments} {numComments === 1 ? "comment" : "comments"}
          </div>
        </div>
      </Link>

    </div>
  );
};

const Result = React.memo(({ children: [metaData, title, postInfo] }) => {
  return (
    <div className="flex flex-col px-4 py-5 sm:items-center sm:flex-row">
      {metaData}

      <div className="flex flex-col space-y-1">
        {title}
        {postInfo}
      </div>
    </div>
  );
});

const Results = React.memo(({ children }) => {
  return (
    <div className="flex flex-col divide-y dark:divide-gray-700">
      {children}
    </div>
  );
});

export { Results, Result, ResultTitle, ResultMetaData, ResultInfo };

function getTimeAgo(timestamp) {
  const now = Date.now();
  const secondsSince = Math.floor((now - timestamp * 1000) / 1000);

  if (secondsSince < 60) {
    return `${secondsSince} second${secondsSince === 1 ? "" : "s"} ago`;
  }

  const minutesSince = Math.floor(secondsSince / 60);

  if (minutesSince < 60) {
    return `${minutesSince} minute${minutesSince === 1 ? "" : "s"} ago`;
  }

  const hoursSince = Math.floor(minutesSince / 60);

  if (hoursSince < 24) {
    return `${hoursSince} hour${hoursSince === 1 ? "" : "s"} ago`;
  }

  const daysSince = Math.floor(hoursSince / 24);

  return `${daysSince} day${daysSince === 1 ? "" : "s"} ago`;
}
