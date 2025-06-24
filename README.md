# Static Blog Viewer 🚀

A beautifully styled developer blog built with **Next.js**, **Markdown-to-HTML**, and **Tailwind CSS** — designed to share insights, tips, and experiences from a coding journey. It features a fully static, fast-loading architecture with modern features like search, image previews, responsive design, and dynamic routing.

![My Coding Journey Screenshot]
![Screenshot (581)](https://github.com/user-attachments/assets/b203eb1b-fe05-4e95-b453-db396b69347d)

---

## ✨ Features

- ✅ Static blog rendering from JSON files
- ✅ Blog list and detail views using dynamic routes (`[slug].js`)
- ✅ Search functionality with live filtering
- ✅ Responsive grid layout (3-column, mobile-friendly)
- ✅ Local and online images support
- ✅ SEO-friendly metadata via `<Head>`
- ✅ Reading time estimator
- ✅ Tailwind CSS + custom CSS variables
- ✅ Markdown-style content rendered as HTML

---

## 🧪 Example Blog Post Format (JSON)

```json
{
  "title": "5 Tips to Stay Motivated While Learning to Code",
  "date": "2025-06-22",
  "author": "Hooria Mujtaba",
  "description": "Discover strategies to stay motivated and achieve your coding goals.",
  "tags": ["motivation", "learning", "productivity"],
  "category": "Personal Growth",
  "readTime": "5 min read",
  "featured": true,
  "image": "https://images.unsplash.com/photo-1750712406219-549c4ba27210?w=700&q=60",
  "content": "# Heading...\n\nMarkdown-style content rendered as HTML..."
}
```
🚀 Getting Started
1. Clone the Repo

    git clone https://github.com/your-username/my-coding-journey.git
    cd my-coding-journey
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Dev Server
bash
Copy
Edit
npm run dev
Visit: http://localhost:3000

🔧 Customize It
Add new blog posts in data/posts/*.json

Update images: use either /public/images/ or external image URLs

Style the layout via globals.css or extend Tailwind

Update SEO meta in pages/index.js and [slug].js

🛠 Built With
Next.js

Tailwind CSS

Marked.js for markdown parsing

Unsplash for blog images

📸 Screenshots
Desktop 3-Grid Layout	Post Detail View

🙋‍♀️ Author
Hooria Mujtaba
Aspiring frontend developer and lifelong learner.
💼 Passionate about building clean, accessible, and meaningful web apps.

📬 Connect on LinkedIn (add your link)


