import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import styles from "~/styles/Home.module.css";
import { getAllPosts } from "~/utils/mdx";

const inter = Inter({ subsets: ["latin"] });

type Post = {
  code: string;
  slug: string;
  frontmatter: {
    slug: string;
    title: string;
    description: string;
  };
};
const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>MDX bundler with nextjs</title>
        <meta name="description" content="MDX bundler with nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>✍️ All latest Posts</h1>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <Link href={`posts/${post.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};

export default Home;
