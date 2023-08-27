import toastr from "toastr"

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  export function showMessage (titulo, message, type) {
    toastr[type](message, titulo)
  }

  export function errorMessage (titulo, message) {
    toastr.error(message, titulo)
  }

  export function successMessage (titulo, message) {
    toastr.success(message, titulo)
  }

  export function alertMessage (titulo, message) {
    toastr.warning(message, titulo)
  }