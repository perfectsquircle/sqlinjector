SQL Injector is a web-based database console intended for developers.  
Installing
==========

To do
====
## In Progress

* Results
  * Click on result selects entire text (or copy gets the whole thing)
  * Sticky header when scrolling results

## Minimum Viable Product

* A way to destroy all active connections
* Parser
  * Comments between statements?
  * isLikelyASelect()
  * Functions ($$), strings, etc.
* Cancel currently running query
  * Only run 1 query at a time
* Client code: events
* Top nav bar
  * Dropdown menu for current connection
  * Preferences
  * Logout
* Edit port number for connection
* Configurable row limit
  * Only render first n rows?
  * Paging?
* Find memory leak when limiting rows

## Enhancements

* Parameters
  * Support ? style params
* Preferences
  * Hide/show system schemas on schema browser
  * Set sample size on table/view information in schema browser
* Permissions (detect insert/update/delete)
* Session storage
* Max field length (preference?)
  * Truncate column width for display, provide full content on copy
* Design logo (blocky font with syringe?)
* Sortable results
  * http://www.datatables.net/
* Schema View
  * Default values
  * Table constraints
  * Fancier tooltips on column constraint icons
* Admin page
  * Console for app db
* Raw output

## Wishlist  
* Easily see all databases on a server (like pgadmin)
* Auto-limit
* Long running queries
  * Queue
  * Notify when done
* Plugins
* Canned Reports
  * Export to csv
  * Export to HTML (like pgadmin)
* Administration
* Easy install
  * [cli](https://github.com/rlidwka/sinopia/blob/master/lib/cli.js)
  * home folder
  * db migration
* Progressive loading of rows when > limit
* Preconfigured database connections
* Smart syntax errors
* Query history per user (view, edit, delete)
