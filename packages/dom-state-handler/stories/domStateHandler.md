# DomStateHandler

Maps dom states to a serializable format and persists them in the URL.

As of Version 1.0.1 it is also possible to restore the state from the URL.
Pass the `restorePersisted: true` option to the domState constructor to do so.

Since Version 1.3.0 it is possible to save the mapped states to the localStorage.

Since Version 1.4.0 it is possible to map the states to URL fragments for pre-rendered content without talking to the server (as opposed to queries which evoke an AJAX call).

This feature can be used for:
- Filters
