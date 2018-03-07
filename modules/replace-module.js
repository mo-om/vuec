module.exports = function (input, importLine, registerLine) {
  var line = '[\\s\\S].*\\n';

  var statementStart = '(var|let|const)+\\s+(filters|routers|modules|directives|components)+\\s*=\\s*[\\(\\[{]'

  var statementEnd = '[\\)\\]}]'

  var patt1 = new RegExp(`((import${line})+)((${line})+)`)

  var patt2 = new RegExp(`(${statementStart})([^\\)\\]}]*)((${line})+)`)

  var importFormat = `${importLine};\n`

  var registerFormat = `  ${registerLine},\n`

  return input
    .replace(patt1, function ($0,$1,$2,$3,$4,$5,$6,$7,$8,$9) {
      return $1 + importFormat + $3
    })
    .replace(patt2, function ($0,$1,$2,$3,$4,$5,$6,$7,$8,$9) {
      // if someone ending without a comma
      var lastModule = ''
      if (
        $4.replace(/\n/g,'').replace(/\s/g,'') !== '' &&
        $4.lastIndexOf('\n')-$4.lastIndexOf(',') !==1
      ) lastModule = $4.slice(0,$4.length-1) + ',\n'
      else lastModule = $4
      return $1 + lastModule + registerFormat + $5
    })
}
