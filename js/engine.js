function supports_html5_storage() {
  try {
    console.log('localStorage' in window && window['localStorage'] !== null);
} catch (e) {
    console.log('no storage');
  }
}