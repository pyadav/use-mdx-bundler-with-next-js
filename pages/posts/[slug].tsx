import { getMDXComponent } from "mdx-bundler/client";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { Hello } from "~/components/hello";

import styles from "../../styles/Home.module.css";
import { getAllPosts, getSinglePost } from "../../utils/mdx";

type Post = {
  code: string;
  slug: string;
  frontmatter: {
    slug: string;
    title: string;
    description: string;
  };
};

const Post = ({ code }: Post) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={"/"} style={{ margin: "2rem 0" }}>
          Go home
        </Link>
        <Component
          components={{
            Hello,
          }}
        />
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);
  return {
    props: { ...post },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
