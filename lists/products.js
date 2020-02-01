const {
  Text,
  Relationship,
  Slug,
  File,
  Decimal
} = require("@keystonejs/fields");
const { Content } = require("@keystonejs/field-content");

const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: "./app/public/store",
  path: "/store"
});

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true,
      label: "Tên sản phẩm",
      schemaDoc: "Tên mỗi sản phẩm phải là duy nhất, không được trùng lặp"
    },
    price: {
      type: Decimal,
      isRequired: true,
      label: "Giá thông thường",
      schemaDoc: "Giá bán thông thường"
    },
    image: {
      type: File,
      adapter: fileAdapter,
      isRequired: true,
      hooks: {
        beforeChange: ({ existingItem = {} }) =>
          fileAdapter.delete(existingItem)
      },
      label: "Hình hiển thị"
    },

    orther_image: {
      type: File,
      adapter: fileAdapter,
      hooks: {
        beforeChange: ({ existingItem = {} }) =>
          fileAdapter.delete(existingItem)
      },
      label: "Hình ảnh thêm"
    },
    description: {
      type: Content,
      label: "Mô tả",
      schemaDoc: "Mô tả giới thiệu về sản phẩm"
    },
    detail: {
      type: Content,
      label: "Chi tiết",
      schemaDoc: "Chi tiết về thông số hoặc thành phần"
    },
    guide: {
      type: Content,
      label: "Hướng dẫn",
      schemaDoc: "Hướng dẫn sử dụng"
    },
    branch: {
      type: Relationship,
      ref: "Branch",
      label: "Thương hiệu"
    },
    category: {
      type: Relationship,
      ref: "Category",
      many: true,
      label: "Danh mục"
    },
    url: {
      type: Slug,
      from: "name",
      schemaDoc: "Đường dẫn"
    }
  },
  hooks: {
    afterDelete: ({ existingItem = {} }) => fileAdapter.delete(existingItem)
  },
  label: "Sản phẩm"
};
