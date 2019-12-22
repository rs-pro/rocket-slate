import en from "./en";
import ru from "./ru";

const locale = window.locale || "en";

const messages = {en: en, ru: ru}

export { messages, locale }
export function t(key) {
  if (messages[locale][key]) {
    return messages[locale][key]
  } else {
    console.error('Missing message: "' + key + '" for locale ' + locale)
    return key
  }
}

export default messages[locale]
