const WEB_URL = "https://partner.coca-cola.com/sites/TechnicalManagementSystemSLBU";
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

const fetchURL = `${WEB_URL}/${API_URL}?$select=${$select.join(",")}&$expand=${$expand.join(",")}`;

export { fetchURL };
