function filterJOIValidation(message) {
  const regex = /["]+/g;
  return message.replace(regex, "");
}

module.exports = filterJOIValidation;
