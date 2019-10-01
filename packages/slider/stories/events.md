# Slider - Events

The slider triggers and listens to various events. This can be useful for creating a custom Navigation. (for this to be useful, the slider must have the data-slider-identifier attribute and its slides the data-slide-label attribute. See the first quote example.)

#### Events firing

| Event    | Eventname                       | Provided values   |
| -------- | ------------------------------- | ----------------- |
| selected | `${slider-identifier}:selected` | flickity instance |

#### Events listening

| Event    | Eventname                       | Options                                                               |
| -------- | ------------------------------- | --------------------------------------------------------------------- |
| select   | `${slider-identifier}:select`   | `{ slideIdentifier: string, isWrapped: boolean, isInstant: boolean }` |
| next     | `${slider-identifier}:next`     | `{ isWrapped: boolean, isInstant: boolean }`                          |
| previous | `${slider-identifier}:previous` | `{ isWrapped: boolean, isInstant: boolean }`                          |
