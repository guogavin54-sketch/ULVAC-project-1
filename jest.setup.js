import '@testing-library/jest-dom';
// Mock IntersectionObserver
class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(element) {
    this.callback([{ isIntersecting: true, target: element }]);
  }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserver;