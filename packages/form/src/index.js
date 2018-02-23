import { features } from '@goldinteractive/js-base'

const FEEDBACK_STATUS_SUCCESS = 0
const FEEDBACK_STATUS_WARNING = 1
const FEEDBACK_STATUS_ERROR = 2

/**
 * Form feature class.
 */
class Form extends features.Feature {

  init() {
    this.isLoading = false

    this.$form = this.$('form')
    this.$feedback = this.$('[data-feedback]')
    this.$progress = this.$('[data-progress]')

    this.$form.noValidate = true

    this.addEventListener(this.$form, 'submit', this._submitListener())
    this.addEventListener(this.$form, 'reset', this._resetListener())
  }

  fetch(action, opts) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest()
      this.currentRequest = request

      this.triggerHub('form:beforeSend', opts, request)
      this.trigger('beforeSend', opts, request)

      request.withCredentials = true
      request.open(opts.method || 'post', action)

      for (let h in opts.headers || {}) {
        if (opts.headers.hasOwnProperty(h)) {
          request.setRequestHeader(h, opts.headers[h])
        }
      }

      request.onload = resolve
      request.onerror = reject
      request.onabort = reject
      request.ontimeout = reject

      if (this.$progress && request.upload) {
        request.upload.onprogress = this._onProgress()
      }

      request.send(opts.body)
    }).then((e) => {
      this.currentRequest = null

      let request = e.target

      if (request.status >= 200 && request.status < 300) {
        return e
      } else {
        let error = new Error(request.statusText)
        error.response = e
        throw error
      }
    }).then((e) => {
      let request = e.target
      let json = JSON.parse(request.responseText)

      return { json, request }
    })
  }

  showFeedback(msg, type = FEEDBACK_STATUS_SUCCESS) {
    this.$feedback.innerHTML = msg

    switch (type) {
      case FEEDBACK_STATUS_WARNING:
        this.$feedback.classList.add(this.options.feedbackClassWarning)
        break
      case FEEDBACK_STATUS_ERROR:
        this.$feedback.classList.add(this.options.feedbackClassError)
        break
      case FEEDBACK_STATUS_SUCCESS:
      default:
        this.$feedback.classList.add(this.options.feedbackClassSuccess)
    }
  }

  resetFeedback() {
    this.$feedback.innerHTML = ''
    this.$feedback.classList.remove(this.options.feedbackClassWarning)
    this.$feedback.classList.remove(this.options.feedbackClassError)
    this.$feedback.classList.remove(this.options.feedbackClassSuccess)
  }

  resetValidation() {
    let $$formFields = this.$$(`.${this.options.formFieldClass}`)

    $$formFields.forEach(($field) => {
      let $message = $field.querySelector(`${this.options.formFieldMessageElement}.${this.options.formFieldMessageClass}`)
      $field.classList.remove(this.options.formFieldClassError)

      if ($message) {
        $message.parentNode.removeChild($message)
      }
    })
  }

  resetProgress() {
    if (!this.$progress) return
    this.$progress.classList.remove(this.options.progressClassShow)
    this.setProgress(0)
  }

  setProgress(percentage) {
    if (!this.$progress || !this.options.showProgress) return

    if (percentage === 0
        || percentage === 1 && this.options.hideProgressOnEnd
    ) {
      this.$progress.classList.remove(this.options.progressClassShow)
    } else {
      this.$progress.classList.add(this.options.progressClassShow)
    }

    percentage = percentage * 100
    let percentageRounded = Math.ceil(percentage)

    let $loaded = this.$progress.querySelector('[data-loaded]')
    let $percentage = this.$progress.querySelector('[data-percentage]')

    $loaded.style.width = `${percentageRounded}%`
    $percentage.textContent = `${percentageRounded}%`
  }

  displayFieldErrors(errors) {
    for (let name in errors) {
      if (errors.hasOwnProperty(name)) {
        let fieldErrors = this.options.getFieldErrors.call(this, name, errors)
        let $field = this.options.getErrorField.call(this, name)

        if ($field) {
          $field.classList.add(this.options.formFieldClassError)
          let $message = $field.querySelector(`${this.options.formFieldMessageElement}.${this.options.formFieldMessageClass}`)

          if (!$message) {
            $message = document.createElement(this.options.formFieldMessageElement)
            $message.classList.add(this.options.formFieldMessageClass)
            $field.appendChild($message)
          }

          $message.innerHTML = ''

          let $text = document.createElement('span')
          $text.textContent = fieldErrors[0]

          $message.appendChild($text)
        }
      }
    }
  }

  _createFormData() {
    let formData = new FormData(this.$form)
    return formData
  }

  _onProgress() {
    return (e) => {
      if (e.lengthComputable) {
        this.setProgress(e.loaded / e.total)
      }
    }
  }

  _resetListener() {
    return () => {
      if (this.currentRequest) {
        this.currentRequest.abort()
      }

      this.resetProgress()
      this.resetFeedback()
      this.resetValidation()
    }
  }

  _submitListener() {
    return (e) => {
      e.preventDefault()
      if (this.isLoading) return

      this.isLoading = true

      let formData = this._createFormData()
      let action = this.$form.getAttribute('action')
      let method = this.$form.getAttribute('method')

      this.resetProgress()
      this.resetFeedback()
      this.resetValidation()

      this.node.classList.add(this.options.classLoading)

      this.fetch(action, {
        body: formData,
        method: method
      }).then((response) => {
        this.triggerHub('form:send', response)
        this.trigger('send', response)

        this.isLoading = false
        this.node.classList.remove(this.options.classLoading)

        if (response.json.success) {
          this.triggerHub('form:sendSuccess', response)
          this.trigger('sendSuccess', response)

          this.showFeedback(response.json.message || this.options.defaultSuccessMessage)

          if (this.options.removeFormOnSuccess) {
            this.$form.parentNode.removeChild(this.$form)

            if (this.options.scroller) {
              window.setTimeout(() => {
                this.options.scroller.toElement(this.$feedback || this.node)
              }, 0)
            }
          }
        } else {
          this.triggerHub('form:sendError', response)
          this.trigger('sendError', response)

          let errors = this.options.findFieldErrors(response.json)

          if (errors) {
            this.displayFieldErrors(errors)

            if (response.json.message) {
              this.showFeedback(response.json.message, FEEDBACK_STATUS_ERROR)
            }
          } else {
            this.showFeedback(response.json.message || this.options.defaultErrorMessage, FEEDBACK_STATUS_ERROR)
          }
        }
      }).catch((err) => {
        this.isLoading = false
        this.node.classList.remove(this.options.classLoading)

        if (err.type && err.type !== 'abort') {
          this.showFeedback(this.options.defaultErrorMessage, FEEDBACK_STATUS_SUCCESS)
          throw err
        }
      })
    }
  }

}

/**
 * Default feature options.
 */
Form.defaultOptions = {
  scroller: null,
  defaultSuccessMessage: 'Nachricht wurde erfolgreich versendet!',
  defaultErrorMessage: 'Beim Senden der Nachricht ist ein Fehler aufgetreten!',
  classLoading: '-loading',
  removeFormOnSuccess: true,
  showProgress: true,
  hideProgressOnEnd: true,
  progressClassShow: '-show',
  formFieldClass: 'form-field',
  formFieldClassError: '-error',
  formFieldMessageElement: 'div',
  formFieldMessageClass: 'message',
  feedbackClassSuccess: '-success',
  feedbackClassWarning: '-warning',
  feedbackClassError: '-error',
  findFieldErrors: function(json) {
    return json.errors
  },
  getErrorField: function(name) {
    let $input = this.$form.querySelector(`[name="fields[${name}]"]`)
    if (!$input) return null
    return $input.closest(`.${this.options.formFieldClass}`)
  },
  getFieldErrors: function(name, errors) {
    return errors[name]
  }
}

export default Form
