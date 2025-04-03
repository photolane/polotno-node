import React from 'react';
import ReactDOM from 'react-dom/client';
import { WorkspaceCanvas } from 'polotno/canvas/workspace-canvas';
import { createStore } from 'polotno/model/store';
import { toggleFadeInAnimation } from 'polotno/canvas/use-fadein';
// instead of importing fom config, let's import from direct files
// to avoid blueprint import
import { setTextOverflow as unstable_setTextOverflow } from 'polotno/utils/flags';
import { useHtmlTextRender as unstable_useHtmlTextRender } from 'polotno/utils/flags';
import { onLoadError } from 'polotno/utils/loader';
import { setTextVerticalResizeEnabled as unstable_setTextVerticalResizeEnabled } from 'polotno/utils/flags';
import { setAssetLoadTimeout, setFontLoadTimeout } from 'polotno/utils/loader';
import { addGlobalFont } from 'polotno/utils/fonts';
import { setTextSplitAllowed as unstable_setTextSplitAllowed } from 'polotno/utils/flags';

import { jsPDF } from 'jspdf';

// bundle jspdf into window object
// so client will not need to load it from CDN
window.jspdf = { jsPDF };

toggleFadeInAnimation(false);
unstable_setTextOverflow('change-font-size');

const key = new URLSearchParams(location.search).get('key');

const store = createStore({
  key: key,
});

window.store = store;
window.config = {
  addGlobalFont,
  unstable_useHtmlTextRender,
  unstable_setTextVerticalResizeEnabled,
  unstable_setTextOverflow,
  onLoadError,
  setAssetLoadTimeout,
  setFontLoadTimeout,
  unstable_setTextSplitAllowed,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(WorkspaceCanvas, {
    // making only offset is not enough, as it allows scroll and may produce some unexpected change of active page
    visiblePagesOffset: 0,
    // render only active page will do a TRUE force render of active page
    renderOnlyActivePage: true,
    store,
    components: { PageControls: () => null, Tooltip: () => null },
  })
);
