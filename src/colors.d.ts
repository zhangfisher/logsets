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


export interface ColorizedMethods{    
    default (text:string):string
    white (text:string):string
    black (text:string):string
    red (text:string):string
    green (text:string):string
    yellow (text:string):string
    blue (text:string):string
    magenta (text:string):string
    cyan (text:string):string

    darkGray (text:string):string
    lightGray (text:string):string
    lightRed (text:string):string
    lightGreen (text:string):string
    lightYellow (text:string):string
    lightBlue (text:string):string
    lightMagenta (text:string):string
    lightCyan (text:string):string

    bright (text:string):string
    dim (text:string):string
    italic (text:string):string
    underline (text:string):string
    inverse (text:string):string

    bgDefault (text:string):string
    bgWhite (text:string):string
    bgBlack (text:string):string
    bgRed (text:string):string
    bgGreen (text:string):string
    bgYellow (text:string):string
    bgBlue (text:string):string
    bgMagenta (text:string):string
    bgCyan (text:string):string

    bgDarkGray (text:string):string
    bgLightGray (text:string):string
    bgLightRed (text:string):string
    bgLightGreen (text:string):string
    bgLightYellow (text:string):string
    bgLightBlue (text:string):string
    bgLightMagenta (text:string):string
    bgLightCyan (text:string):string
}