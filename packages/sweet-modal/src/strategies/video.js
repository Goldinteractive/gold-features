class Video {
  constructor() {}

  getData = (callback, modalIdentifier, node) => {
    const url = node.dataset.videoUrl
    if(!url){
      throw new Error(
        `Video strategy needs a videoUrl attribute on the node`
      )
    }
    let $iframe  = document.createElement("iframe");
    $iframe.src = url
    $iframe.classList.add('iframe')
    callback($iframe.outerHTML)
  }
}

Video.defaultOptions = {}

export default Video
