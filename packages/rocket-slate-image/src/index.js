import renderBlock from "./renderBlock"
import renderMark from "./renderMark"
import renderMark from "./renderMark"

function PluginImage(opts = {}) {
  return { onKeyDown, renderBlock, renderInline, renderMark }
}

export default PluginImage

