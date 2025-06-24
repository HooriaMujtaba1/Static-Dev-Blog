import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';

export default function BlogIndex({ posts, searchTerm = '' }) {
  const filteredPosts = posts.filter((post) =>
    [post.title, post.excerpt, post.author]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>My Coding Journey - Blog</title>
        <meta name="description" content="A blog about coding, learning, and personal growth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">My Coding Journey</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginTop: '1rem' }}>
            Sharing my experiences, tips, and discoveries in the world of programming
          </p>
        </header>

        <div className="blog-posts-grid">
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <p>No blog posts found. Try changing your search term.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post.slug} className="blog-post-card ">
                <Link href={`/blog/${post.slug}`} className="blog-post-link ">
                  {post.image && (
                    <div className="w-full max-w-[900px] max-h-[290px] overflow-hidden rounded-xl mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        //width={90}
                        //height={10}
                        className="object-cover rounded-xl w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="blog-post-content">
                    <h2 className="blog-post-title">{post.title}</h2>
                    <div className="blog-post-meta">
                      <span>By {post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="blog-post-excerpt">{post.excerpt}</p>
                    )}
                    <div className="blog-post-footer">
                      <span className="read-more">Read more →</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'data', 'posts');

  if (!fs.existsSync(postsDirectory)) {
    return {
      props: {
        posts: [],
      },
    };
  }

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter((name) => name.endsWith('.json'))
    .map((filename) => {
      const slug = filename.replace(/\.json$/, '');
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents);

      const wordsPerMinute = 200;
      const wordCount = data.content?.split(/\s+/).length || 0;
      const readTime = Math.ceil(wordCount / wordsPerMinute);

      const formattedDate = data.date
        ? new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        : new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: formattedDate,
        author: data.author || 'Author',
        excerpt:
          data.excerpt ||
          (data.content
            ? data.content.substring(0, 150).replace(/[#*]/g, '').trim() + '...'
            : ''),
        readTime,
        publishedAt: data.date || new Date().toISOString(),
        image: data.image || null, // ✅ Ensures image is included
      };
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return {
    props: {
      posts,
    },
  };
}
