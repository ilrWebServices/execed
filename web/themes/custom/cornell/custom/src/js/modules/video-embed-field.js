CRN.videoEmbedField = ((CRN) => {
  const init = () => {
    const embedded_video = document.querySelector('.field--type-video-embed-field iframe');
      if (embedded_video) {
        embedded_video.removeAttribute('width');
        embedded_video.removeAttribute('height');
        embedded_video.removeAttribute('frameborder');
      }
    };

    return {
      init
    };

})(CRN);
