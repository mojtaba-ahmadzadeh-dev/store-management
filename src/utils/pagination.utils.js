export function getPagination(page = 1, limit = 10) {
  const currentPage = +page > 0 ? +page : 1;
  const perPage = +limit > 0 ? +limit : 10;
  const offset = (currentPage - 1) * perPage;

  return {
    currentPage,
    perPage,
    offset,
  };
}

export function getPagingData(totalItems, currentPage, perPage, rows) {
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    totalItems,
    totalPages,
    currentPage,
    limit: perPage,
    products: rows,
  };
}