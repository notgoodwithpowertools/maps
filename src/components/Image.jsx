// http://blog.matthewcheok.com/a-better-img-tag/
// Converted to functional component
import React from 'react';

const Image = ( props ) => {

    // var imageName = require(`../logo.svg`);
    let {mode, src, height, width, style, cssClass } = props;

    let defaults = {

      height: height || 50,
      width: width || 50
      // backgroundColor:

    }

    if (cssClass !== undefined) {
      defaults = { }
    }

    // src = imageName;
    let modes = {

      'fill': 'cover',
      'fit': 'contain'

    }

    let size = modes[mode] || 'contain';

    let important = {

      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
      // margin: 'auto'

    }

    // console.log("Image:", height + ' Width:', width)

    return <div {...props} style={{...defaults, ...style, ...important}} className={cssClass}/>

}

export { Image as default }
