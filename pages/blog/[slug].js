import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { marked } from 'marked';

export default function BlogPost({ post }) {
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta name="author" content={post.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="blog-container">
        <article>
          <header className="blog-header">
            <h1 className="blog-title">{post.title}</h1>
            <div className="blog-meta">
              <span>By {post.author || 'Author'}</span>
              <span>•</span>
              <span>{post.date}</span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
          </header>

          {post.image && (
            <div className="w-full max-w-[700px] mx-auto mb-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto rounded-xl object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'data', 'posts');

  const filenames = fs.existsSync(postsDir)
    ? fs.readdirSync(postsDir).filter(name => name.endsWith('.json'))
    : [];

  const paths = filenames.map((file) => ({
    params: { slug: file.replace(/\.json$/, '') },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'data', 'posts', `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);

  const wordsPerMinute = 200;
  const wordCount = data.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return {
    props: {
      post: {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        author: data.author || 'Author',
        date: formattedDate,
        readTime,
        excerpt: data.excerpt || data.content.substring(0, 150) + '...',
        content: marked.parse(data.content),
        image: data.image || '', // ✅ Include image
      },
    },
  };
}


