import defaultSettings from "@/utils/settings";

const title = defaultSettings.title || "文本标注系统";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
