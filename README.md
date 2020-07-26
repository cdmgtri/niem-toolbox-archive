
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

**Component and Row Pages**

- [x] Load component page directly from url
- [x] Fix errors on component page before loading
- [x] Fix to reload successfully from component page
- [ ] Merge object list pages
- [ ] Merge object row pages
- [ ] Merge object pages
- [ ] Property
- [ ] Type
- [ ] Namespace
- [ ] Make loading calls async to support later calls to database backend
- [ ] Add facet copy table button (markdown table, tabbed table)
- [ ] Add SM copy buttons (markdown table, markdown list, tabbed table)

**Search**

- [ ] Use tabs to allow for multiple searches and/or data pages at the same time
  - [ ] New tab as new search instance
  - [ ] Open in tab for component link clicks - *if route includes search, open tab*
- [ ] Extra panel option for large displays
- [ ] Advanced search
  - [ ] Context search for extensions and roles (e.g., Arrest Date, Victim first name)
  - [ ] Term filter
- [ ] Recent searches => pinned items?
- [ ] Cache and reload recent searches
- [ ] Add search terms as url query parameters

**Browse**

- [ ] Namespace list
  - [ ] Namespace metadata
  - [ ] Property, type, and local term counts
  - [ ] Namespace term cloud
  - [ ] Dependencies
- [ ] Model term cloud

**App**

- [x] Unblock page on load and add a loading message
- [x] Move subset and map options from parameters to store
- [x] Add a loading spinner
- [ ] Fix h4 spacing
- [ ] Fix xpath word wrap
- [ ] Model QA status?
- [ ] Release stats
- [ ] Add pop-up close buttons to close current details for long lists without a lot of scrolling (e.g., Person)
- [ ] Pass current xpath into property pages?
- [ ] Support all releases
- [ ] Upload local release

**NIEM Spreadsheet**

- [ ] Upload spreadsheet
- [ ] Run QA
- [ ] Display results
- [ ] Download XSD
- [ ] Save as release

**NIEM Model**

- [ ] Load structures attributes
- [ ] Faster release reload time (from 15 - 17 seconds now)
- [ ] Redo edits to simplify and remove previous identifiers
  - [ ] Convert edit to (oldIdentifiers, modifiedFields)
