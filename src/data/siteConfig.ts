import projectConfig from "../../config.json";

const LOCAL_API_BASE = projectConfig.api.localBase;
const LIVE_API_BASE = projectConfig.api.liveBase;
const LOCAL_FILES_BASE = projectConfig.files.localBase;
const LIVE_FILES_BASE = projectConfig.files.liveBase;
const LOCAL_GUEST_WIDGET_BASE = projectConfig.guestWidget.localBase;
const LIVE_GUEST_WIDGET_BASE = projectConfig.guestWidget.liveBase;
const GUEST_WIDGET_ORGANIZATION_ID = projectConfig.guestWidget.organizationId;

function isLocalhostHost(hostname: string) {
  return projectConfig.localHostnames.includes(hostname);
}

function getBrowserHostname() {
  if (typeof window === `undefined`) return ``;
  return window.location.hostname;
}

const browserHostname = getBrowserHostname();
const defaultApiBase = isLocalhostHost(browserHostname) ? LOCAL_API_BASE : LIVE_API_BASE;
const defaultFilesBase = isLocalhostHost(browserHostname)
  ? LOCAL_FILES_BASE
  : LIVE_FILES_BASE;
const defaultGuestWidgetBase = isLocalhostHost(browserHostname)
  ? LOCAL_GUEST_WIDGET_BASE
  : LIVE_GUEST_WIDGET_BASE;

export const API_BASE = import.meta.env.VITE_API_BASE || defaultApiBase;
export const FILES_BASE = import.meta.env.VITE_FILES_BASE || defaultFilesBase;
export const GUEST_WIDGET_BASE =
  import.meta.env.VITE_GUEST_WIDGET_BASE || defaultGuestWidgetBase;
export const GUEST_WIDGET_URL =
  `${GUEST_WIDGET_BASE}/?organizationId=${encodeURIComponent(GUEST_WIDGET_ORGANIZATION_ID)}`;

export function resolveFileUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${FILES_BASE}/${pathOrUrl.replace(/^\/+/, ``)}`;
}
