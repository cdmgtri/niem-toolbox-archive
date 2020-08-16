
# NIEM Toolbox

This is a Vue Single-Page Application (SPA) built for improved model management support.

- [Features](#features)
  - [Content pages](#content-pages)
  - [Search](#search)
  - [Mapping support](#mapping-support)
  - [Multi-release support](#multi-release-support)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Future development](#future-development)
  - [Quick picks](#quick-picks)
  - [Roadmap](#roadmap)
  - [Backlog](#backlog)

## Features

### Content pages

- Easy navigation to help users walk the model
- Release, namespace, property, and type information pages
- Pages use descriptive URLs that can be linked to
- Sections are grouped under drop-downs to quickly show/hide info and reduce scrolling
- Info fields and table cells can be clicked to quickly copy the value
- Tables can be easily copied to Markdown or Excel
- Namespace word clouds display common property terms for high-level subject matter overview

### Search

- Keyword property searches
  - Include a namespace prefix (e.g., "nc:") in the search box to restrict results by namespace
  - Option to include definitions in search
- Search or filter results by property type keywords
- Filter results by excluded terms
- Filter results by namespace prefix
- Saves recent searches

### Mapping support

A common task in modeling new NIEM domains or messages is to map local data requirements to a NIEM release.

This typically process involves loading all of the local data requirements into a spreadsheet, and then for each of those local items:

- Search NIEM to find the appropriate corresponding match, if it exists
- Type or copy-paste information about the NIEM match into the spreadsheet
  - The NIEM qualified property name is required to document the match
  - The data type, definition, and xpath for the NIEM property are optional but can be very helpful to document

Individually typing or copy-pasting each of the NIEM fields listed above for each of the mappings involves a lot of repetitive work.

- Enable `map` in the Search Results panel's `Options` button for mapping support
- Search NIEM to find matches for each local data requirements
- Drill down through results to navigate through the desired xpath
- Click the `Copy` button to copy the following fields all at once for a quick paste into Excel
  - `XPath`, `Prefix`, `Property Name`, `Definition`, `Qualified Type`, and `Substitution Group`

### Multi-release support

- Select NIEM releases to load in the Settings page
- Select default release for searches
- Breadcrumb color changes when navigating over items outside of selected release

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

## Future development

### Quick picks

- [x] Show substitution count for abstracts
- [x] Reformat contained properties list vs table
- [x] Fixed missing inherited properties under contained properties
- [x] Fix copy functions
- [x] Rename ContainedPropertiesList component as AvailableProperties
- [x] Quick access to augmentations in contained properties list
- [x] Compress component info (namespace, type, etc) in object row template
- [x] Sort property 'available in types' list by core-qname
- [x] nc:PersonType Type page doesn't load - fixed descendant types
- [ ] nc:Person Property page takes too long to load
- [ ] Merged stacked-object and field-value table components
- [ ] Support internal and external links in table component
- [ ] Pass xpath through property pages
- [ ] Show all derived types on Type page
- [ ] Start here content intro for new users
- [ ] Support type unions
- [ ] Support type lists
- [ ] Support metadata applicability

### Roadmap

- [ ] History
- [ ] Release timeline
- [ ] Release stats
- [ ] Release migrations
- [ ] Release, namespace, and component QA
- [ ] NIEM change requests
- [ ] XSD support
- [ ] Specifications integration

**History**

- [ ] Save and load user settings and states to cache
- [ ] Update [query strings](https://router.vuejs.org/guide/essentials/passing-props.html#function-mode) on search
- [ ] Save latest navigation routes to history (add new, move existing to latest)
- [ ] Sort history by route or most recent
- [ ] Pin items in history to saved list
- [ ] Set and display pin status in menu bar

**Release timeline**

- [ ] flag to show if release data has been loaded
- [ ] Updated Models page to reuse Model component with release information
- [ ] Display release list in Model as [timeline](https://bootsnipp.com/snippets/xrKXW) of release history

**Stats**

- [ ] Release stats totals
- [ ] Release stats by namespace
- [ ] Model stat history
- [ ] Download stats spreadsheet

**Migration support**

- [ ] Show component mapping history
- [ ] Show release diffs

**QA**

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

**Specifications**

- [ ] Spec template
- [ ] Rule template
- [ ] Definition template
- [ ] Search
- [ ] Link qa to applicable rule
- [ ] Link NIEM component to applicable rules

### Backlog

**App**

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

**Miscellaneous**

- [ ] Add dependents to Namespace page
- [ ] Add prefix filter to Word cloud component

**Search**

- [ ] Type searches
- [ ] Results term filter
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
