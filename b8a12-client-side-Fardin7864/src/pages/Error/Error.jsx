import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  // console.error(error);

  return (
    <div>
      <div className="  flex lg:flex-row flex-col-reverse justify-center items-center pt-16">
        <div className=" flex flex-col items-center">
          <h1 className="text-3xl font-bold">Oops!!</h1>
          <p className="text-xl">Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
          <Link to="/" className="btn btn-warning">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
