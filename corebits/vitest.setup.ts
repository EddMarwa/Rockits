// Vitest setup file — provide browser API shims and load jest-dom matchers
// Provide a minimal IntersectionObserver shim for jsdom so framer-motion's
// viewport features don't throw during tests.
if (typeof globalThis.IntersectionObserver === 'undefined') {
	class IntersectionObserverStub {
		constructor() {}
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	// @ts-ignore - assign stub to global
	globalThis.IntersectionObserver = IntersectionObserverStub
}

	// Mock framer-motion to avoid browser-only APIs (IntersectionObserver,
	// cssstyle interactions) during unit tests. The mock strips known
	// motion-specific props so React won't warn about unknown DOM props and
	// renders appropriate DOM/SVG elements instead of passing animation props.
	import { vi } from 'vitest'
	import React from 'react'

	vi.mock('framer-motion', () => {
		const motionPropKeys = new Set([
			'initial', 'animate', 'whileHover', 'whileTap', 'whileInView', 'viewport', 'transition', 'variants', 'exit', 'style'
		])

		const create = (tagName: string | symbol) => {
			// if prop is a symbol (e.g., React internals), fallback to div
			const tag = typeof tagName === 'string' ? tagName : 'div'
			return (props: any) => {
				// filter out motion-specific props so they don't appear on DOM nodes
				const filtered: Record<string, any> = {}
				for (const key of Object.keys(props || {})) {
					if (!motionPropKeys.has(key)) filtered[key] = props[key]
				}
				return React.createElement(tag, filtered, props?.children)
			}
		}

		const motion = new Proxy({}, {
			get: (_t, prop) => create(prop)
		})

		return {
			motion,
			AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
			useReducedMotion: () => true,
			useInView: () => false,
		}
	})

	import '@testing-library/jest-dom'

// Provide a couple of small shims for jsdom's CSS APIs to avoid
// cssstyle parsing errors thrown by third-party libs (framer-motion)
try {
	if (typeof (globalThis as any).CSS === 'undefined') {
		;(globalThis as any).CSS = { supports: () => false }
	}
	if (typeof CSSStyleDeclaration !== 'undefined') {
		const proto = CSSStyleDeclaration.prototype as any
		if (proto && typeof proto.setProperty === 'function') {
			const orig = proto.setProperty
			proto.setProperty = function (name: string, value: any, priority?: string) {
				if (value === undefined || value === null) value = ''
				return orig.call(this, name, value, priority)
			}
		}
	}
} catch (e) {
	// best-effort shim; if it fails, tests may still run but with potential errors
}
