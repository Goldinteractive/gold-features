import { features } from '@goldinteractive/js-base'
import { utils } from '@goldinteractive/js-base'
import GeolocationControl from './controls/geolocation'

var cachedStyles = {}
var cachedIcons = {}

class Map extends features.Feature {

  init() {
    const mapOptions = Object.assign({}, Map.defaultMapOptions, this.options.mapOptions)
    this.mapOptions = mapOptions;

    this.isResizing = false
    this.isDraging = false

    this.markers = []
    this.currentMarker = null

    this.initialZoom = parseInt(this.node.getAttribute('data-zoom'), 10) || mapOptions.zoom
    this.initialCenter = {
      lat: parseFloat(this.node.getAttribute('data-lat')),
      lng: parseFloat(this.node.getAttribute('data-lng'))
    }

    this.center = this.initialCenter
    this.bounds = new google.maps.LatLngBounds()
    this.infoWindow = new google.maps.InfoWindow()

    mapOptions.zoom = this.initialZoom
    mapOptions.center = this.initialCenter

    var style = cachedStyles[this.options.theme] || null

    if (!mapOptions.styles) {
      if (!style) {
        utils.fetch
        .json(`${this.options.assetLocation}/styles/${this.options.theme}.json`)
        .then((json) => {
          // cache style
          cachedStyles[this.options.theme] = json
          // take styles for map and load it
          mapOptions.styles = json
          this._loadMap()
        }).catch((ex) => {
          console.error(`Loading map with theme "${this.options.theme}" failed`, ex)
        })
      } else {
        mapOptions.styles = style
      }
    } else {
      this._loadMap()
    }
  }

  destroy() {
    this.node.innerHTML = ''
    google.maps.event.clearInstanceListeners(this.map)
    this.map = null

    super.destroy()
  }

  _loadMap() {
    // create a map object and specify the DOM element for display.
    this.map = new google.maps.Map(this.node, this.mapOptions)

    if (this.options.geolocationControl) {
      this.geolocationControl = new GeolocationControl(this.map, null, (success, position, error) => {
        if (success) {
          this.map.setCenter(position)
          if (this.options.geolocationControlZoom) {
            this.map.setZoom(this.options.geolocationControlZoom)
          }
        } else {
          error = error.message || error
          if (error != null) {
            console.error(`Failed to detect user location: ${error}`)
          } else {
            console.error('Failed to detect user location')
          }
        }
      })
    }

    this.listenerFirstIdle = google.maps.event.addDomListenerOnce(this.map, 'idle', this._firstIdleListener())
    this.listenerIdle = google.maps.event.addDomListener(this.map, 'idle', this._idleListener())

    this.options.markers.forEach((marker) => {
      this.addMarker(marker)
    })

    this.options.boundMarkers.forEach((marker) => {
      this.addBoundMarker(marker)
    })

    this.listenerZoomChanged = google.maps.event.addDomListener(this.map, 'zoom_changed', this._zoomChangedListener())
    this.listenerDragstart = google.maps.event.addDomListener(this.map, 'dragstart', this._dragstartListener())
    this.listenerDragend = google.maps.event.addDomListener(this.map, 'dragend', this._dragendListener())
    this.listenerResize = this.addEventListener(window, 'resize', this._resizeListener())

    this.trigger('loaded')
  }


  /**
   * Adds a marker to the map with a optional info window.
   *
   * @param   {Object} options - The marker options.
   * @returns {Promise} Resolves when marker has loaded.
   */
  addMarker(options = {}) {
    var cachedIcon
    var markerOptions
    var iconUrl

    // extend Google API marker options
    markerOptions = Object.assign({}, Map.defaultMarkerOptions.markerOptions, options.markerOptions || {})

    // extend marker options
    options = Object.assign({}, Map.defaultMarkerOptions, options)

    // set map the marker belongs to
    markerOptions.map = this.map

    // set position to map center position if no position given
    markerOptions.position = markerOptions.position || this.initialCenter

    // set full icon url
    iconUrl = `${this.options.assetLocation}/pins/${options.pin}.png`

    cachedIcon = cachedIcons[iconUrl] || null

    if (cachedIcon) {
      markerOptions.anchorPoint = cachedIcon.anchorPoint
      markerOptions.icon = cachedIcon.icon

      return new Promise((resolve, reject) => {
        var marker = this._loadMarker(markerOptions, options)
        resolve(marker)
      })
    }

    return new Promise((resolve, reject) => {
      var image = new Image()

      image.onload = () => {
        var markerWidth = image.naturalWidth
        var markerHeight = image.naturalHeight
        var markerWidthScaled = markerWidth * options.scaleIcon
        var markerHeightScaled = markerHeight * options.scaleIcon

        markerOptions.anchorPoint = new google.maps.Point(0, markerHeightScaled / -1)

        markerOptions.icon = {}
        markerOptions.icon.url = iconUrl
        markerOptions.icon.size = new google.maps.Size(markerWidthScaled, markerHeightScaled)
        markerOptions.icon.scaledSize = new google.maps.Size(markerWidthScaled, markerHeightScaled)
        markerOptions.icon.anchor = new google.maps.Point(markerWidthScaled / 2, markerHeightScaled)
        markerOptions.icon.origin = new google.maps.Point(0, 0)

        // cache icon data
        cachedIcons[iconUrl] = {
          anchorPoint: markerOptions.anchorPoint,
          icon: markerOptions.icon
        }

        var marker = this._loadMarker(markerOptions, options)
        resolve(marker)
      }

      image.src = iconUrl
    })
  }

  /**
   * Adds a marker to the map with its position as boundary.
   *
   * @param   {Object} options - The marker options.
   * @returns {Promise} Resolves when marker has loaded.
   */
  addBoundMarker(options = {}) {
    var markerPromise = this.addMarker(options)
    return markerPromise.then((marker) => {
      this.addBound(marker.position)
    })
  }

  _loadMarker(markerOptions, options) {
    var marker = new google.maps.Marker(markerOptions)

    if (options.content) {
      google.maps.event.addListener(
        marker, 'click', this._markerClickListener(marker, options.content, options.panTo, options.open)
      )
    }

    this.markers.push(marker)
    return marker
  }

  /**
   * Adds a new boundary.
   * @param {Object} position - The boundary position.
   */
  addBound(position) {
    // extend bounds with new marker position
    this.bounds.extend(position)
    // fit map according to current bounds
    this.map.fitBounds(this.bounds)
    // update center position
    this.updateCenter()
  }

  resize() {
    // trigger resize
    google.maps.event.trigger(this.map, 'resize')

    if (this.options.responsive && !this.options.resetOnResize) {
      // preserve the current center point
      this.map.setCenter(this.center)
    }

    if (this.options.resetOnResize) {
      this.resetCenter(true)
      this.resetZoom()
    }

    this.isResizing = false
    this.trigger('resized')
  }

  updateCenter() {
    this.center = this.map.getCenter()
  }

  setInitialCenter(pos) {
    this.map.setCenter(pos)
    this.initialCenter = pos
  }

  setInitialZoom(zoom) {
    this.map.setZoom(zoom)
    this.initialZoom = zoom
  }

  zoomIn() {
    this.map.setZoom(++this.map.zoom)
  }

  zoomOut() {
    this.map.setZoom(--this.map.zoom)
  }

  resetCenter(pan = false) {
    if (pan) {
      this.map.panTo(this.initialCenter)
    } else {
      this.map.setCenter(this.initialCenter)
    }
  }

  resetZoom() {
    this.map.setZoom(this.initialZoom)
  }

  _firstIdleListener() {
    return () => {
      this.trigger('firstIdle')
    }
  }

  _markerClickListener(marker, content, pan, open) {
    if (open) {
      this.one('firstIdle', () => {
        this.currentMarker = marker
        this.infoWindow.setContent(content)
        this.infoWindow.open(this.map, marker)
      })
    }

    return () => {
      if (this.currentMarker != marker) {
        this.currentMarker = marker
        this.infoWindow.setContent(content)
        this.infoWindow.open(this.map, marker)
      } else {
        this.currentMarker = null
        this.infoWindow.close()
      }

      if (pan) {
        var pos = marker.getPosition()
        this.map.panTo(pos)
        this.center = pos
      }
    }
  }

  _idleListener() {
    return (e) => {
      if (!this.draging) {
        this.updateCenter()
      }

      this.trigger('idle')
    }
  }

  _zoomChangedListener() {
    return (e) => {
      this.trigger('zoomChanged')
    }
  }

  _dragstartListener() {
    return (e) => {
      this.isDraging = true
      this.trigger('dragstart')
    }
  }

  _dragendListener() {
    return (e) => {
      this.isDraging = false
      this.trigger('dragend')
    }
  }

  _resizeListener() {
    return (e) => {
      if (!this.isResizing) {
        this.isResizing = true
        requestAnimationFrame(this.resize.bind(this))
      }
    }
  }
}

/**
 * Google Map API options for map instance.
 */
Map.defaultMapOptions = {
  zoom: 12,
  disableDefaultUI: true,
  scrollwheel: false,
  zoomControl: true,
  mapTypeControl: false
}

/**
 * Default feature options.
 *
 * @type {Object}
 * @property {String} theme='default'
 *   Style theme used for map.
 * @property {Boolean} responsive=false
 *   Recenters map on resize.
 * @property {Boolean} resetOnResize=false
 *   Resets map to initial zoom and center on resize.
 * @property {Boolean} geolocationControl=false
 *   Adds a geolocation control.
 * @property {Number|null} geolocationControlZoom=null
 *   Zoom applied after geolocation click.
 * @property {Object} mapOptions
 *   Map.MapOptions
 */
Map.defaultOptions = {
  theme: 'default',
  assetLocation: `assets/features/map`,
  markers: [],
  boundMarkers: [],
  responsive: true,
  resetOnResize: false,
  geolocationControl: false,
  geolocationControlZoom: null,
  mapOptions: Object.assign({}, Map.defaultMapOptions)
}

Map.defaultMarkerOptions = {
  open: false,
  content: null,
  panTo: false,
  scaleIcon: 0.5,
  pin: 'default',
  markerOptions: {
    draggable: false
  }
}

export default Map
