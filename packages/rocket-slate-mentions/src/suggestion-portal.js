import React from 'react'

import { Portal } from 'react-portal'
import position from './caret-position'
import SuggestionItem from './suggestion-item'
import getCurrentWord from './current-word'
import {
  UP_ARROW_KEY,
  DOWN_ARROW_KEY,
  RESULT_SIZE,
  ESCAPE_KEY,
  ENTER_KEY
} from './constants'
import ClickOutside from 'react-click-outside'

class SuggestionPortal extends React.Component {
  state = {
    filteredSuggestions: []
  }

  componentDidMount = () => {
    this.adjustPosition()
    window.addEventListener('resize', ::this.adjustPosition)
    window.addEventListener('scroll', ::this.adjustPosition)
  }

  componentDidUpdate = () => {
    this.adjustPosition()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', ::this.adjustPosition)
    window.removeEventListener('scroll', ::this.adjustPosition)
  }

  constructor(props) {
    super()
    this.isOpen = false
    this.justOpened = false
    this.portalContainer = React.createRef();
    props.callback.onKeyDown = this.onKeyDown
    props.callback.onKeyUp = this.onKeyUp
    props.callback.onEnter = props.onEnter

    this.selectedIndex = 0
    if (typeof props.suggestions === 'function') {
      props.callback.suggestion = undefined
    } else {
      this.state.filteredSuggestions = props.suggestions.slice(0, props.resultSize ? props.resultSize : RESULT_SIZE)
      props.callback.suggestion = this.state.filteredSuggestions[this.selectedIndex]
    }
  }

  setCallbackSuggestion = () => {
    if (this.state.filteredSuggestions.length) {

      this.props.callback.suggestion = this.state.filteredSuggestions[this.selectedIndex]
    } else {
      this.props.callback.suggestion = undefined
    }
  }

  setFilteredSuggestions = (filteredSuggestions) => {
    this.setState({
      filteredSuggestions
    }, this.setCallbackSuggestion)
  }

  onKeyUp = (e, change, next) => {
    const match = this.matchCapture();
    if (match) {
      if (e.keyCode !== DOWN_ARROW_KEY &&
        e.keyCode !== UP_ARROW_KEY &&
        e.keyCode !== ENTER_KEY &&
        e.keyCode !== ESCAPE_KEY) {

        this.selectedIndex = 0
        const newFilteredSuggestions = this.getFilteredSuggestions(e.key)

        if (typeof newFilteredSuggestions.then === 'function') {
          newFilteredSuggestions.then(newFilteredSuggestions => {
            this.setFilteredSuggestions(newFilteredSuggestions)
          }).catch(() => {
            this.setFilteredSuggestions([])
          })
        } else {
          this.setFilteredSuggestions(newFilteredSuggestions)
        }
      }
    }

    next();
  }

  onKeyDown = (e, editor, next) => {

    const match = this.matchCapture();

    if (match) {
      const { filteredSuggestions } = this.state
      if (filteredSuggestions.length > 0) {
        // Prevent default return/enter key press when portal is open
        if (e.keyCode === ESCAPE_KEY) {
          this.hidePortal()
          return false
        } else if (e.keyCode === ENTER_KEY) {
          e.preventDefault();
          this.closePortal()
          this.selectedIndex = (this.selectedIndex || 0)
          this.setCallbackSuggestion();

          // Handle enter
          if (this.props.callback.onEnter && this.props.callback.suggestion !== undefined) {
            this.props.callback.onEnter(this.props.callback.suggestion, editor)

            return false;
          }
        }
        else if (e.keyCode === DOWN_ARROW_KEY) {
          e.preventDefault();
          if (this.selectedIndex + 1 === filteredSuggestions.length) {
            this.selectedIndex = -1
          }
          this.selectedIndex = (this.selectedIndex || 0) + 1
          this.setCallbackSuggestion()
          this.forceUpdate()
          return false;
        } else if (e.keyCode === UP_ARROW_KEY) {
          e.preventDefault();
          if (this.selectedIndex === 0) {
            this.selectedIndex = filteredSuggestions.length
          }
          this.selectedIndex = (this.selectedIndex || filteredSuggestions.length) - 1
          this.setCallbackSuggestion()
          this.forceUpdate()
          return false;
        }
      }
    }

    next();
  }

  matchCapture = () => {
    const { value, capture } = this.props

    if (!value.selection.anchor.key) return ''

    const { anchorText, selection } = value
    const { offset } = selection.anchor

    const currentWord = getCurrentWord(anchorText.text, offset - 1, offset - 1)

    const matchText = this.getMatchText(currentWord, capture)

    return matchText
  }

  getMatchText = (text, trigger) => {
    const matchArr = text.match(trigger)

    if (matchArr) {
      return matchArr[0].toLowerCase()
    }

    return undefined
  }

  getFilteredSuggestions = () => {
    const { suggestions, value, capture, resultSize } = this.props

    if (!value.selection.anchor.key) return []

    const { anchorText, selection } = value
    const { offset } = selection.anchor

    const currentWord = getCurrentWord(anchorText.text, offset - 1, offset - 1)

    let matchText = this.getMatchText(currentWord, capture);
    matchText = matchText.slice(1, matchText.length);

    if (typeof suggestions === 'function') {
      return suggestions(matchText)
    } else if (matchText) {
      return suggestions
        .filter(suggestion => suggestion.key.toLowerCase().indexOf(matchText) !== -1)
        .slice(0, resultSize ? resultSize : RESULT_SIZE)
    } else {
      return suggestions;
    }
  }

  adjustPosition = () => {
    if (!this.portalContainer.current) return

    const match = this.matchCapture();

    if (match) {
      this.showPortal()
      const rect = position()
      if (rect) {
        this.portalContainer.current.style.display = 'block'
        this.portalContainer.current.style.opacity = 1
        this.portalContainer.current.style.top = `${rect.top + window.scrollY}px` // eslint-disable-line no-mixed-operators
        this.portalContainer.current.style.left = `${rect.left + window.scrollX}px` // eslint-disable-line no-mixed-operators
      }
    } else if (match === undefined) {
      this.hidePortal()
      return
    }
  }

  showPortal = (rect) => {
    if (!this.isOpen) {
      this.isOpen = true
      if (!this.justOpened) {
        this.justOpened = true
        setTimeout(() => {
          this.justOpened = false
        }, 100)
      }
    }
  }

  hidePortal = () => {
    if (this.isOpen) {
      this.portalContainer.current.removeAttribute('style')
      this.isOpen = false
    }
  }

  closePortal = () => {

    if (!this.portalContainer.current) return

    const match = this.matchCapture();

    if (!match) {
      this.hidePortal()
      return
    }
  }

  clickOutside = () => {
    if (this.isOpen) {
      if (!this.justOpened) {
        this.hidePortal()
      }
    }
  }

  setSelectedIndex = (selectedIndex) => {
    this.selectedIndex = selectedIndex
    this.forceUpdate()
  }

  render = () => {
    const { filteredSuggestions } = this.state

    return (
      <Portal isOpened node={document && document.body}  >
        <ClickOutside onClickOutside={this.clickOutside}>
          <div className="suggestion-portal" ref={this.portalContainer}>
            <ul>
              {filteredSuggestions.map((suggestion, index) =>
                <SuggestionItem
                  key={suggestion.key}
                  index={index}
                  suggestion={suggestion}
                  selectedIndex={this.selectedIndex}
                  setSelectedIndex={this.setSelectedIndex}
                  appendSuggestion={this.props.callback.onEnter}
                  closePortal={this.closePortal}
                  editor={this.props.callback.editor}
                />
              )}
            </ul>
          </div>
        </ClickOutside>
      </Portal>
    )
  }
}

export default SuggestionPortal
