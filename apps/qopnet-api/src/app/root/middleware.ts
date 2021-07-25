/**
 * Express middleware for pagination
 * Reference: https://docs.commercelayer.io/api/pagination
 */
export function paginate(req, res, next) {
  const { page } = req.query

  // Pagination will only run if page query exist
  if (page) {
    const pageNumber = page.number ? parseInt(page.number) : 1
    const pageSize = page.size ? parseInt(page.size) : 20

    req.page = page
    req.skip = (pageNumber - 1) * pageSize
    req.take = pageSize
  }
  next()
}
