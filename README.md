SQL Injector is a web-based database console intended for developers.  
Installing
==========

To do
====
## In Progress

## Minimum Viable Product

* Reorder list of connections
* Bug: empty queries cause bad juju
* Console Features
  * Key combos
    * Change Indent
    * Tab key?
  * Keep indent on newline

## Minimum Viable Product

* Reorder list of connections
* Bug: empty queries cause bad juju
* Parameters
  * Support $1 style params
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
* Top nav bar
  * Dropdown menu for current connection
  * Preferences
  * Logout
* Edit port number for connection
* Configurable row limit
* Find memory leak when limiting rows

## Enhancements

* Support ? style params
* Preferences
  * Hide/show system schemas on schema browser
  * Set sample size on table/view information in schema browser
* Permissions (detect insert/update/delete)
* Session storage
* Max field length (preference?)
* Design logo (blocky font with syringe?)
* Sortable results
  * http://www.datatables.net/
* Schema View
  * Default values
  * Table constraints
* Admin page
  * Console for app db

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
