
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
- [x] Merge object list pages
- [x] Merge object row pages
- [x] Merge object pages
- [x] Property
- [x] Type
- [x] Namespace
- [x] Add local term copy table
- [x] Add facet copy table button (markdown table, tabbed table)
- [ ] Add SM copy buttons (markdown table, markdown list, tabbed table)
- [ ] Add contained property copy buttons
- [ ] Update Release page with namespace list
- [ ] Additional namespace fields
  - [ ] dependencies
  - [ ] dependents

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

- [ ] Release page (namespace list)
  - [ ] Namespace metadata
  - [ ] Property, type, and local term counts
  - [ ] Namespace term cloud
  - [ ] Dependencies
- [ ] Model term cloud

**App**

- [x] Unblock page on load and add a loading message
- [x] Move subset and map options from parameters to store
- [x] Add a loading spinner
- [x] Fix h4 spacing
- [x] Create CopyTable template for table with easy-copy cells and entire table Markdown and Excel copy buttons
- [ ] Moved fixed table column widths to App.vue style section
- [ ] **lazy load sections**
- [ ] **lazy load rows**
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
