-- ============================================================
-- 0002_seed_projects.sql
-- Seed portfolio projects from original static site
-- Run after 0001_initial_schema.sql
-- ============================================================

-- Work projects
insert into public.projects (slug, title, employer, description, url, technologies, display_order, featured, is_active)
values
  (
    'novi',
    'Novi Connect',
    'Novi',
    'Policy compliance software using data to fight greenwashing — Formulated Goods policy encoding and compliance tooling for consumer products.',
    'https://www.noviconnect.com/',
    array['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    10, true, true
  ),
  (
    'gemini-nifty-gateway',
    'Gemini × Nifty Gateway',
    'Gemini',
    'Art marketplace platform — wallets, accounts, and NFT purchasing experience for Gemini''s digital art subsidiary Nifty Gateway.',
    'https://www.gemini.com/',
    array['React', 'TypeScript', 'GraphQL', 'Node.js'],
    20, true, true
  ),
  (
    'instrument',
    'Instrument',
    'Instrument',
    'Agency work across a diverse client roster: Salesforce Dreamforce (live streaming event platform, sessions, scheduling), About Twitter, Intuitive (3D model viewer + component library), Levi''s ecommerce, Zwift ecommerce, Sonos Radio marketing site, Appfolio business site.',
    'https://www.instrument.com/',
    array['React', 'Vue.js', 'TypeScript', 'Node.js', 'Contentful', 'Sanity', 'AWS'],
    30, true, true
  ),
  -- Personal / Freelance projects
  (
    'tom-kane-art',
    'Tom Kane Art',
    null,
    'eCommerce site built with Rails and AWS to sell paintings by artist Tom Kane.',
    'https://www.tomkaneart.com',
    array['Ruby on Rails', 'AWS S3', 'PostgreSQL', 'CSS'],
    40, false, true
  ),
  (
    'career-quest',
    'Career Quest',
    null,
    'Ruby and Sinatra website to organize your job search. Track applications, interviews, and opportunities in one place.',
    'https://github.com/gravytates/career_quest',
    array['Ruby', 'Sinatra', 'SQLite', 'CSS'],
    50, false, true
  ),
  (
    'green-state',
    'Green State',
    null,
    'Rails site to estimate Carbon Emissions and statistically compare between results — data visualization for environmental impact.',
    'https://github.com/gravytates/green_state',
    array['Ruby on Rails', 'PostgreSQL', 'D3.js', 'Chartkick'],
    60, false, true
  ),
  (
    'restoration-station',
    'Restoration Station',
    null,
    'Angular 2 and Firebase site for managing and tracking watershed restoration crews in the field.',
    'https://github.com/gravytates/restoration-station',
    array['Angular 2', 'Firebase', 'TypeScript', 'CSS'],
    70, false, true
  ),
  (
    'gradys-games',
    'Grady''s Games',
    null,
    'Authenticated Rails site to view, create, and manage video game reviews — with user authentication and admin controls.',
    'https://github.com/gravytates/gradys_games',
    array['Ruby on Rails', 'PostgreSQL', 'Devise', 'CSS'],
    80, false, true
  ),
  (
    'university-api',
    'University API',
    null,
    'JWT authenticated API built in Ruby returning a database of universities and their reviews.',
    'https://github.com/gravytates/university_api',
    array['Ruby', 'JWT', 'PostgreSQL', 'REST API'],
    90, false, true
  ),
  (
    'lunchwith',
    'LunchWith',
    null,
    'React Native and Redux mobile app for junior and senior developers to find and connect with each other over lunch.',
    'https://github.com/teustice/lunchwith',
    array['React Native', 'Redux', 'Node.js', 'JavaScript'],
    100, false, true
  );

-- Project media (images from the original site, now in /public/projects/)
-- In production these would be Supabase Storage URLs
insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/tomkane.png', 'Tom Kane Art eCommerce screenshot', 'screenshot', 0, true
from public.projects where slug = 'tom-kane-art';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/careerquest.png', 'Career Quest job search app screenshot', 'screenshot', 0, true
from public.projects where slug = 'career-quest';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/greenstate.png', 'Green State carbon emissions site screenshot', 'screenshot', 0, true
from public.projects where slug = 'green-state';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/restorationstation.png', 'Restoration Station watershed management app screenshot', 'screenshot', 0, true
from public.projects where slug = 'restoration-station';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/gradysgames.png', 'Grady''s Games video game reviews site screenshot', 'screenshot', 0, true
from public.projects where slug = 'gradys-games';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/university.png', 'University API documentation screenshot', 'screenshot', 0, true
from public.projects where slug = 'university-api';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/lunchwithMap.gif', 'LunchWith app map view', 'gif', 0, true
from public.projects where slug = 'lunchwith';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/lunchwithProfile.gif', 'LunchWith app profile view', 'gif', 1, false
from public.projects where slug = 'lunchwith';

insert into public.project_media (project_id, url, alt_text, media_type, display_order, is_cover)
select id, '/projects/lunchwithFilter.gif', 'LunchWith app filter view', 'gif', 2, false
from public.projects where slug = 'lunchwith';
