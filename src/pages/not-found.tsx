import { Link } from "react-router";

function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <Link to={`/`} className="bg-primary rounded-sm p-1">
        Go to the Home page
      </Link>
    </>
  );
}

export default NotFoundPage;
