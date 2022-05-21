import { useCallback, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';

var TOOLBAR_OPTIONS = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'align': [] }],

  ['image', 'blockquote', 'code-block'],

  ['clean']                                         // remove formatting button
];


const TextEditor = () => {
  const mountedref = useRef(false);

  useEffect(() => {
    if (mountedref.current) return;
    mountedref.current = true;
    const socket = io('http://localhost:3001');
    console.log('socket', socket);
  }, [])

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const element = document.createElement('div');
    wrapper.append(element);

    new Quill(element, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      }
    });
  }, []);

  return <div ref={wrapperRef} className="container"></div>;
};

export default TextEditor;
