export const ImagePreload = (url: any) => {
  const _image = new Image();
  _image.src = url;
  return _image.outerHTML
};
