SQL Injector is a web-based database console intended for developers.  

Installing
==========



TODO
====
## Minimum Viable Product
* Console Features
  * Key combos
    * Change Indent
    * Tab key?
  * Keep indent on newline
* Parameters
  * Auto-grow and auto-prune
* Error handling
  * SQL errors shouldn't be AJAX errors
* Schema browser (owner and est. row count info)
  * Table information (column definitions)
  * Show sampling of rows
* Raw output
* Cleanup backend
  * Don't generate infinite sessions
* Show rows affected on non-selects
* Browserify (development?) middleware
* Click on result selects entire text
* Keep console input between page loads
* CRUD list of connections
* A way to destroy all active connections
* Parser
  * Comments between statements?
  * isLikelyASelect()
* Non-scrolling console interface (i.e. jsfiddle)
* Cancel currently running query

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
* Progressive loading of rows when > limit
* Preconfigured database connections
* Smart syntax errors
* Query history per user (view, edit, delete)
