import firebase from "firebase";
import React from "react";
import { Action, ActionType } from "../actions";

/* Note:
 *  The state object is defined as a constant in the reducer function.
 *  The state object is passed as a parameter to the component.
 */

interface FolderState {
  folderId: string | null;
  folder: firebase.firestore.DocumentSnapshot | null;
  childFolders: string[];
  childFiles: string[];
}

// Supertisiously define a `Root Folder`
const ROOT_FOLDER = {
  id: null,
  name: "Root",
  path: [],
};

// defining the reducer function here!
function reducer(state: FolderState, action: ActionType): FolderState {
  switch (action.type) {
    case Action.SELECT_FOLDER:
      return {
        ...state,
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFiles: [],
        childFolders: [],
      };

    case Action.UPDATE_FOLDER:
      return {
        ...state,
        folder: action.payload.folder,
      };

    default:
      return state;
  }
}

// defining useFolder hook as a function
// @hook('useFolder')
export function useFolder(folderId = null, folder = null): FolderState {
  const [state, dispatch] = React.useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  // global state re-render when both folderId and folder has any major update
  // tree shaking will remove the unused props
  React.useEffect(() => {
    dispatch({ type: Action.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  // it will help to update state on each folder change / modified
  React.useEffect(() => {
    // check if root folder
    if (folderId === null) {
      return dispatch({
        type: Action.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      } as ActionType);
    }
  }, [folderId]);

  return state;
}
