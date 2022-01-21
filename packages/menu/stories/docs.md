# Menu

The Menu feature controls the way a menu gets opened/closed on hover or click.

The following options can be used to customize the feature:

| Option | Type | Default | Description |
| ----------- | ----------- | ----------- | ----------- |
| triggerOnHover | Boolean | true | Open the menu on hover. If false, the menu will open on a click. |
| triggerOnHoverWhenOpen | Boolean | true | Switch between the menus via hovering, regardless of the "triggerOnHover" option. |
| closeOnTriggerClick | Boolean | false | Close the menu again when clicking on the trigger in the open state. |
| closeOnOutsideClick | Boolean | true | Close the menu when clicking anywhere outside of it. |
| activeClass | String | '-active' | The class that a menu receives whenever it gets opened. |
| closingClass | String | '-closing' | The class that a menu receives whenever it is about to close. |

Additionally, any data-attributes used by the feature can be customized via the attributes objects in the options.
