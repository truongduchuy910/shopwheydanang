const { Text, Relationship, Slug, File } = require("@keystonejs/fields");
const { Markdown } = require("@keystonejs/fields-markdown");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: "./app/public/store",
  path: "/store"
});

module.exports = {
  fields: {
    title: {
      type: Text,
      isRequired: true
    },
    url: {
      type: Slug,
      from: "title"
    },
    description: {
      type: Text,
      isRequired: true
    },
    image: {
      type: File,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: ({ existingItem = {} }) =>
          fileAdapter.delete(existingItem)
      }
    },
    content: {
      type: Markdown
    },
    category: {
      type: Relationship,
      ref: "Category",
      many: true
    }
  },
  hooks: {
    afterDelete: ({ existingItem = {} }) => fileAdapter.delete(existingItem)
  }
};
