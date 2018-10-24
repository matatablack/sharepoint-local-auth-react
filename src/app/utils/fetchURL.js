const WEB_URL = "https://partner.coca-cola.com/sites/TechnicalManagementSystemSLBU";

const documentsQueryString = () => {
  const API_URL = "_api/web/lists/getbytitle('Documents')/items";

  const $select = [
    "File/Name",
    "File/ServerRelativeUrl",
    "File/TimeCreated",
    "DocNameSTD/Title",
    "DocNameSTD/SubCategoria",
    "DocNameSTD/DocType",
    "DocNameSTD/MasterDocumentCode",
    "DocNameSTD/DocName",
    "DocNameSTD/VersionDoc"
  ];

  const $expand = ["File", "DocNameSTD"];

  return `${API_URL}?$select=${$select.join(",")}&$expand=${$expand.join(",")}`;
};

const quickLinksQueryString = () => {
  const API_URL = "_api/web/lists/getbytitle('QuickLinks')/items";

  const $select = ["Title", "url"];

  return `${API_URL}?$select=${$select.join(",")}&$top=4`;
};

const userQueryString = () => {
  const API_URL = "_api/web/currentUser";

  const $select = ["Title", "Groups"];
  const $expand = ["Groups"];

  return `${API_URL}?$select=${$select.join(",")}&$expand=${$expand.join(",")}`;
};

const documentsURL = `${WEB_URL}/${documentsQueryString()}`;
const quickLinksURL = `${WEB_URL}/${quickLinksQueryString()}`;
const userURL = `${WEB_URL}/${userQueryString()}`;

export { documentsURL, quickLinksURL, userURL };
