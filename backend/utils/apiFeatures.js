// const searchProducts = (query, filters) => {
//   const keyword = filters.keyword
//     ? {
//         name: {
//           $regex: filters.keyword,
//           $options: "i",
//         },
//       }
//     : {};

//   return query.find({ ...keyword });
// };

const searchProducts = (query, filters) => {
  const keyword = filters.keyword ? filters.keyword : "";

  return query.find({ name: { $regex: keyword, $options: "i" } });
};

const filterProducts = (query, filters) => {
  const queryCopy = { ...filters };
  const removeFields = ["keyword", "page", "limit"];

  removeFields.forEach((key) => delete queryCopy[key]);

  if (filters.category) {
    queryCopy.category = filters.category;
  }

  // Remove the price filter from queryCopy

  let filtersStr = JSON.stringify(queryCopy);
  filtersStr = filtersStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  console.log(filtersStr);

  return query.find(JSON.parse(filtersStr));
};

const paginateProducts = (query, filters, resultPerPage) => {
  const currentPage = Number(filters.page) || 1;
  const skip = resultPerPage * (currentPage - 1);

  return query.limit(resultPerPage).skip(skip);
};

module.exports = {
  searchProducts,
  filterProducts,
  paginateProducts,
};
