const isColorValid = (name: string) => {
  let style = new Option().style
  style.color = name
  return style.color == name
}

export default isColorValid
