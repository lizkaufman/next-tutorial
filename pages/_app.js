//In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.
// Any styles imported in _app.js will be applied globally, to all pages of the application.
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
