/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import InputBlock from './InputBlock';

export default class ColorBlock extends InputBlock 
{

    constructor(id, obj) 
    {
        super(id, obj);
    }

    build() 
    {
        super.build();

        this.input.className = "form-control form-control-sm";
        this.input.style.width = "80px";
       // this.input.style.padding = "0px 2px";
    }

    static getType() 
    {
        return 'color';
    }
}

Block.register('color', ColorBlock, 'value');