 /** 
 'foreground colors'
    .red.green.yellow.blue.magenta.cyan.white.darkGray.black
'light foreground colors'
    .lightRed.lightGreen.lightYellow.lightBlue.lightMagenta.lightCyan.lightGray
'background colors'
    .bgRed.bgGreen.bgYellow.bgBlue.bgMagenta.bgCyan.bgWhite.bgDarkGray.bgBlack
'light background colors'
    .bgLightRed.bgLightGreen.bgLightYellow.bgLightBlue.bgLightMagenta.bgLightCyan.bgLightGray
'styles'
    .bright.dim.italic.underline.inverse // your platform should support italic
 */ 


export type ForegroundColors = 'red'|'green'|'yellow'|'blue'|'magenta'|'cyan'|'white'|'darkGray'|'black'|'lightRed'|'lightGreen'|'lightYellow'|'lightBlue'|'lightMagenta'|'lightCyan'|'lightGray'
export type BackgroundColors ='bgRed'|'bgGreen'|'bgYellow'|'bgBlue'|'bgMagenta'|'bgCyan'|'bgWhite'|'bgDarkGray'|'bgBlack'|'bgLightRed'|'bgLightGreen'|'bgLightYellow'|'bgLightBlue'|'bgLightMagenta'|'bgLightCyan'|'bgLightGray'

export type FontStyles='bright'|'dim'|'italic'|'underline'|'inverse'


export type NamedColorStyles = ForegroundColors |  BackgroundColors | FontStyles
  |`${ForegroundColors},${BackgroundColors}`
  |`${ForegroundColors},${FontStyles}`
  |`${BackgroundColors},${ForegroundColors}`
  |`${BackgroundColors},${FontStyles}`
  |`${FontStyles},${ForegroundColors}`
  |`${FontStyles},${FontStyles}`
  |`${ForegroundColors},${BackgroundColors},${FontStyles}`
  |`${ForegroundColors},${FontStyles},${BackgroundColors}`
  |`${BackgroundColors},${ForegroundColors},${FontStyles}`
  |`${BackgroundColors},${FontStyles},${ForegroundColors}`
  |`${FontStyles},${BackgroundColors},${FontStyles}`
  |`${FontStyles},${FontStyles},${BackgroundColors}`