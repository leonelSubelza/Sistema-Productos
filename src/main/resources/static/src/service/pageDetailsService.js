import {URL} from "./Configuracion.js";

export async function loadUserDetailsValues() {
  try {
    const request = await fetch(URL+"/pageDetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return await request.json();
  } catch (error) {
    throw error;
  }
}

export const guardarPageDetail = async (obj,fieldName,imageArchivo) => {
  try {
    const formData = new FormData();
    if (fieldName === 'frontPageImage' && imageArchivo !== undefined) {
      formData.append('frontPageImageParam', imageArchivo);
    }
    if (fieldName === 'pageLogo' && imageArchivo !== undefined) {
      formData.append('pageLogoImageParam', imageArchivo);
    }

    formData.append("id", obj.id);
    formData.append("pageName", obj.pageName);
    formData.append("pageSlogan", obj.pageSlogan);
    formData.append("title", obj.title);
    formData.append("descriptionTitle", obj.descriptionTitle);
    formData.append("frontPageImage", obj.frontPageImage);
    formData.append("pageLogo", obj.pageLogo);
    formData.append("nroWhatsapp", obj.nroWhatsapp);
    formData.append("pageDescription", obj.pageDescription);

    return await fetch(URL + "/pageDetails", {
      method: "PUT",
      body: formData,
    });
  } catch (error) {
    throw error;
  }
};