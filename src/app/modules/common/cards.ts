import { Term, Image, Css, TERM_CODES, IMAGE_CODES } from './../data/data';

const getImageClass  = (str: string): string => {
  return str.substring(1, str.length - 1).toLowerCase();
};

export const getAbilityText = (text: string, termCss: Css, imageCss: Css): string => {
  if (!text) {
    return null;
  }
  let innerHtml = text;
  TERM_CODES.forEach((term: Term) => {
    while (innerHtml.includes(term.key)) {
        const html = `<br><span class="${termCss}">(${term.value})</span>`;
        innerHtml = innerHtml.replace(term.key, html);
    }
  });
  IMAGE_CODES.forEach((image: Image) => {
    while (innerHtml.includes(image.key)) {
        const html = `<img src="${image.path}" class="${imageCss} ${getImageClass(image.key)}">`;
        innerHtml = innerHtml.replace(image.key, html);
    }
  });
  return innerHtml;
};

