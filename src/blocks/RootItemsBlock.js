/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import ItemsBlock from './ItemsBlock';

export default class RootItemsBlock extends ItemsBlock 
{

    constructor(id, obj) 
    {
        super(id, obj);
    }

    buildHeader() {}

    styleContainer() {}
}
