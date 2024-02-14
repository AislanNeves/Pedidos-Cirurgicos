const stringToDateFormat = (dateString) => {
  return dateString.split('T')[0]
}

const dateISOStringToUTCDate = (dateString) => {
  const dateValue = new Date(stringToDateFormat(dateString))

  const day = dateValue.getUTCDate()
  const month = dateValue.getUTCMonth() + 1
  const year = dateValue.getUTCFullYear()

  return day + '/' + month + '/' + year
}

export { stringToDateFormat, dateISOStringToUTCDate }
