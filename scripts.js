const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const viewer = document.querySelector(".viewer");
const viewerImage = document.querySelector(".viewerImage");

const IMAGE_COUNT = 50;
const IMAGES_DIRECTORY = "images/";
const IMAGES_EXTENSION = ".jpg";

function showViewer() {
    overlay.style.display = "block";
    viewerImage.src = this.src;
    fixViewerWidth();
}

function hideViewer() {
    overlay.style.display = "none";
}

function fixViewerWidth() {
    // fix for the nav arrow buttons showing outside the image
    // PENDING
    console.log(viewerImage.width, viewer.offsetWidth);

    if (viewerImage.offsetWidth <= viewer.offsetWidth)
        viewer.style.width = `${viewerImage.offsetWidth}px`;
    else viewer.style.width = "90%";
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
const backward = document.querySelector(".nav-backward");
const forward = document.querySelector(".nav-forward");

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

    fixViewerWidth();
}

backward.addEventListener("click", (e) => {
    e.stopPropagation();
    changeViewerImage(-1);
});

forward.addEventListener("click", (e) => {
    e.stopPropagation();
    changeViewerImage(1);
});

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key.includes("left")) changeViewerImage(-1);
    else if (key.includes("right")) changeViewerImage(1);

    if (key === "escape") hideViewer();
});