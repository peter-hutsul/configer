/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

function merge(original, source) 
{
    var changed = false;

    if (source) 
    {
        for (var key, keys = Object.keys(source), l = keys.length; l--;) 
        {
            key = keys[l];

            if (original.hasOwnProperty(key)) 
            {
                if (typeof source[key] === "object" && !Array.isArray(source[key])) 
                {
                    if (typeof original[key] === "object") 
                    {
                        changed = changed || merge(original[key], source[key])
                    }
                } 
                else {
                    if (Array.isArray(source[key])) 
                    {
                        if (Array.isArray(original[key])) 
                        {
                            if (original[key].length == source[key].length) 
                            {
                                for (var i = 0; i < original[key].length; i++) 
                                {
                                    if (original[key][i] !== source[key][i]) 
                                    {
                                        changed = true;
                                        break;
                                    }
                                }
                            }
                            else 
                            {
                                changed = true;
                            }
                            original[key] = source[key].slice(0);
                        }
                    }
                    else if (typeof original[key] != "object")
                    {
                        if (original[key] !== source[key]) changed = true;

                        original[key] = source[key];
                    }
                }
            }
        }
    }

    return changed;
}

const Color = {
    isCSS: function(color) 
    {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color);
    },
    CSSToHex: function(color) 
    {
        return Math.floor(color.replace("#", "0x"));
    },
    hexToRGB: function(hexColor) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }
}

const Utils = 
{
    color: Color,
    merge: merge
}

export default Utils;