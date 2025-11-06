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

import '@testing-library/jest-dom'
