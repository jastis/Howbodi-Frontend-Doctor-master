
export function getFilterString(filter){
  let filterString = ''
	for (const [key, value] of Object.entries(filter)) {
		if (!value) { continue }
		filterString += `${key}=${value}&`
	}
	filterString = filterString ? `?${filterString.slice(0, -1)}` : filterString
  return filterString
}