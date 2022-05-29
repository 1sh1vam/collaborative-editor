import { useCallback, useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import Quill from 'quill';
import Delta from 'quill/node_modules/quill-delta/dist/Delta';
import 'quill/dist/quill.snow.css';
import 'highlight.js/styles/monokai-sublime.css';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

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

const SAVE_INTERVAL_MS = 3000;

hljs.configure({   // optionally configure hljs
  languages: ['javascript', 'ruby', 'python']
});

interface MountedRef {
  socket?: boolean;
  quill?: boolean;
}

const TextEditor = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();
  const mountedref = useRef<MountedRef>({ socket: false, quill: false });


  useEffect(() => {
    const s = io('http://localhost:3001');
    setSocket(s);

    return () => {
      s.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;

    socket.once('load-document', (data) => {
      quill.setContents(data);
      quill.enable();
    });

    socket.once('error', (err) => {
      quill.setText(err.message);
    });

    socket.emit('get-document', documentId)
  }, [socket, quill, documentId])


  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta: Delta) => {
      quill.updateContents(delta);
    }

    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    }
  }, [socket, quill])

  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta: Delta, oldDelta: Delta, source: string) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
      socket.emit('save-document', quill.getContents());
    }

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    }
  }, [socket, quill])

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (!wrapper) return;
    wrapper.innerHTML = '';
    const element = document.createElement('div');
    wrapper.append(element);

    const q = new Quill(element, {
      theme: 'snow',
      modules: {
        syntax: {
          highlight: (text: string) => hljs.highlightAuto(text).value,
        },
        toolbar: TOOLBAR_OPTIONS,
      }
    });
    q.disable();
    q.setText('Loading...');
    setQuill(q);
  }, []);

  return <div ref={wrapperRef} className="container"></div>;
};

export default TextEditor;
