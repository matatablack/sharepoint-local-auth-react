import Auth from "./Auth";
import { isDevelopment } from "./../constants";

export default async function fetchData(URL) {
  let headers;
  if (!isDevelopment) {
    headers = new Headers({ Accept: "application/json;odata=verbose" });
  } else {
    headers = new Headers({
      Accept: "application/json;odata=nometadata",
      Authorization: `Bearer ${await Auth.getToken()}`
    });
  }

  return fetch(URL, {
    headers,
    credentials: isDevelopment ? "same-origin" : "include"
  })
    .then(res => res.json())
    .then(d => {
      if (isDevelopment) {
        console.log(d);
        return d.value || d;
      } else {
        return d.d.results || d.d;
      }
    })
    .catch(err => console.error("Error fetching data", err));

  /* console.log("%c Original data:", "background: #000; color: #bada55", data);
  console.log("%c Formatted data:", "background: #bada55; color: #000", formatData(data)); */
}
