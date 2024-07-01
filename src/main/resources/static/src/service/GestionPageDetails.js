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