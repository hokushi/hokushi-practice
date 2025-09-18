import { toast } from "sonner";

export const useToast = () => {
  const success = (message: string) => {
    toast.success(message, {
      duration: 3000,
      style: {
        background: "#cdebd7", // --color-light-green
        color: "#00963c", // --color-green
      },
    });
  };

  const error = (message: string) => {
    toast.error(message, {
      duration: 4000,
      style: {
        background: "#fad2d7", // --color-light-orange
        color: "#dc1e32", // --color-alert
      },
    });
  };

  const showInfo = (message: string) => {
    toast.info(message, {
      duration: 3000,
      style: {
        background: "#ebf3ff", // --color-p1
        color: "#3264dc", // --color-p6
      },
    });
  };

  return {
    success,
    error,
    showInfo,
  };
};
