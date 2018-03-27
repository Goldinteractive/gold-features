export default class GeolocationControl {

  constructor(map, position = null, callback = null) {
    if (!navigator.geolocation) return

    position = position || google.maps.ControlPosition.RIGHT_BOTTOM

    this.userLocation = this.getSavedUserLocation()
    this.map = map

    this.$icon = document.createElement('div')
    this.$icon.className = 'geolocation-control-icon'

    this.$element = document.createElement('div')
    this.$element.className = 'geolocation-control'
    this.$element.classList.toggle('-active', !!this.userLocation)

    this.$element.appendChild(this.$icon)

    google.maps.event.addDomListener(this.$element, 'click', (e) => {
      e.preventDefault()
      this.$element.classList.add('-pending')

      this.getUserLocation((success, position, error) => {
        this.$element.classList.remove('-pending')

        if (success) {
          this.$element.classList.add('-active')
        }

        if (callback) {
          callback(success, position, error)
        }
      })
    }, false)

    this.map.controls[position].push(this.$element)
  }

  hide() {
    this.$element.style.display = 'none'
  }

  show() {
    this.$element.style.display = 'block'
  }

  getSavedUserLocation() {
    var location = window.sessionStorage.getItem('gmap-user-location')
    if (!location) return null

    var position = location.split(',')

    return new google.maps.LatLng(
      parseFloat(position[0]),
      parseFloat(position[1])
    )
  }

  getUserLocation(cb) {
    if (this.userLocation) {
      cb(true, this.userLocation, null)
      return true
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((geolocation) => {
        let position = new google.maps.LatLng(
          geolocation.coords.latitude, geolocation.coords.longitude
        )

        this.userLocation = position

        window.sessionStorage.setItem(
          'gmap-user-location', position.lat() +','+ position.lng()
        )

        cb(true, position)
      }, (err) => {
        cb(false, null, err)
      })
    } else {
      cb(false, null, `Browser doesn't support geocoding`)
    }
  }

}
