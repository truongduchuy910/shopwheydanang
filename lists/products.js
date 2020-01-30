const {
  Text,
  Relationship,
  Slug,
  File,
  Decimal,
  Content
} = require("@keystonejs/fields");
const { Markdown } = require("@keystonejs/fields-markdown");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: "./app/public/store",
  path: "/store"
});

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true
    },
    url: {
      type: Slug,
      from: "name"
    },
    description: {
      type: Text,
      isRequired: true
    },
    price: {
      type: Decimal,
      isRequired: true
    },
    sale: {
      type: Decimal
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
    branch: {
      type: Relationship,
      ref: "Branch"
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
