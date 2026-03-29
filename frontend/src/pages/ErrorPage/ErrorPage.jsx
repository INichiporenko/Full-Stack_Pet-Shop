import s from "./ErrorPage.module.css";
import error from "../../images/img/404.png";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="wrapper">
      <div className={s.section_error}>
        <img src={error} alt="error" />
        <div className={s.title}>
          <h2>Page Not Found</h2>
          <p>
            We’re sorry, the page you requested could not be found. Please go
            back to the homepage.
          </p>
        </div>
        <Link to="/" className={s.btn}>
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default ErrorPage;
