
# NIEM Assistant

## Features

## Getting started

## Usage

**Run app locally:**

```bash
npm run serve
```

**Deploy app to GitHub Pages:**

```bash
npm run deploy
```

## TO DO

**Component Pages**

- [ ] Property
- [ ] Type
- [ ] Namespace

**Search**

- [ ] Use tabs to allow for multiple searches and/or data pages at the same time
  - [ ] New tab as new search instance
  - [ ] Open in tab for component link clicks - *if route includes search, open tab*
  - [ ] Clean up component rows
- [ ] Extra panel option for large displays
- [ ] Advanced search
  - [ ] Context search for extensions and roles (e.g., Arrest Date, Victim first name)
  - [ ] Term filter
- [ ] Recent searches => pinned items?

**Browse**

- [ ] Namespace list
  - [ ] Namespace metadata
  - [ ] Property, type, and local term counts
  - [ ] Namespace term cloud
- [ ] Model term cloud

**App**

- [x] Unblock page on load and add a loading message
- [x] Load component page directly from url
- [x] Move subset and map options from parameters to store
- [ ] Model QA status?
- [ ] Release stats
- [ ] Add pop-up close buttons to close current details for long lists without a lot of scrolling (e.g., Person)
- [ ] Fix errors on component page before loading
