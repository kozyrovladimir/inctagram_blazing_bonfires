import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CropType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type CropImageType = {
  x: number;
  y: number;
};

export type PhotoType = {
  url: string;
  crop: CropImageType;
  aspectRatio: number;
  isOriginal: boolean;
  isImageCropped: boolean;
  croppedImage: string | null;
  zoom: number;
  originalAspectRatio: number;
  id: string;
};

const initialState: {photos: PhotoType[]} = {
  photos: [],
};

const PhotosSlice = createSlice({
  name: "photos",
  initialState: initialState,
  reducers: {
    setPhotos(
      state,
      action: PayloadAction<{ photos: PhotoType[] }>
    ) {
      state.photos = action.payload.photos;
    },
    prepare(state) {
      return { ...state };
    },
  },
});

export const { setPhotos } = PhotosSlice.actions;
export default PhotosSlice.reducer;

