# Accordion

Accordion is based on Handorgel

## EventHub

As of version 1.0.1 the Accordion supports eventHub integration.

If the node instance has a data-accordion-identifier attribute, it listens to eventHub events and emits the accordion events to the eventHub.

### Steer accordion via EventHub-Events

Methods available via eventHub: `open`, `close`, `toggle`.

For example: `accordion:ACCORDION_IDENTIFIER:open` with an options object including a foldId: `{ foldId: 'string' }`

The `foldId` must match the folds header `data-fold-id` attribute by default. But the selector can be changed via the `findFoldById` option. For more advanced customization, consider extending the class.

### Listen for Accordion-Events via EventHub

To listen to Accordion-Events from Eventhub the following events are forwarded by default:
`['fold:open','fold:opened','fold:close','fold:closed','fold:focus','fold:blur']`

This list can be modified via the `watchedAccordionEvents` option.

Their event-names are generated in the form of `accordion:ACCORDION_IDENTIFIER:eventTriggered:EVENT` but can be overwritten via the `createEventName` option.

Parameters from the `Handorgel` events are passed in to your listener as an array in the `params` property.
