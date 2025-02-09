# Ramble Blog

Welcome to **Ramble Blog**

## Features

- 📝 **Markdown Editor** – Supports real-time preview and syntax highlighting.
- 📄 **Post Management** – View, create, and manage blog posts with dynamic content.
- 🎨 **Dark Mode Support** – Automatically adapts to user theme preferences.
- 🖼 **Image Upload** – Drag-and-drop support for adding images to posts.
- 🚀 **Fast Navigation** – Optimized with Next.js and ShadCN UI components.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Markdown Parsing**: [React Markdown](https://github.com/remarkjs/react-markdown), [CodeMirror](https://codemirror.net/)
- **State Management**: React Hooks
- **Routing**: Next.js Navigation API
- **Deployment**: [Vercel](https://vercel.com/)

## Managing Posts (Admin Mode)
If NEXT_PUBLIC_MODE=ADMIN, a New Post button is available.

## Project Strucutre
```
/ramble_blog
├── components/
│   ├── ui/                 # UI components (buttons, cards, typography)
│   ├── hero.tsx            # Hero section with introduction
│   ├── postsContainer.tsx  # Displays latest posts
│   ├── markdown_input.tsx  # Markdown editor with preview
│   ├── submitButton.tsx    # Handles post submission
├── app/
│   ├── actions/blogActions.ts # API actions for handling posts
│   ├── actions/imageActions.ts # API actions for handling image uploads
├── public/
│   ├── blogHero.png        # Default hero image
├── pages/
│   ├── index.tsx           # Home page
│   ├── blog/[slug].tsx     # Blog post detail page
│   ├── markdownEditor.tsx  # Markdown editor page
└── README.md
```

## Author
Alex Hong – GitHub
