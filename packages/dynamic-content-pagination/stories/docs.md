# Dynamic Content Pagination

This feature can be used to handle paginated content dynamically via JavaScript. It is built in order to use filters for changing the content and the pagination.
It uses the DomStateHandler feature to represent the filters.

Check out the example provided.

## Data

The feature needs a strategy to get the content dynamically. There is a JsonHtmlEndpoint strategy provided.

## Content loading

There are options to handle content loading by implementing `onLoadContent` and `onLoadedContent`.

## State Update

When a filter is changed, an update is triggered. Check the DomStateHandler feature for further information.
The pagination filter _skip_ can be reset if needed by implementing the `resetSkipState` handler.

## Pagination

In order to use the pagination buttons correctly, you need to update the _skip_ state of the buttons loading more content. For example previous/next buttons. Add functions to `paginationStateHandler` object which gets executed after the content is loaded.

You can also control the display of those buttons. Add functions to the `paginationDisplayHandler` object which gets executed after the content is loaded

## Changelog:
