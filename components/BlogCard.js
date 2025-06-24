import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogCard({ post }) {
  const {
    slug = '',
    frontmatter = {},
    content = '',
  } = post;

  const {
    title = 'Untitled',
    date = 'Unknown date',
    tags = [],
    excerpt = '',
  } = frontmatter;

  const displayDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown date';

  const previewText = excerpt || content.replace(/[#*_`]/g, '').slice(0, 150) + '...';

  return (
    <Link href={`/blog/${slug}`} passHref legacyBehavior>
      <motion.a
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="block p-5 rounded-xl border border-gray-300 dark:border-gray-700
                   hover:shadow-lg hover:border-blue-500 transition bg-white dark:bg-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Read blog post titled ${title}`}
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600">
          {title}
        </h2>

        {/* Date */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2" aria-label={`Published on ${displayDate}`}>
          {displayDate}
        </p>

        {/* Excerpt */}
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3 text-sm mb-3">
          {previewText}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2" aria-label="Post tags">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 
                         px-2 py-0.5 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <span className="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm font-semibold underline underline-offset-2">
          Read more →
        </span>
      </motion.a>
    </Link>
  );
}
