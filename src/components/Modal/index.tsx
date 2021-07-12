import firebase from "firebase";
import React from "react";
import { AlertIcon } from "../../Assets/Icons";
import { useAuth } from "../../context/auth.context";
import { database } from "../../firebase";

type ModalType = "ADD_FOLDER" | "ADD_FILE";

interface ModalProps {
  modalShowFunc: (status: boolean) => void;
  title: string;
  shortDesc: string;
  type: ModalType;
  currentFolder: firebase.firestore.DocumentSnapshot | null;
}

const Modal: React.FC<ModalProps> = ({
  modalShowFunc,
  title,
  shortDesc,
  type,
  currentFolder,
}: ModalProps): JSX.Element => {
  const [inputValue, setInputValue] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string>("");

  const { currentUser } = useAuth();

  async function onCreate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setError("");
    try {
      // check if inputValue is empty
      isInputValueIsEmptyThrowError(inputValue, type);

      if (currentFolder === null) return;

      // determine which action.type to call
      if (type === "ADD_FOLDER") {
        await onCreateFolder();
        setInputValue(undefined);
        modalShowFunc(false);
      }
    } catch (error) {
      setError(error.message || "Error creating folder");
    }
  }

  async function onCreateFolder(): Promise<
    | Promise<
        firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
      >
    | Error
  > {
    return new Promise((resolve, reject) => {
      try {
        const onSuccess = database.folders.add({
          name: inputValue,
          parentId: currentFolder.id,
          userId: currentUser?.uid,
          // path,
          createdAt: database.getCurrentTimestamp(),
        });
        resolve(onSuccess);
      } catch (e) {
        reject(e);
      }
    });
  }

  return (
    <React.Fragment>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertIcon />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{shortDesc}</p>
                  </div>
                  <div className="my-4 w-auto">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="modal-input-box"
                      placeholder="Memories 2k21"
                    />
                    {error && (
                      <div className="tracking-wide leading-none text-red-500 text-xs my-2 px-2">
                        {" "}
                        * {error}{" "}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* footer buttons */}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={onCreate}
                type="button"
                className="button-indigo"
              >
                {type === "ADD_FOLDER" ? "Create folder" : "Create file"}
              </button>
              <button
                onClick={() => modalShowFunc(false)}
                type="button"
                className="button-normal"
              >
                Cancel
              </button>
            </div>
            {/* footer buttons */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
function isInputValueIsEmptyThrowError(
  inputValue: string | undefined,
  type: string
) {
  const isEmpty: boolean = inputValue === undefined || inputValue.length < 1;
  const isPatternIncorrect: boolean = /[^a-zA-Z0-9-]/.test(
    inputValue as string
  );
  if (isEmpty) {
    throw new Error(
      `${type === "ADD_FOLDER" ? "Folder" : "File"} name cannot be blank!`
    );
  } else if (isPatternIncorrect) {
    throw new Error("It should not contains any special symbols!");
  }
}
