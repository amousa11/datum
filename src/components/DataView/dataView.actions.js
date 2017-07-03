export const OPEN_DATA_VIEW_DIALOG = "OPEN_DATA_VIEW_DIALOG";
export const CLOSE_DATA_VIEW_DIALOG = "CLOSE_DATA_VIEW_DIALOG";

export const openDataViewDialog = function() {
  return {
    type: OPEN_DATA_VIEW_DIALOG,
    isOpen: true,
  }
}

export const closeDataViewDialog = function() {
  return {
    type: CLOSE_DATA_VIEW_DIALOG,
    isOpen: false,
  }
}