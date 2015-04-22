SQL Injector is a web-based database console intended for developers.  

Installing
==========

To do
====
## In Progress
* Schema browser (owner and est. row count info)
  * View definition
  * Function definition

## Minimum Viable Product

* Show rows affected on non-selects
* Keep console input between page loads
* Bug: empty queries cause bad juju
* CRUD list of connections
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
