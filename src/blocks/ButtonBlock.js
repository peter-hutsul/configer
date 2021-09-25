/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import GeneralBlock from './GeneralBlock';

export default class ButtonBlock extends GeneralBlock 
{

    constructor(parent, name, obj) 
    {
        super(parent, name, obj);
    }

    apply(callCallback) 
    {
        super.apply();

        if (this.obj.innerHTML) 
        {
            this.button.innerHTML = this.obj.innerHTML;
        } 
        else 
        {
            this.button.innerText = this.obj.title || this.obj.label || "Click me";
        }
    }

    build() {

        super.build();

        var obj = this.obj;

        var button = document.createElement("button")
        button.classList.add("btn")

        if (obj.bootstrap) 
        {
            button.classList.add(obj.bootstrap)
        } 
        else 
        {
            button.classList.add("btn-info")
        }

        button.id = this.id

        button.title = obj.description || ""

        if (obj.innerHTML) 
        {
            button.innerHTML = obj.innerHTML;
        } 
        else 
        {
            button.innerText = obj.title || obj.label || "Push me";
        }

        button.onclick = function() {
            if (typeof obj.onChange == "function")
                obj.onChange.call(obj)

            if (typeof obj.onClick == "function")
                obj.onClick.call(obj)

            if (typeof obj.click == "function")
                obj.click.call(obj)
        }

        this.button = this.title = button;

        this.html.style.textAlign = "center";

        this.html.appendChild(button);
    }

    static getType() 
    {
        return 'button';
    }

}

Block.register('button', ButtonBlock, 'value');