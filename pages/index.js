import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";

import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  // getStaticProps only runs on the server-side. It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.
  // Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.
  // getStaticProps can only be exported from a page. You can’t export it from non-page files.
  //Alternative: getServerSideProps (https://nextjs.org/learn/basics/data-fetching/request-time)
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const { data, status } = useSession();
  const userEmail = session?.user.email;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi!</p>
        <p>
          (This is a sample website - you can build a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {status === "authenticated" ? (
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <p>Signed in as {userEmail}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <>
          <p>Not signed in.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </Layout>
  );
}
