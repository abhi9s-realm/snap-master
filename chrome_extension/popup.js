const captureBtn = document.getElementById("capture");
const resultDiv = document.getElementById("result");
const saveBtn = document.getElementById("save");
const fileNameDiv = document.getElementById("fileName");
const loader = document.getElementById("loader");
let filename = null;

captureBtn.addEventListener("click", function () {
  loader.classList.remove("hidden");  // show loader
  captureBtn.textContent = "Capturing..."; // feedback
  
  chrome.tabs.captureVisibleTab(
    null,
    { format: "png" },
    function (screenshotUrl) {
      let img = document.createElement("img");
      img.src = screenshotUrl;
      resultDiv.appendChild(img);
      saveBtn.disabled = false;
      let timestamp = new Date().toLocaleString("en-UK", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      timestamp = timestamp.toUpperCase().replace(",", " at");
      filename = `Screenshot ${timestamp}.png`;
      fileNameDiv.textContent = filename;
      captureBtn.textContent = "Capture";
      loader.classList.add("hidden"); // hide loader
    }
  );
});

saveBtn.addEventListener("click", function () {
  const screenshotImg = resultDiv.childNodes[0].src;

  chrome.runtime.sendMessage({
    action: "saveScreenshot",
    imageUrl: screenshotImg,
    filename: filename,
  });
});
