import CustomPalette from './CustomUserTask';
import CustomRenderer from './CustomRenderer';
import CustomPaletteProvider from './CustomPaletteProvider';
import CustomContextPadProvider from './CustomContextPadProvider';
import MyReplaceMenuProvider from "./MyReplaceMenuProvider";

export default {
  __init__: ['customPalette','customRenderer','paletteProvider', 'contextPadProvider','myReplaceMenuProvider'],
  customPalette: [ 'type', CustomPalette ],
  customRenderer: [ 'type', CustomRenderer ],
  paletteProvider: ['type', CustomPaletteProvider],
  myReplaceMenuProvider: ['type', MyReplaceMenuProvider],
  contextPadProvider: [ 'type', CustomContextPadProvider ]
};
