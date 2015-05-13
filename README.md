SQL Injector is a web-based database console intended for developers.  

Installing
==========

To do
====
## In Progress
* CRUD list of connections
  * Edit name
  * Edit color
  * Delete connection

## Minimum Viable Product

* Keep console input between page loads
* Bug: empty queries cause bad juju
* Console Features
  * Key combos
    * Change Indent
    * Tab key?
  * Keep indent on newline
* Parameters
  * Auto-grow and auto-prune
* Error handling
  * SQL errors shouldn't be AJAX errors
* Raw output
* Click on result selects entire text (or copy gets the whole thing)
* A way to destroy all active connections
* Parser
  * Comments between statements?
  * isLikelyASelect()
  * Functions ($$), strings, etc.
* Cancel currently running query
* Client code: events

## Enhancements
* Preferences
  * Hide/show system schemas on schema browser
  * Set sample size on table/view information in schema browser
* Permissions (detect insert/update/delete)
* Session storage
* Max field length (preference?)
* Design logo (blocky font with syringe?)
* Syntax highlighting?
  * http://codemirror.net/
  * http://ace.c9.io/
* Sortable results
  * http://www.datatables.net/
* Schema View
  * Default values
  * Table constraints

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
