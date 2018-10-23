const tree = [];
const dataList = [];

function formatData(data) {
  const categorias = new Set();
  const subcategorias = new Set();
  const documentCodes = [];

  const documents = data.map(({ DocNameSTD, File }) => {
    const { Title, SubCategoria, MasterDocumentCode, DocType, DocName, VersionDoc } = DocNameSTD;
    const { Name, TimeCreated, ServerRelativeUrl } = File;

    const result = {
      categoria: Title,
      subcategoria: SubCategoria,
      code: MasterDocumentCode,
      codeMeta: {
        type: DocType,
        desc: DocName,
        version: VersionDoc
      },
      name: Name,
      url: ServerRelativeUrl,
      created: new Date(TimeCreated).getTime()
    };

    categorias.add(result.categoria);
    subcategorias.add(result.subcategoria);
    documentCodes.push({ ...result.codeMeta, code: MasterDocumentCode });

    buildTree(result);

    return result;
  });

  function iterateTree(tree) {
    tree.forEach(({ key, title, children }) => {
      dataList.push({ key, title });
      if (children) return iterateTree(children);
    });
  }

  iterateTree(tree);

  return {
    tree,
    documents,
    dataList
    /* 
    categorias: Array.from(categorias),
    subcategorias: Array.from(subcategorias),
    codes: removeDuplicates(documentCodes, "code") */
  };
}

export default formatData;

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

function buildTree(document) {
  const { categoria, subcategoria, code, codeMeta, name, url } = document;

  const catKey = categoria.replace(/ /g, "-");
  const subcatKey = `${catKey}-${subcategoria.replace(/ /g, "-")}`;
  const docKey = `${code}-${name.replace(/ /g, "-")}`;

  const struct = {
    title: categoria,
    key: catKey,
    children: [
      {
        title: subcategoria,
        key: subcatKey,
        children: [
          {
            title: code,
            key: code,
            ...codeMeta,
            children: [
              {
                title: name,
                key: docKey,
                url
              }
            ]
          }
        ]
      }
    ]
  };

  let cat = tree.find(item => item.key === catKey);
  let subcat = cat && cat.children.find(item => item.key === subcatKey);
  let docCode = subcat && subcat.children.find(item => item.key === code);
  let docFile = docCode && docCode.children.find(doc => doc.key === docKey);

  if (!cat) {
    return tree.push(struct);
  }
  if (!subcat) {
    return cat.children.push(struct.children[0]);
  }
  if (!docCode) {
    return subcat.children.push(struct.children[0].children[0]);
  }
  if (!docFile) {
    return docCode.children.push(struct.children[0].children[0].children[0]);
  }
}
