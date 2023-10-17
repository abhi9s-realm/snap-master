chrome.runtime.onMessage.addListener(function (message) {
  if (message.action == "saveScreenshot") {
    const imageUrl = message.imageUrl;
    const filename = message.filename;

    chrome.downloads.download({
      url: imageUrl,
      filename: filename,
    });
  }
});
