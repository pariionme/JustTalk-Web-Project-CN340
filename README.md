

````md
# JustTalk Web Project (CN340)

## Overview
JustTalk is a community-based web application where users can read posts, create posts, and participate in discussions.  
This project is developed as part of the CN340 course and focuses on frontend development based on Figma UI designs.

The frontend is built using Next.js with TypeScript and Tailwind CSS.  
Backend functionality such as authentication and database integration is handled separately or mocked during development.

---

## Features
- Home page with guest and logged-in states
- Sign in page
- Sign up page
- Create post page
- View post page (dynamic routing)
- Reusable UI components
- Responsive design

---

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- UI Library: React
- Styling: Tailwind CSS
- Linting: ESLint
- Package Manager: npm

---

## Prerequisites
- Node.js (LTS recommended)
- npm

---

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/pariionme/JustTalk-Web-Project-CN340.git
cd JustTalk-Web-Project-CN340/frontend/justtalk-frontend
````

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open your browser at:
[http://localhost:3000](http://localhost:3000)


---

## Development Notes

* UI is implemented using mock data
* Login state is mocked before backend integration
* Components are reused across pages
* Navigation uses next/link for client-side routing

---

## Environment Variables

Create a `.env.local` file if needed:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Future Improvements

* Backend authentication integration
* Post CRUD functionality
* Comments and likes
* Pagination or infinite scroll
* Accessibility improvements
* Testing

---

## License

This project is for educational purposes under the CN340 course.

---

## Author

5ดอท Team
JustTalk Web Project (CN340)

```


