SQL Injector is a web-based database console intended for developers.  

Installing
==========



TODO
====
## Minimum Viable Product
* Parameters
  * Auto-grow and auto-prune
* Error handling
* Ask before leaving page
* Schema browser (owner and est. row count info)
  * Table information (column definitions)
* Raw output
* Max field length (preference?)
* Design logo (blocky font with syringe?)
* Cleanup backend
  * Don't generate infinite sessions
* Front-end infrastructure
* Hard limit on rows?
* Key combinations
* Session storage
* Show rows affected on non-selects
* SQL errors shouldn't be AJAX errors


## Enhancements
* Preconfigured database connections
* Query timer
* Smart syntax errors
* Query history per user (view, edit, delete)
* Permissions (detect insert/update/delete)
* Canned Reports
  * Export to csv
  * Export to HTML (like pgadmin)
* Administration
* Easy install 
  * [cli](https://github.com/rlidwka/sinopia/blob/master/lib/cli.js)
* Non-scrolling console interface (i.e. jsfiddle)

## Wishlist  
* Easily see all databases on a server (like pgadmin)
* Double-post protection / CSRF protection
* Auto-limit
* Sortable results
  * http://www.datatables.net/
* Long running queries
  * Queue 
  * Notify when done
* Syntax highlighting?
  * http://codemirror.net/
  * http://ace.c9.io/
* Plugins

