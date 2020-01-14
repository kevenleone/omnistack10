module.exports = {
  getTechsAsArray(techs) {
    if (typeof techs === "string") {
      return techs.split(',').map(tech => tech.trim());
    }
    return techs;
  }
}