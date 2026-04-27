/**
 * Static technology categories — not stored in DB since these rarely change
 * and don't need admin management. Update here and redeploy.
 */

export interface TechCategory {
  name: string
  icon: string // path under /public/icons/
  iconAlt: string
  items: string[]
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    name: 'Languages',
    icon: '/icons/012-coding.png',
    iconAlt: 'Code brackets icon',
    items: ['JavaScript', 'TypeScript', 'Ruby', 'Python', 'CSS/SASS', 'Golang', 'Swift', 'Kotlin'],
  },
  {
    name: 'Frameworks',
    icon: '/icons/005-browser-1.png',
    iconAlt: 'Browser icon',
    items: ['Next.js', 'Rails', 'Angular 2+', 'Laravel', 'iOS', 'React Native', 'Django'],
  },
  {
    name: 'Cloud',
    icon: '/icons/015-screen.png',
    iconAlt: 'Screen icon',
    items: ['AWS S3', 'AWS EC2', 'AWS Lambda', 'Heroku', 'Contentful', 'Sanity', 'Netlify', 'Vercel', 'Supabase'],
  },
  {
    name: 'Databases',
    icon: '/icons/010-hierarchical-structure.png',
    iconAlt: 'Database structure icon',
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'Firebase', 'NoSQL'],
  },
  {
    name: 'Testing',
    icon: '/icons/009-browser.png',
    iconAlt: 'Testing icon',
    items: ['Jest', 'Cypress', 'Playwright', 'Datadog Synthetics', 'RSpec', 'PhantomJS', 'Jasmine'],
  },
  {
    name: 'Libraries',
    icon: '/icons/011-responsive.png',
    iconAlt: 'Responsive design icon',
    items: ['React', 'Vue.js', 'D3.js', 'Lightning Web Components', 'OmniAuth', 'Devise'],
  },
  {
    name: 'Bonus Tech',
    icon: '/icons/013-app.png',
    iconAlt: 'App icon',
    items: ['Claude AI', 'MCP Servers', 'REST API', 'Node.js', 'Tiptap', 'Zod', 'Chartkick', 'ArcMap/ArcGIS'],
  },
  {
    name: 'Workflow',
    icon: '/icons/008-checking.png',
    iconAlt: 'Checklist icon',
    items: ['Git', 'Figma', 'Linear', 'Notion', 'Slack', 'JIRA', 'Trello'],
  },
]
