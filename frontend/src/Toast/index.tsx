import { ToastContainer, toast } from "react-toastify";

export const Toast = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

type NotifyProps = {
  type: "success" | "error";
  message: string;
};

export const notify = ({ type, message }: NotifyProps) => {
  type === "success" ? toast.success(message) : toast.error(message);
};
