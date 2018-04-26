---
name: Form
category: Form
---

Currently this demo works only on a local environment. A simple web service would be needed to provide demo on Github as well as on local environment.

```types.js
require(['featurify'], function(featurify) {
  featurify([{ name: 'feature-form', path: 'form/lib/main.min.js' }, 'base', 'base.features'], function(Form, base, features) {
    features.add('form', Form.default);
    features.init(document.body);
  });
});
```
```types.html
<h2>Form</h2>

<div class="ft-form" data-feature="form" data-token-endpoint="http://localhost:8888/goldform-server/backend/public/api/v1/token">

  <!-- https://jsonplaceholder.typicode.com/posts  -->
  <form action="http://localhost:8888/goldform-server/backend/public/api/v1/p/form/post/bad411d5-1da9-3ba6-ab41-aa561bcd8bc5" enctype="multipart/form-data">
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

  <div data-progress class="form-progress-bar">
    <div data-loaded class="loaded"></div>
    <div data-percentage class="percentage"></div>
  </div>

  <div data-feedback class="form-feedback"></div>

</div>
```
```types.css
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
```