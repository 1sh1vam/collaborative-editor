import { useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = () => {
  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const element = document.createElement('div');
    wrapper.append(element);

    new Quill(element, {
      theme: 'snow',
    });
  }, []);
  return <div ref={wrapperRef} className="container"></div>;
};

export default TextEditor;
