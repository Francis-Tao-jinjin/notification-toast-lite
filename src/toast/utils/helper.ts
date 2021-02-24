import React from 'react';

type GeneralElement = React.ReactNode|React.FunctionComponent|React.ClassicComponent;

export function isClassComponent(component:GeneralElement) {
    return (
        typeof component === 'function' && 
        !!component.prototype.isReactComponent
    )
}

export function isFunctionComponent(component:GeneralElement) {
    return (
        typeof component === 'function' && 
        String(component).includes('return React.createElement')
    )
}

export function isReactComponent(component:GeneralElement) {
    return (
        isClassComponent(component) || 
        isFunctionComponent(component)
    )
}

export function isElement(element:GeneralElement) {
    return React.isValidElement(element);
}