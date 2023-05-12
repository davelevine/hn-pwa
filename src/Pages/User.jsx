import { useParams } from "react-router-dom";
import useFetch from "../Helpers/useFetch";
import he from "he";

function User() {
  const { username } = useParams();
  const [loading, res, error] = useFetch(`https://hn.algolia.com/api/v1/users/${username}.json`);

const makeUrlsClickable = (text) => {
  // regex to match URLs with or without http/https prefixes, accounting for special characters
  const urlRegex = /((?:https?:\/\/)?(?:www\.)?[^\s;"'<>()[\]{}|\\^`]+(\.[^\s;"'<>()[\]{}|\\^`]+)+[^\s;"'<>()[\]{}|\\^`.,;:?])/g;
  // regex to match email addresses
  const emailRegex = /([^\s]+@[^\s]+\.[^\s]+)/g;
  // decode text to handle HTML entities
  const decodedText = he.decode(text);
  // replace words with links if they match the email or URL regex
  const newText = decodedText.replace(/(^|\s)([^\s]+)/g, (match, leadingSpace, word) => {
    // check if word matches email regex
    if (emailRegex.test(word)) {
      // if so, create mailto link
      return leadingSpace + `<a href="mailto:${word}" style="color: #7ec7e8">${word}</a>`;
    } else {
      // check if word matches URL regex
      const urlMatch = word.match(urlRegex);
      if (urlMatch) {
        // get matched URL and add http/https prefix if necessary
        const url = urlMatch[0].startsWith("http") ? urlMatch[0] : "https://" + urlMatch[0];
        // create link with target="_blank" to open in new tab
        return leadingSpace + `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#7ec7e8">${url}</a>` + word.slice(urlMatch[0].length);
      } else {
        // if neither email nor URL, return original word
        return leadingSpace + word;
      }
    }
  });
  // return new text with links
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
