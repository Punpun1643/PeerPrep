import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirrorEditor } from "react-codemirror2";
import "./CodeEditorAddons";
import "./CodeEditor.css";
import Cookies from 'js-cookie';

const CodeEditor = (props) => {

  const roomId = props.roomId;
  const firstClientSocketId = props.socketIds[0];
  const secondClientSocketId = props.socketIds[1];
  
  const [EditorRef, setEditorRef] = useState(null);
  const [code, setCode] = useState("");
  const [username, setUsername] = useState(Cookies.get('username'));

  
  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    
    if (EditorRef) {
      const ydoc = new Y.Doc();

      let provider = null;
      
      try {
        provider = new WebrtcProvider(roomId, ydoc, { signalling: ['wss://localhost:3000'] });

        const yText = ydoc.getText("codemirror");
        
        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness;

        console.log(username);

        awareness.on('change', changes => {
          // Whenever somebody updates their awareness information,
          // we log all awareness information from all users.
          console.log(Array.from(awareness.getStates().values()));
        })
        
        
        awareness.setLocalStateField("user", {
          // reflects username on cursor.
          name: `${username}`,
          color: '#3370FF'
        });
        
        const getBinding = new CodemirrorBinding(yText, EditorRef, awareness, {
          yUndoManager,
        });

      } catch (err) {
        alert("There is an error in the collaborator, please refresh the page!");
      }
      return () => {
        if (provider) {
          provider.disconnect(); 
          ydoc.destroy(); 
        }
      };
    }
  }, [EditorRef]);

  return (
    <div
      style={{
        display: "flex",
        height: "91.5vh",
        width: "100%",
        fontSize: "16px",
        overflowY: "auto",
      }}
    >
      <CodeMirrorEditor
        onChange={(editor, data, value) => {
          setCode(value);
        }}
        autoScroll
        options={{
          mode: 'text/x-java',
          theme: "dracula", 
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseTags: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
          },
        }}
        editorDidMount={(editor) => {
          handleEditorDidMount(editor);
          editor.setSize("99vw", "100%");
        }}
      />
    </div>
  );
}

export default CodeEditor;
