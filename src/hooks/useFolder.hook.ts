import firebase from "firebase";
import React from "react";
import { Action, ActionType } from "../actions";
import { useAuth } from "../context/auth.context";
import { database } from "../firebase";

/* Note:
 *  The state object is defined as a constant in the reducer function.
 *  The state object is passed as a parameter to the component.
 */

export type FolderType<T> = firebase.firestore.DocumentSnapshot<T>;

interface BaseFolderProps {
  folderId?: string | null;
  folder?: FolderType<firebase.firestore.DocumentData> | null;
}

interface FolderState extends BaseFolderProps {
  childFolders: FolderType<firebase.firestore.DocumentData>[];
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

    case Action.SET_CHILD_FOLDERS:
      console.log(action.payload);

      return {
        ...state,
        childFolders: action.payload.childFolders,
      };

    default:
      return state;
  }
}

// defining useFolder hook as a function
// @hook('useFolder')
export function useFolder({ folderId, folder }: BaseFolderProps): FolderState {
  const [state, dispatch] = React.useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  // get authenticated user from firebase and add it to state
  const { currentUser } = useAuth();

  // global state re-render when both folderId and folder has any major update
  // tree shaking will remove the unused props
  React.useEffect(() => {
    dispatch({ type: Action.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  // it will help to update state on each folder change / modified
  React.useEffect(() => {
    // check if root folder
    if (folderId == null) {
      return dispatch({
        type: Action.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      } as ActionType);
    }
    // perform database call
    database.folders
      .doc("" + folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: Action.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        } as ActionType);
      })
      .catch(() => {
        dispatch({
          type: Action.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        } as ActionType);
      });
  }, [folderId]);

  React.useEffect(() => {
    const onCleanup = database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser?.uid)
      .onSnapshot(
        (
          snapShot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        ) => {
          dispatch({
            type: Action.SET_CHILD_FOLDERS,
            payload: { childFolders: snapShot.docs.map(database.formatDoc) },
          } as ActionType);
        }
      );

    return () => onCleanup(); // return the onClean function to be called on unmount
  }, [folderId, currentUser]);

  return state;
}
