const IMAGE_COUNT = 50;
const IMAGES_DIRECTORY = "images/";
const IMAGES_EXTENSION = ".jpg";

const bodyElement = document.querySelector("body");
const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const viewer = document.querySelector(".viewer");
const viewerImage = document.querySelector(".viewerImage");
const navElement = document.querySelector(".nav");

function showViewer() {
    overlay.style.display = "block";
    bodyElement.style.overflow = "hidden";

    viewerImage.src = this.src;
    this.classList.add("viewing");
}

function hideViewer() {
    overlay.style.display = "none";
    bodyElement.style.overflow = "visible";

    const lastImage = document.querySelector(".viewing");
    lastImage.classList.remove("viewing");
}

function addImageToGallery(imageLink) {
    const image = document.createElement("img");
    image.className = "galleryImage";
    image.setAttribute("loading", "lazy");
    image.src = imageLink;
    image.addEventListener("click", showViewer);
    gallery.append(image);
}

// adding sample images to gallery
for (let index = 1; index <= IMAGE_COUNT; index++) {
    const sampleImageLink = `${IMAGES_DIRECTORY}${String(
        index
    )}${IMAGES_EXTENSION}`;
    addImageToGallery(sampleImageLink);
}

// viewer nav
const navBackward = document.querySelector(".nav-backward");
const navSpacer = document.querySelector(".nav-spacer");
const navForward = document.querySelector(".nav-forward");

function changeViewerImage(delta) {
    const currentImage = document.querySelector(".viewing");
    if (delta === -1 || delta === 1) {
        let nextImage;
        if (delta === -1) {
            nextImage = currentImage.previousElementSibling;
            if (nextImage === null || nextImage === undefined)
                nextImage = currentImage.parentNode.lastChild;
            viewerImage.src = nextImage.src;
        } else if (delta === 1) {
            nextImage = currentImage.nextElementSibling;
            if (nextImage === null || nextImage === undefined)
                nextImage = currentImage.parentNode.firstChild;
        }
        viewerImage.src = nextImage.src;
        currentImage.classList.remove("viewing");
        nextImage.classList.add("viewing");
    }
}

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key.includes("left")) changeViewerImage(-1);
    else if (key.includes("right")) changeViewerImage(1);

    if (key === "escape") hideViewer();
});

navBackward.addEventListener("click", () => changeViewerImage(-1));

navForward.addEventListener("click", () => changeViewerImage(1));

overlay.addEventListener("click", hideViewer);

// masks the above listener just in case the user
// clicks on the viewer image
navElement.addEventListener("click", (e) => e.stopPropagation());
