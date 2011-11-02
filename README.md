This module adds some protection aganist poison null bytes to the native "fs" module. To activate it, just put this at the top of your main application file:

    require('protect-fs')

This modifies all relevant fs methods (I hope I didn't forget any) to give you this protection.
