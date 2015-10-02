SQL Injector is a web-based database console intended for developers.  

Installing
==========

    npm install -g sqlinjector
    npm install -g forever
    

Updating
========

    npm update -g sqlinjector

Running
=======

    export NODE_ENV=production
    export SQLINJECTOR_HOME=/some/good/dir
    forever app.js

To do
=====
## In Progress

* Results
  * Click on result selects entire text (or copy gets the whole thing)
  * Sticky header when scrolling results

## Minimum Viable Product

* Parser
  * Comments between statements
  * Functions ($$), strings, etc.
* Cancel currently running query
* Edit port number for connection

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
  * Paging
* Schema View
  * Default values
  * Table constraints
  * Fancier tooltips on column constraint icons
* Admin page
  * Console for app db
  * Destroy all active connections
* Raw output
* Top nav bar
  * Preferences
* Client code: events

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
