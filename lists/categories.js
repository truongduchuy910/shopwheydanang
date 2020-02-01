const { Text } = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
      isRequired: true
    }
  },
  label: "Danh mục"
};
