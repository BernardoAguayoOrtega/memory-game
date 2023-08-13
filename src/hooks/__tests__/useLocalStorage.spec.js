import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../useLocalStorage';

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should retrieve the value from local storage', () => {
    localStorage.setItem('testKey', JSON.stringify('testValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    expect(result.current[0]).toBe('testValue');
  });

  it('should use default value when key is not present in local storage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('should update local storage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'default'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });
});
