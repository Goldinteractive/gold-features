import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Map from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
.wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 55%;
  background-color: #eee;
}
</style>

<div class="wrapper">
  <div
    class="ft-map"
    data-feature="map"
    data-lat="47.387784"
    data-lng="8.493927"
    data-zoom="12">
  </div>
</div>
`

storiesOf('Map', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        if (!window.google) {
          const script = document.createElement('script')
          script.setAttribute(
            'src',
            '//maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyD_27eTKOf63j7sodMSaoY2dJ7rxl2vCSM'
          )
          document.body.appendChild(script)
        }
        initializeDemo(
          null,
          () => {
            resetFeature(features, 'map')
            features.add(
              'map',
              Map,
              object('options', {
                ...Map.defaultOptions,
                assetLocation: 'assets/features/map',
                geolocationControl: true,
                markers: [{}]
              })
            )
            features.init(document.body)
          },
          () => !!window.google
        )
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'map' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'map', language: 'sass' })
  })
