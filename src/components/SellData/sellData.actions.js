export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";

export const openDialog = function() {
  return {
    type: OPEN_DIALOG,
    isOpen: true,
  }
}

export const closeDialog = function() {
  return {
    type: CLOSE_DIALOG,
    isOpen: false,
  }
}