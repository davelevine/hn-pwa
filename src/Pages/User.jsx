import { useParams } from "react-router-dom";
import useFetch from "../Helpers/useFetch";
import he from "he";

function User() {
  const { username } = useParams();
  const [loading, res, error] = useFetch(`https://hn.algolia.com/api/v1/users/${username}.json`);

  const makeUrlsClickable = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const decodedText = he.decode(text);
    const newText = decodedText.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #8CD8F9">${url}</a>`;
    });
    console.log(newText); // add this line to check if URLs are being matched
    return newText;
  };

  const about = res?.about && makeUrlsClickable(res.about);

  return (
    error || loading ||
    <div className="flex flex-col px-4 dark:text-gray-200">
      <div className="pb-2 text-lg font-medium dark:text-orange mt-7">{username}</div>
      <div>Created: {(new Date(res.created_at_i * 1000))
        .toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      <div>Karma: {res.karma.toLocaleString()}</div>

      {about && (
        <div className="mt-3 space-y-2" dangerouslySetInnerHTML={{ __html: about }}></div>
      )}

      <div className="flex flex-col pb-4 my-4 space-y-2">
        <div className="font-medium">
          <a className="dark:hover:text-white" target="_blank" rel="noreferrer" href={`https://news.ycombinator.com/submitted?id=${username}`}>
            View {res.submission_count} submissions
          </a>
        </div>
        <div className="font-medium">
          <a className="dark:hover:text-white" target="_blank" rel="noreferrer" href={`https://news.ycombinator.com/threads?id=${username}`}>
            View {res.comment_count} comments
          </a>
        </div>
      </div>
    </div>
  );
}

export default User;
