# CLAUDE.md

This file gives Claude Code context for working in this repository.

## What this site is

`sunin.me` — Sunin Kim's personal site, hosted via GitHub Pages from this repo
(`CNAME` → `sunin.me`, `_config.yml` → `url: https://sunin.me`).

It serves two purposes:

1. **Personal / academic homepage** — about, publications, projects, CV.
2. **Tech blog on robotics & AI** — monthly long-form posts at `https://sunin.me/blog`,
   reflecting on hands-on experience in robot learning, manipulation, locomotion,
   and applied AI. One post per month is the target cadence.

The author works on robotic manipulation at CarbonSix; previously researched RL
for robotics (M.S.) and worked on AMBIDEX, Garo, and humanoid systems at
Naver Labs. Posts should be written from that practitioner's perspective —
concrete experiences, lessons, and trade-offs — not generic survey content.

## Tech stack

- **Jekyll** (static site generator) with `kramdown` markdown and `jekyll-paginate`.
- **GitHub Pages** for hosting (custom domain via `CNAME`).
- Theme is a customized fork of the Cayman blog theme.
- Local dev: `bundle exec jekyll serve` after `bundle install`. Build output goes
  to `_site/` (do not edit by hand — it is generated).

## Repository layout

```
_config.yml          Site config. Key values:
                       title: "Sunin Archive"
                       url:   https://sunin.me
                       paginate: 10
                       paginate_path: "/blog/page:num/"
                       permalink: "/blog/:title/"
CNAME                sunin.me
index.html           Home page. Empty content body — the academic sections are
                     rendered by default.html, scoped to `page.url == "/"`.
blog/index.html      Blog landing at /blog. Iterates `paginator.posts` and lists
                     posts (title, date, excerpt) with prev/next pagination links.
_posts/              Jekyll posts as YYYY-MM-DD-slug.md with front matter
                     `layout: post`. Posts publish to /blog/<slug>/ via the
                     `permalink` setting.
_layouts/
  default.html       Site shell. Renders About / Publications / Projects ONLY when
                     `page.url == "/"`; otherwise just renders `{{ content }}`.
                     The About contact line includes: CV / email / LinkedIn / Blog.
  page.html          Simple page wrapper (title + content).
  post.html          Post layout: header (title + date + author) → content →
                     centered "- to blog -" link back to /blog.
_includes/           head.html, header.html (empty), footer.html, scripts.html
                     (clipboard.js for share buttons), social icons.
assets/
  SuninKim_CV.pdf    Linked from the About section.
img/                 Profile photo, project/publication thumbnails, hero gifs.
stylesheets/         normalize.css, stylesheet.css (main), sharing-popup.css.
feed.xml             RSS feed.
_site/               Build output. Generated. Do not edit.
```

## How the blog is wired

- **Home (`/`)**: `index.html` is intentionally empty. `default.html` checks
  `page.url == "/"` and renders the About / Publications / Projects sections
  around `{{ content }}`. The About contact line has a `Blog` link that
  navigates to `/blog`.
- **Blog index (`/blog`)**: `blog/index.html` uses the default layout (which,
  because `page.url != "/"`, skips the academic sections) and renders the
  paginated post list.
- **Individual post (`/blog/<slug>/`)**: `_posts/<file>.md` → `post.html` →
  `default.html`. Same scoping skips the academic sections; only the post
  body shows, plus a back-to-blog link.
- **Pagination**: `jekyll-paginate` (legacy gem) generates `/blog/page2/`,
  `/blog/page3/`, etc. via `paginate_path`. Page size is 10.

## Writing a new post

1. Create `_posts/YYYY-MM-DD-slug.md`.
2. Front matter:
   ```yaml
   ---
   layout: post
   title: "<title>"
   date: YYYY-MM-DD
   ---
   ```
3. Use kramdown markdown. Images go in `img/` and are referenced as
   `/img/filename.ext`.
4. Build locally with `bundle exec jekyll serve` and verify before pushing.

## Conventions and constraints

- Cadence: roughly one post per month. Posts should draw on the author's own
  work and reflections (robotics, RL, manipulation, locomotion, sim-to-real,
  applied AI in real robots), not be generic explainers.
- Do not edit `_site/` — it is regenerated on every build.
- The site is bilingual-friendly in spirit: the author is Korean and may write
  posts in either Korean or English. Match the language the user chooses for a
  given post.
- Keep image sizes reasonable. The repo already has multi-MB gifs; prefer
  optimized versions for new posts.
- Pagination is set to 10 posts per page in `_config.yml`.

## Things to be careful about

- About / Publications / Projects sections in `default.html` are gated on
  `page.url == "/"`. If you add a new top-level landing page, that gate needs
  to be revisited.
- `jekyll-paginate` is the legacy gem and only paginates ONE index file —
  `/blog/index.html` per `paginate_path`. Don't add `paginator` references on
  any other page; they will be empty.
- `feed.xml` predates the blog restructure. If RSS matters, verify it points
  at the right post URLs after the first post is live.
