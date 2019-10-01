import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Icon, { IconManager } from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

import iconJson from '!file-loader!./files/icons.json'
import iconSvg from '!file-loader!./files/icons.svg'

const markup = `
<h2>Proportionally sized icon with height taken from <pre>$icons-height</pre> variable</h2>
<p>
  Lorem ipsum dolor <span data-feature="icon" data-icon="sackmesser"></span> sit amet, consetetur sadipscing elitr,
  sed diam nonumy eirmod tempor <span data-feature="icon" data-icon="company"></span> invidunt ut labore et dolore magna aliquyam erat,
  sed diam voluptua. <span data-feature="icon" data-icon="user"></span> At vero eos et accusam et justo duo dolores et ea rebum.
</p>
`

const markupEqualSize = `
<h2>Equal sized icon with sizes taken from <pre>$icons-width</pre> and <pre>$icons-height</pre> variables</h2>
<ul>
  <li><span data-feature="icon" data-icon="sackmesser" data-equal></span> Lorem ipsum dolor</li>
  <li><span data-feature="icon" data-icon="company" data-equal></span> Lorem ipsum dolor</li>
  <li><span data-feature="icon" data-icon="user" data-equal></span> Lorem ipsum dolor</li>
</ul>`

const originalSvgSize = `
<h2>Original icon with sizes taken from the original svg</h2>
<p><span data-feature="icon" data-icon="sackmesser" data-original></span></p>`

const responsiveSize = `
<h2>Responsive icon</h2>
<span data-feature="icon" data-icon="sackmesser" data-responsive></span>
`

const initIcons = () => {
  resetFeature(features, 'icon')
  var icons = new IconManager({
    svgJsonFile: iconJson,
    svgSpriteFile: iconSvg
  })

  icons.injectSprite(() => {
    icons.loadData(() => {
      features.add('icon', Icon, { manager: icons })
      features.init(document.body, 'icon')
    })
  })
}

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, initIcons)
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Equal Size', () => {
    return initializeDemo(markupEqualSize, initIcons)
  })
  .add('Original Size', () => {
    return initializeDemo(originalSvgSize, initIcons)
  })
  .add('Responsive Size', () => {
    return initializeDemo(responsiveSize, initIcons)
  })
  .add('Source JS', () => {
    return styleSource({ feature: 'icons' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'icons', language: 'sass' })
  })
