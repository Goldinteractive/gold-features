import { configure, addParameters } from '@storybook/html'
import theme from './goldTheme'

addParameters({
  options: {
    theme
  }
})

const req = require.context('../packages', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
