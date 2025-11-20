const getIframePortalRoot = (id: string) => {
  const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;

  const iframeDoc = iframe?.contentDocument;

  return iframeDoc?.getElementById(id) ?? null;
};

export default getIframePortalRoot;
