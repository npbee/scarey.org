import S from "@sanity/desk-tool/structure-builder";
console.log("hi");

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Settings")
        .child(
          S.editor()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      ...S.documentTypeListItems().filter(
        listItem => !["siteSettings"].includes(listItem.getId())
      ),
    ]);
