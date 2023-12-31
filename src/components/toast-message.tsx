import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { removeToast } from "../redux/action/toastAction";

const ToastMessage: React.FC = () => {
  const toastMessageContent = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch<AppDispatch>();
  return (
    toastMessageContent.length > 0 && (
      <div className="flex flex-col gap-5 fixed top-5 left-5 z-[101]">
        {toastMessageContent.map(({ type, message }, index) => {
          return (
            <Toast key={index}>
              {type === "Error" ? (
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
              ) : type === "Success" ? (
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
              ) : (
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                  <HiExclamation className="h-5 w-5" />
                </div>
              )}
              <div className="ml-3 text-sm font-normal">
                <span className="font-medium">{type} alert!</span> {message}
              </div>
              <Toast.Toggle
                onClick={() => {
                  dispatch(removeToast({ type, message }));
                }}
              />
            </Toast>
          );
        })}
      </div>
    )
  );
};

export default ToastMessage;
