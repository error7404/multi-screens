const oldFrame = document.getElementById('old');
const newFrame = document.getElementById('new');
const syncToggle = document.getElementById('sync-toggle');
const refreshButton = document.getElementById('refresh-button');
const fakeMouse = document.getElementById('fake-mouse');

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const oldDefault = params.get('old') || 'https://app.tickntrip.com'
const newDefault = params.get('new') || 'https://tickntrip-preprod.amiltone.com'

// Set iframe sources from parameters
oldFrame.src = oldDefault;
newFrame.src = newDefault;

let isSyncEnabled = true;
let oldRect, newRect;

// Store references to cleanup later
let mouseMoveListener = null;
let clickListener = null;
let scrollListener = null;

// Function to recalculate iframe positions
const recalculatePositions = () => {
    oldRect = oldFrame.getBoundingClientRect();
    newRect = newFrame.getBoundingClientRect();
};

// Function to setup event listeners
const setupListeners = () => {
    // Remove existing listeners if they exist
    if (mouseMoveListener) {
        oldFrame.contentWindow.removeEventListener('mousemove', mouseMoveListener);
    }
    if (clickListener) {
        oldFrame.contentWindow.removeEventListener('click', clickListener);
    }
    if (scrollListener) {
        oldFrame.contentWindow.removeEventListener('scroll', scrollListener);
    }

    // Define new listeners
    mouseMoveListener = (e) => {
        if (!isSyncEnabled) return;
        const x = e.clientX - oldRect.left;
        const y = e.clientY - oldRect.top;

        const newDoc = newFrame.contentDocument;
        const element = newDoc.elementFromPoint(x, y);
        if (element) {
            element.dispatchEvent(new MouseEvent('mousemove', { clientX: x, clientY: y }));
        }

        const newX = newRect.left + x;
        const newY = newRect.top + y;
        fakeMouse.style.left = `${newX}px`;
        fakeMouse.style.top = `${newY}px`;
        fakeMouse.style.display = 'block';
    };

    clickListener = (e) => {
        if (!isSyncEnabled) return;
        const x = e.clientX - oldRect.left;
        const y = e.clientY - oldRect.top;
        const newDoc = newFrame.contentDocument;
        const element = newDoc.elementFromPoint(x, y);

        if (element) {
            const event = document.createEvent("MouseEvent");
            event.initMouseEvent("click", true, true, window, null, x, y, 0, 0, false, false, false, false, 0, null);
            element.dispatchEvent(event);
        }
    };

    scrollListener = (e) => {
        if (!isSyncEnabled) return;
        newFrame.contentWindow.scrollTo(
            oldFrame.contentWindow.scrollX,
            oldFrame.contentWindow.scrollY
        );
    };

    // Add new listeners
    oldFrame.contentWindow.addEventListener('mousemove', mouseMoveListener);
    oldFrame.contentWindow.addEventListener('click', clickListener, true);
    oldFrame.contentWindow.addEventListener('scroll', scrollListener);
    oldFrame.contentWindow.addEventListener('visibilitychange', () => setTimeout(() => init(), 0));
};

// Function to initialize
const init = () => {
    recalculatePositions();
    setupListeners();
};

// Handle refresh
const refreshIframes = () => {
    fakeMouse.style.display = 'none';
    // Get the current URLs of the iframes
    const oldUrl = oldFrame.contentWindow.location.href;
    const newUrl = newFrame.contentWindow.location.href;

    // Reload both iframes to their current URLs
    oldFrame.src = "";
    newFrame.src = "";
    oldFrame.src = oldUrl === "about:blank" ? oldDefault : oldUrl;
    newFrame.src = newUrl === "about:blank" ? newDefault : newUrl;

    // Reinitialize after reload
    let reloadCount = 0;
    const handleReload = () => {
        if (++reloadCount === 2) {
            fakeMouse.style.display = isSyncEnabled ? 'block' : 'none';
        }
    };

    oldFrame.onload = handleReload;
    newFrame.onload = handleReload;
};

// Initial load handlers
let initialLoadCount = 0;
const handleInitialLoad = () => {
    if (++initialLoadCount === 2) init();
};

oldFrame.onload = handleInitialLoad;
newFrame.onload = handleInitialLoad;

document.addEventListener('resize', recalculatePositions);
refreshButton.addEventListener('click', refreshIframes);
syncToggle.addEventListener('click', () => {
    isSyncEnabled = !isSyncEnabled;
    syncToggle.textContent = isSyncEnabled ? 'Sync: On' : 'Sync: Off';
    fakeMouse.style.display = isSyncEnabled ? 'block' : 'none';
});