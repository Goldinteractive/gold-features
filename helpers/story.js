import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-sass.min.js'

export const initializeDemo = (
  markup,
  handle,
  initTest = () => document.body.querySelector('#root').innerHTML !== ''
) => {
  const checkDom = () => {
    if (initTest()) {
      handle()
    } else {
      setTimeout(checkDom)
    }
  }

  setTimeout(checkDom)

  return markup
}

export const resetFeature = (features, name) => {
  delete features.features[name]
}

export const styleSource = ({ feature, language = 'js' }) => {
  let code =
    language === 'js'
      ? require(`!raw-loader!../packages/${feature}/src/index`)
      : require(`!raw-loader!../packages/${feature}/src/style.scss`)

  return initializeDemo(
    `<pre><code class="language-${language}">${code.default}</code></pre>`,
    () => {
      Prism.highlightAll()
    }
  )
}
