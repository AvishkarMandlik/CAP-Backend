import Swal from "sweetalert2";
import { currentUser } from "./currentUser"; 

export const loginRequired = async () => {
  if (!currentUser) {
    const { isConfirmed } = await Swal.fire({
      title: "Login Required",
      text: "You need to be logged in to access this feature. Please log in to continue.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Log In",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#1a202c", 
      cancelButtonColor: "#6b7280", 
      customClass: {
        popup: "erp-swal-popup",
        title: "erp-swal-title",
        content: "erp-swal-text",
        confirmButton: "erp-confirm-button",
        cancelButton: "erp-cancel-button",
      },
    });

    if (isConfirmed) {
      window.location.href = "/login"; 
    }
  }
};
