export interface ActionType {
  type: string;
  payload?: any;
}

export const Action = {
  SELECT_FOLDER: "SELECT_FOLDER",
  UPDATE_FOLDER: "UPDATE_FOLDER",
  SET_CHILD_FOLDERS: "SET_CHILD_FOLDERS",
};
