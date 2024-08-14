import { EndpointsContext } from './agent'
import { ReactNode } from 'react'

export default function Layout(props: { children: ReactNode }) {
  return (
    <EndpointsContext>
      {props.children}
    </EndpointsContext>
  )
}