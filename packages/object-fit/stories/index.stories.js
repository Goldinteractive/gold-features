import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import ObjectFit from '../src/index'
import '../src/style.scss'

import docs from './docs.md'
import sampleJpeg from './files/sample.jpeg'
import bigBuckBunnyMp4 from './files/big_buck_bunny.mp4'

const markup = `
<style>
.wrapper {
  position: relative;
  float: left;
  margin-right: 30px;
  margin-bottom: 30px;
  width: 460px;
  height: 200px;
  background-color: #eee;
}
.wrapper > .info {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  padding: 15px 20px;
  background-color: rgba(0,0,0,0.45);
  color: #fff;
  transObjectFit: translate(-50%,-50%);
  will-change: opacity;
  backface-visibility: hidden;
}
</style>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide">
    <img src="${sampleJpeg}" data-feature="fit">
  </div>

  <span class="info">Cover</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide">
    <img src="${sampleJpeg}" data-feature="fit" data-object-position="right bottom">
  </div>

  <span class="info">Cover (right/bottom)</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -contain">
    <img src="${sampleJpeg}" data-feature="fit">
  </div>

  <span class="info">Contain</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -fill">
    <img src="${sampleJpeg}" data-feature="fit">
  </div>

  <span class="info">Fill</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -video">
    <video autoplay muted playsinline loop data-feature="fit">
      <source src="${bigBuckBunnyMp4}" type="video/mp4">
    </video>
  </div>

  <span class="info">Video Cover</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -video">
    <video autoplay muted playsinline loop data-feature="fit" data-object-position="right bottom">
      <source src="${bigBuckBunnyMp4}" type="video/mp4">
    </video>
  </div>

  <span class="info">Video Cover (right/bottom)</span>
</div>

<div class="wrapper">

  <div class="ft-fit-bg -initial-hide -video -contain">
    <video autoplay muted playsinline loop data-feature="fit">
      <source src="${bigBuckBunnyMp4}" type="video/mp4">
    </video>
  </div>

  <span class="info">Video Contain</span>
</div>
`

storiesOf('ObjectFit', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'fit')
        features.add(
          'fit',
          ObjectFit,
          object('options', ObjectFit.defaultOptions)
        )
        features.init(document.body)
      })
    },
    {
      notes: {
        markdown: docs
      }
    }
  )
  .add('Source JS', () => {
    return styleSource({ feature: 'object-fit' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'object-fit', language: 'sass' })
  })
