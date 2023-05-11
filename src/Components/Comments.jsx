import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { CommentIcon, LinkIcon, ChevronUp, ChevronDown } from "./Icons";

const ThreadTitle = React.memo(({ title, numComments, domain, timeAgo, user, time, url, score, children: content }) => {
  return (
    <div className="flex flex-row items-center px-4 py-4 text-lg sm:pb-7">
      <div className="flex flex-col min-w-full">

      <div className="flex flex-row items-baseline space-x-2 sm:hidden">
        <div className="font-semibold text-orange">{score}</div>
        {domain && (
          <div className="flex flex-row items-center ml-2 text-sm text-black dark:text-white text-opacity-80" style={{ color: '#8CD8F9' }}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <span className="ml-1">{domain}</span>
            </a>
          </div>
        )}
        </div>

        <div className="flex flex-col items-start order-2 my-3">
          <a className="mr-2 font-medium sm:text-xl lg:text-2xl font-serif" target="_blank" rel="nofollow noopener noreferrer" href={url}>
            {title}
          </a>
        </div>

        <div className="flex flex-row flex-wrap order-3 text-sm text-black divide-black sm:divide-x dark:text-white text-opacity-80 dark:divide-white divide-opacity-25 sm:order-2">
          <div className="hidden mr-2 font-medium sm:flex">{score} points</div>

          <div className="sm:px-2"><time title={(new Date(time * 1000)).toLocaleString()}>
            {timeAgo} by </time><Link className="pr-2 sm:pr-0 pl-0.5 font-semibold dark:hover:text-orange hover:text-black" to={`/user/${user}`} style={{color: '#FF6600'}}>{user}</Link>
          </div>

        <div className="flex flex-row items-center px-2 border-l sm:border-0">
          <CommentIcon size={15} />
          {numComments} {numComments === 1 ? "comment" : "comments"}
        </div>
        {domain && (
          <div className="flex-row items-center order-1 hidden pl-2 text-sm text-black sm:flex dark:text-white text-opacity-80" style={{ color: '#8CD8F9' }}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <LinkIcon size={15} />
              <span className="ml-0">{domain}</span>
            </a>
          </div>
        )}
        </div>

        {content && <div className="order-4 mt-4 space-y-4 text-base"
          dangerouslySetInnerHTML={{ __html: content.replace(/rel="nofollow"/g, `rel="nofollow noopener noreferrer" target="_blank"`) }}>
        </div>}
      </div>
    </div>
  );
});

const CommentInfo = React.memo(({ username, timeAgo }) => {
  return (
    <div className="flex flex-row items-center justify-between sm:justify-start">
      { /* Handle deleted comments */
        username && <div className="mr-2 font-medium">
          <Link to={`/user/${username}`} style={{color: '#FF6600'}}>{username}</Link>
        </div>
      }
      <div className="mr-2 text-sm text-black dark:text-white text-opacity-80">{timeAgo}</div>
    </div>
  );
});


const Comment = React.memo(({ children: body, username, timeAgo }) => {
  return (
    <div className="flex flex-col px-3 pt-4 pb-2 sm:p-4">
      <CommentInfo username={username} timeAgo={timeAgo} />
      <div className="pt-2">{body}</div>
    </div>
  );
});

const CommentThread = React.memo(({ children: { content, user, time_ago, comments: commentThreads } }) => {
  const [visible, setVisible] = useState(false);

  const toggle_visibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <Comment username={user} timeAgo={time_ago}>
      <div className="space-y-3 comment-body"
        dangerouslySetInnerHTML={{ __html: content.replace(/rel="nofollow"/g, `rel="nofollow noopener noreferrer" target="_blank"`) }}>
      </div>

      { /* Collapsable comment threads */
        commentThreads.length !== 0 ? (
          <button className="flex flex-row items-center justify-end w-full py-2 space-x-2 font-medium focus-within:outline-none" onClick={toggle_visibility}>
            <div>{visible ? "Hide" : "Show"} {commentThreads.length} {commentThreads.length > 1 ? "replies" : "reply"}</div>
            {visible ? <ChevronUp /> : <ChevronDown />}
          </button>
        ) : <div className="pb-4 sm:pb-1"></div>
      }

      {/* Recursively create child threads */
        commentThreads.map((topLevelComment) => {
          return (visible &&
            <CommentThread key={topLevelComment.id.toString()}>
              {topLevelComment}
            </CommentThread>
          );
        })}
    </Comment>
  )
});

function Comments({ children: commentThreads }) {
  return (
    <div className="flex flex-col pb-12 text-base divide-y sm:text-base dark:divide-gray-700">
      {commentThreads}
    </div>
  );
}

export { Comments, CommentThread, ThreadTitle };