/**
 * Middleware pagination
 * ref: https://docs.commercelayer.io/api/pagination
 * pagination will only run when page query exist
 */
export function paginate(req, res, next) {
  let _pageNumber = 1
  let _pageSize = 20
  const { page } = req.query

  // Only run pagination query exist
  if (page) {
    _pageNumber = page.number ? parseInt(page.number) : _pageNumber
    _pageSize = page.size ? parseInt(page.size) : _pageSize
    req.page = page
    req.skip = (_pageNumber - 1) * _pageSize
    req.take = _pageSize
  }
  next()
}
