import { useCallback } from "react";
import toast from "toastr";

export const useMassage = () => {
  return useCallback((text) => {
    if (text) {
      toast.options.positionClass = "toast-top-right";
      toast.options.progressBar = true;
      toast.options.timeOut = 5000;
      toast.error(text);
    }
  }, []);
};
