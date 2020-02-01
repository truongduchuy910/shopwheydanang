const { Text, Relationship, Slug, File } = require("@keystonejs/fields");
const { Content } = require("@keystonejs/field-content");

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
    body: {
      type: Content
    },
    hashtag: {
      type: Relationship,
      ref: "Hashtag",
      many: true
    }
  },
  hooks: {
    afterDelete: ({ existingItem = {} }) => fileAdapter.delete(existingItem)
  },
  label: "Bài viết"
};
