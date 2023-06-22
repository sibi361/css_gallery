const bodyElement = document.querySelector("body");
const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const viewer = document.querySelector(".viewer");
const viewerImage = document.querySelector(".viewerImage");

const IMAGE_COUNT = 50;
const IMAGES_DIRECTORY = "images/";
const IMAGES_EXTENSION = ".jpg";

function showViewer() {
    overlay.style.display = "block";
    bodyElement.style.overflow = "hidden";
    viewerImage.src = this.src;
}

function hideViewer() {
    overlay.style.display = "none";
    bodyElement.style.overflow = "visible";
}

function createImageLink(id) {
    return IMAGES_DIRECTORY + String(id) + IMAGES_EXTENSION;
}

function addImageToGallery(id) {
    const imageLink = createImageLink(id + 1);
    const image = document.createElement("img");
    image.className = "galleryImage";
    image.setAttribute("loading", "lazy");
    image.src = imageLink;
    image.addEventListener("click", showViewer);
    gallery.append(image);
}

for (let index = 0; index < IMAGE_COUNT; index++) {
    addImageToGallery(index);
}

overlay.addEventListener("click", hideViewer);

// viewer nav
const navBackward = document.querySelector(".nav-backward");
const navSpacer = document.querySelector(".nav-spacer");
const navForward = document.querySelector(".nav-forward");

function getImageIdFromLink(imgLink) {
    return Number(
        imgLink
            .replace(document.location.toString(), "")
            .replace(IMAGES_DIRECTORY, "")
            .replace(IMAGES_EXTENSION, "")
    );
}
function changeViewerImage(delta) {
    const currentImageId = getImageIdFromLink(viewerImage.src);
    let newImageId = currentImageId + delta;
    if (newImageId < 1) newImageId = IMAGE_COUNT + newImageId;
    if (newImageId > IMAGE_COUNT) newImageId -= IMAGE_COUNT;
    viewerImage.src = createImageLink(newImageId);
}

navBackward.addEventListener("click", (e) => {
    e.stopPropagation();
    changeViewerImage(-1);
});

navForward.addEventListener("click", (e) => {
    e.stopPropagation();
    changeViewerImage(1);
});

navSpacer.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key.includes("left")) changeViewerImage(-1);
    else if (key.includes("right")) changeViewerImage(1);

    if (key === "escape") hideViewer();
});
