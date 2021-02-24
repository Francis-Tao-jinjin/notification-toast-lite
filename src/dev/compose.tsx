import React from 'react';


/**
 * from https://stackoverflow.com/questions/51504506/too-many-react-context-providers
 */

interface Props {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
    children: React.ReactNode
}

export default function Compose(props: Props) {
    const { components = [], children } = props

    return (
        <>
            {components.reduceRight((acc, ComponentProvider) => {
                return <ComponentProvider>{acc}</ComponentProvider>
            }, children)}
        </>
    )
}