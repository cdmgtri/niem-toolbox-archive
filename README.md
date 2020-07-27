
# NIEM Assistant

This is a Vue Single-Page Application (SPA) built for improved model management support.

## Features

### Information pages

- Information pages available for releases, namespaces, properties, and types
- Easy navigation to help users walk the model
- Pages use readable URLs
- Sections are grouped under drop-downs to quickly show/hide info without a lot of scrolling
- Table cells can be clicked to quickly copy the value
- Tables can be easily copied to Markdown or Excel

### Search

- Keyword property searches
  - Include a namespace prefix (e.g., "nc:" to restrict results by namespace)
  - Search or filter by property type keywords
- Results filtering
  - Filter by namespace prefix
- Saves recent searches

### Map

- Enable in the Search Results panel for mapping support
- Navigating through the search panel maintains track of the followed XPath for better mapping details
- Copy button on each property to copy the `XPath`, `Prefix`, `Property Name`, `Definition`, `Qualified Type`, and `Substitution Group` fields for Excel

## Getting started

```sh
npm i cdmgtri:niem-assistant
```

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

- [ ] Add contained property copy buttons
- [ ] Update Release page with namespace list
- [ ] Additional namespace fields
  - [ ] dependencies
  - [ ] dependents

**Search**

- [ ] Search terms in any order
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

- [ ] Pin and cache items
- [ ] Fix xpath word wrap
- [ ] Model QA status?
- [ ] Release stats
- [ ] Add pop-up close buttons to close current details for long lists without a lot of scrolling (e.g., Person)
- [ ] Pass current xpath into property pages?
- [ ] Support all releases
- [ ] Upload local release
- [ ] Swap out backend

**Performance**

- [ ] lazy load sections
- [ ] lazy load rows
- [ ] faster release reload

**NIEM Spreadsheet support**

- [ ] Upload spreadsheet
- [ ] Run QA
- [ ] Display results
- [ ] Download XSD
- [ ] Save / reload local release
