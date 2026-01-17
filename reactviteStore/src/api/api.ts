export default {
  companies: {
    all: {
      method: "GET",
      path: "company/all",
    },
    one: {
      method: "GET",
      path: "company/one/:companyId",
    },
    create: {
      method: "POST",
      path: "company/create",
    },
    delete: {
      method: "DELETE",
      path: "company/delete/:companyId",
    },
    update: {
      method: "PATCH",
      path: "company/replace/:companyId",
    },
    getDocuments: {
      method: "GET",
      path: "company/get/documents",
    },
  },
  users: {
    create: {
      method: "POST",
      path: "user/create",
    },
  },
};
