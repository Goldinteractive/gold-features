import { storiesOf } from '@storybook/html'
import { withKnobs, object } from '@storybook/addon-knobs'
import {
  initializeDemo,
  styleSource,
  resetFeature
} from '../../../helpers/story'

import { features, eventHub } from '@goldinteractive/js-base'

import Form from '../src/index'
import '../src/style.scss'

import docs from './docs.md'

const markup = `
<style>
input, textarea {
  width: 100%;
  font-size: 100%;
  border: 1px solid #999;
  padding: 4px;
}

input[type="radio"],
input[type="checkbox"] {
  width: auto;
  padding: 0;
}

.form-field {
  margin-bottom: 20px;
}

.form-feedback {
  padding: 20px;
}

.form-feedback.-success {
  background-color: rgb(124, 209, 124);
  color: rgb(15, 110, 15);
}

.form-feedback.-error {
  background-color: rgb(255, 187, 187);
  color: rgb(133, 2, 2);
}

.form-feedback.-warn {
  background-color: rgb(243, 196, 125);
  color: rgb(206, 124, 1);
}

.form-progress-bar {
  position: relative;
  height: 30px;
  width: 100%;
  background-color: #eee;


}

.form-progress-bar > .loaded {
    width: 0%;
    height: 100%;
    background-color: #999;
    transition: width .1s ease-in;
}

.form-progress-bar > .percentage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
}
</style>

<div class="ft-form" data-feature="form">

  <!--
    Optional argument on data-feature="form" container:
    \`data-token-endpoint="http://localhost:8888/goldform-server/backend/public/api/v1/\`
  -->
  <form action="http://localhost:8888/goldform-server/backend/public/api/v1/p/form/post/bad411d5-1da9-3ba6-ab41-aa561bcd8bc5" enctype="multipart/form-data">
    <!-- Language input: this is required! -->
    <input type="hidden" name="language" value="en">
    <div class="form-field">
        <label for="email">E-Mail</label>
        <input type="email" name="fields[email]" id="email" placeholder="Test">
    </div>

    <!--
    These are currently not in use:
    <div class="form-field">
        <label for="message">Message</label>
        <textarea placeholder="Test" name="fields[message]" id="message"></textarea>
    </div>

    <div class="form-field">
      <label for="file">File</label>
      <input type="file" name="fields[file]" name="file" id="file">
    </div>

    <div class="form-field">
      <label class="control -radio -with-text">
        <input id="radio1" name="fields[radio]" type="radio">
        <span class="control-indicator"></span>
        Radio 1
      </label>

      <label class="control -radio -with-text">
        <input id="radio2" name="fields[radio]" type="radio">
        <span class="control-indicator"></span>
        Radio 2
      </label>
    </div>

    <div class="form-field">
      <label class="control -checkbox -with-text">
        <input type="checkbox" name="fields[checkbox]">
        <span class="control-indicator"></span>
        Checkbox
      </label>
    </div>

    -->

    <button role="submit" class="button -primary -small -auto">Send</button>
    <button role="button" class="button -auto" type="reset">Reset</button>
  </form>

  <!-- Progress Indicator - e.g. for file upload -->
  <div data-progress class="form-progress-bar">
    <div data-loaded class="loaded"></div>
    <div data-percentage class="percentage"></div>
  </div>

  <!-- Form Feedback (error / success), make sure that this div is outside of the form tag -->
  <div data-feedback class="form-feedback"></div>

</div>
`

storiesOf('Form', module)
  .addDecorator(withKnobs)
  .add(
    'Intro',
    () => {
      return initializeDemo(markup, () => {
        resetFeature(features, 'form')
        features.add('form', Form, object('options', Form.defaultOptions))
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
    return styleSource({ feature: 'form' })
  })
  .add('Source CSS', () => {
    return styleSource({ feature: 'form', language: 'sass' })
  })
