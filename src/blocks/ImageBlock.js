/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import FileBlock from './FileBlock';

const noop = function() {};

export default class ImageBlock extends FileBlock
{
    constructor(id, obj)
    {
        super(id, obj);
    }

    build() 
    {
        this.placeholder = "Choose image";
        this.defaultFileName = "image.png";

        super.build();

        this.input.accept = "image/*";
    }

    fileChanged(file) 
    {
        this.configure(file);
    }

    configure(file)
    {
        var toConfigure = file || this.originalSource;

        var _this = this;

        var configurationWorker = noop;

        if (_this.obj.type == "gif_to_spritesheet")
        {
           // configurationWorker = ImageUtils.gifChanges;
        }
        else
        {
           // configurationWorker = ImageUtils.imageChanges;
        }

        configurationWorker(toConfigure, function(res, originalRes)
        {
            _this.obj.src = res.src;

            if (typeof res.data == "object")
            {
                _this.obj.data = res.data
            }

            _this.obj.changed = true;

            _this.onChange(_this.obj.src, _this.obj.data);

            _this.srcChanged(originalRes);

        },
        {
            gif: _this.obj.gif
        });
    }

    change(value, callCallback) 
    {
        var changed = false;

        if (value != undefined) 
        {
            if (this.obj.src != value.src || this.obj.data != value.data) 
            {
                changed = true;
            }

            this.obj.src = value.src;
            this.obj.data = value.data;
        }

        if (this.defaultValue == undefined) this.defaultValue = {src: this.obj.src, data: this.obj.data};

        if (this.originalSource.src != this.obj.src || changed) 
        {
            this.originalSource.src = this.obj.src;

            if (this.obj.data)
            {
                this.originalSource.data = this.obj.data;
            }

            this.obj.changed = true;

            this.srcChanged(this.originalSource);
        }

        if (changed && callCallback) 
        {
            this.onChange(this.obj.src, this.obj.data);
        }

        return changed;
    }

    static getType()
    {
        return ['image', 'gif_to_spritesheet'];
    }

}

Block.register('image', ImageBlock, 'src');
Block.register('gif_to_spritesheet', ImageBlock, 'src');