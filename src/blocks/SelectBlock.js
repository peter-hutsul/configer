/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import OptionBlock from './OptionBlock';
import Preview from './Preview';
import ExpandedPreview from './ExpandedPreview';

export default class SelectBlock extends OptionBlock 
{
    constructor(id, obj) 
    {
        super(id, obj);
    }

    build() 
    {
        super.build();

        var obj = this.obj;

        obj.options = obj.options || ["none"]
        obj.labels = obj.labels || []
        obj.value = (typeof obj.value == "undefined" ? obj.options[0] : obj.value);

        var isNumbers = true;
        for (var i in obj.options) 
        {
            if (typeof obj.options[i] != "number") 
            {
                isNumbers = false;
                break;
            }
        }

        this.isNumbers = isNumbers;

        var input = document.createElement("select");
        input.id = this.id;
        input.value = obj.value;
        input.className = "custom-select";

        for (var t in obj.options) 
        {
            var value = obj.options[t];
            var text = obj.labels[t] || value;

            var option = document.createElement("option");
            option.value = value;
            option.innerText = text;

            if (value === obj.value) 
            {
                option.selected = true
                this.selectedText = obj.selectedText = text;
                this.selectedIndex = obj.selectedIndex = Number(t);
            }

            input.appendChild(option)
        }

        this.input = input;

        this.html.appendChild(input);

        this.preview = new Preview(this);

        if (obj.preview) 
        {
            this.expanded = new ExpandedPreview(this);
        }

        var _this = this;

        function change() 
        {
            var value = this.value;

            if (isNumbers) 
            {
                value = Number(this.value)
            }

            _this.change(value, true);
        }

        input.onchange = change;
    }

    change(value, callCallback) 
    {
        var changed = false;

        var prevValue = this.input.value;

        if (value != undefined) 
        {
            if (this.obj.value != value) 
            {
                changed = true;
            }

            this.obj.value = value;
        }

        var valueIndex = this.obj.options.indexOf(this.obj.value);

        if (valueIndex == -1) 
        {
            valueIndex = 0;
            this.obj.value = this.obj.options[valueIndex];
        }

        this.obj.selectedIndex = valueIndex;
        this.obj.selectedText = this.input.options[valueIndex].innerText;

        if (this.defaultValue == undefined) this.defaultValue = this.obj.value;
        this.input.value = "" + this.obj.value;

        if (this.input.value != prevValue || changed) 
        {
            changed = true;
            this.obj.changed = true;
            
            if (this.preview) 
            {
                this.preview.apply();
            }
            
            if (this.expanded) 
            {
                this.expanded.apply();
            }
        }

        if (changed && callCallback) 
        {
            this.onChange(this.obj.value);
        }

        return changed;
    }

    static getType() 
    {
        return 'select';
    }
}

Block.register('select', SelectBlock, 'value');