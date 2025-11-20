type PortalRoot = HTMLElement | null;

const STORYBOOK_IFRAME_ID = 'storybook-preview-iframe';
const getStorybookIframe = (): HTMLIFrameElement | null =>
  document.getElementById(STORYBOOK_IFRAME_ID) as HTMLIFrameElement | null;

const createStorybookIframePortalRoot = (iframeDoc: Document, id: string): HTMLElement => {
  const $root = iframeDoc.createElement('div');

  $root.id = id;
  iframeDoc.body.appendChild($root);

  return $root;
};

const ensureIframePortalRoot = (id: string): PortalRoot => {
  const iframe = getStorybookIframe();
  const iframeDoc = iframe?.contentDocument;

  if (!iframeDoc) return null;

  const $root = iframeDoc.getElementById(id) as HTMLElement | null;

  if ($root) return $root;

  return createStorybookIframePortalRoot(iframeDoc, id);
};

export default ensureIframePortalRoot;
