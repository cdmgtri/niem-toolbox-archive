
# NIEM Assistant

This is a Vue Single-Page Application (SPA) built for improved model management support.

## Features

### Content pages

- Release, namespace, property, and type information pages
- Easy navigation to help users walk the model
- Pages use descriptive URLs
- Sections are grouped under drop-downs to quickly show/hide info and reduce scrolling
- Info fields and table cells can be clicked to quickly copy the value
- Tables can be easily copied to Markdown or Excel
- Namespace word clouds for common property terms

### Search

- Keyword property searches
- Include a namespace prefix (e.g., "nc:") in the search box to restrict results by namespace
- Search or filter by property type keywords
- Filter results by namespace prefix
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

Run app locally in development mode

```bash
npm run serve
```

Deploy app to GitHub Pages

```bash
npm run deploy
```

Keep app running locally in development watch mode with [PM2](https://pm2.keymetrics.io/) daemon process manager

```bash
npm run pm2
```

## Roadmap

- [ ] Offload expensive non-UI functions to web workers
- [ ] Support multiple releases
- [ ] Add release migration information
- [ ] Add release QA
- [ ] Add support for NIEM change requests
- [ ] Upload and generate XSDs
- [ ] Display release stats

## TO DO

**App**

- [ ] Update app name
- [ ] Update home page

**Web workers**

- [ ] Implement comlink-loader
- [ ] Move load function to web worker
- [ ] Move non-UI functions to web workers

**Multi-release support**

- [ ] Script to copy over release JSON data
- [ ] Refactor to drop use of current release arrays
- [ ] User-selected default release
- [ ] User-selected releases to load
- [ ] Visual to indicate user has navigated to non-default release

**NIEM Components**

- [ ] Quick access to augmentations in contained properties list
- [ ] View substitution count for abstracts

**Copy buttons**

- [ ] Default copy button action
- [ ] Additional drop-down copy button actions

**Mapping support**

- [ ] Show component mapping history
- [ ] Show release diffs

**Release QA**

- [ ] Run niem-model-qa
- [ ] View test info
- [ ] View issues
- [ ] View qa stats
- [ ] Navigate to affected components
- [ ] Filter namespaces

**NIEM Spreadsheet support**

- [ ] Upload spreadsheet
- [ ] Run spreadsheet QA
- [ ] Display results
- [ ] Load content as new release with full NIEM release or NIEM subset
- [ ] Save release as JSON data
- [ ] Reload release

**XSD support**

- [ ] Download XSD
- [ ] Save / reload local release

**Stats**

- [ ] Release stats totals
- [ ] Release stats by namespace
- [ ] Model stat history
- [ ] Download stats spreadsheet

## Backlog

**App**

- [ ] Pin and cache items
- [ ] Fix xpath word wrap
- [ ] Add pop-up close buttons to close current details for long lists without a lot of scrolling (e.g., Person)
- [ ] Pass current xpath into property pages?
- [ ] Extra panel option for large displays
- [ ] Swap out backend

**Release page**

- [ ] Add namespace list and metadata
- [ ] Add property, type, and local term counts
- [ ] Add dependencies
- [ ] Add release term cloud

**Namespace**

- [ ] Add dependencies
- [ ] Add dependents

**WordCloud component**

- [ ] Pass in prefix array
- [ ] Add prefix filter if more than one prefix given
- [ ] Add colors
- [ ] Increase padding between terms

**Search**

- [ ] Search terms in any order
- [ ] Cache and reload recent searches
- [ ] Pin searches
- [ ] Type searches
- [ ] Results term filter
- [ ] Sync filtered prefixes with url query parameters
- [ ] Context search for extensions and roles (e.g., Arrest Date, Victim first name)

**Subsets**

- [ ] Subset panel
- [ ] Add components to subset
- [ ] Drop components from subset
- [ ] Calculate dependencies
- [ ] Import wantlist
- [ ] Generate wantlist

**Getting started page**

- [ ] List key properties from Core and domains
- [ ] List namespaces
- [ ] Add top 75 terms word cloud with namespace filter
