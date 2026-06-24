import {
  createContext,
  type PropsWithChildren,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import css from './toast.module.css'
import flex from '@course/styles'
import cx from '@course/cx'

const TIMER = 3000

export type TToastMethods = {
  toast: (item: TToastItem) => void
}

type TToastItem = {
  id: string
  text: string
}

/**
 * Expected usage:
 *   <ToastProvider target="#toast-container">
 *     <InnerComponent />   // calls useToast().toast({ id: '1', text: 'Hello' })
 *   </ToastProvider>
 *
 * Toast item: { id: '1', text: 'Toast message: 1' }
 */

export function ToastProvider({ children, target }: PropsWithChildren<{ target: string }>) {
  // Step 1: Create ToastContext with createContext<TToastMethods>,
  //   and useToast() hook that returns useContext(ToastContext)

  // Step 2: useLayoutEffect to find target DOM element via document.querySelector,
  //   store in state. Create a toastRef (useRef<TToastMethods>).
  //   useMemo to create context value that delegates toast() to toastRef.current.
  //   Render: <ToastContext.Provider value={context}>, createPortal(<ToastList ref={toastRef}/>, targetElement), {children}
  //   a11y: <ul> should have aria-live="polite" and aria-relevant="additions removals" for screen reader announcements

  // Step 3: ToastList({ ref }) —
  //   useState for items array (TToastItem & { removed: boolean }).
  //   useImperativeHandle to expose toast() that appends new item with removed=false.
  //   onAnimationEnd handler (event delegation on <ul onAnimationEndCapture>):
  //     - if target.dataset.removed === 'true': filter item out of state (remove from DOM)
  //     - if target.dataset.removed === 'false': setTimeout(TIMER) then set removed=true on that item
  //   Render: <ul> with items mapped to <li> with className fadeIn/fadeOut based on removed,
  //     data-removed and data-id attributes, containing <div class="toast"><p>{text}</p></div>
  //   a11y: each <li> should have role="status", aria-atomic="true", aria-live="polite"

  return <div>TODO: Implement</div>
}

export function useToast(): TToastMethods {
  return { toast: () => {} }
}
