﻿import Data from "../../modules/data.js?v=8.0.6"
import EventHandler from "../../modules/event-handler.js?v=8.0.6"
import Popover from "../../modules/base-popover.js?v=8.0.6"

export function init(id) {
    const el = document.getElementById(id)
    if (el == null) {
        return
    }

    const dismissSelector = el.getAttribute("data-bb-dismiss")
    const popover = Popover.init(el, {
        autoClose: el.getAttribute('data-bb-auto-close'),
        dropdownSelector: el.getAttribute('data-bb-dropdown')
    });
    const dateTimePicker = {
        el,
        dismissSelector,
        popover
    }
    Data.set(id, dateTimePicker)

    if (dismissSelector) {
        EventHandler.on(popover.toggleMenu, 'click', dismissSelector, () => {
            popover.hide()
        })
    }
}

export function hide(id) {
    const data = Data.get(id)
    if (data) {
        data.popover.hide()
    }
}

export function dispose(id) {
    const data = Data.get(id)
    Data.remove(id)

    if (data) {
        if (data.dismissSelector) {
            EventHandler.off(data.popover.toggleMenu, 'click', data.dismissSelector)
        }
        Popover.dispose(data.popover)
    }
}
