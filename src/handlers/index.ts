import { toast } from "react-toastify";

export const submitToast = (func: Function) => {
  toast.promise(func(), {
    pending: "Please wait a while...",
  });
};
