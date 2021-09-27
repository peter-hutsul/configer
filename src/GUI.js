/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import RootItemsBlock from './blocks/RootItemsBlock';
import Parse from './Parse';

// const Restore = require('./Restore');
// const Mixin = require('./Mixin');
// const GetOption = require('./GetOption');
// const Hash = require('./Hash');
// const Changed = require('./Changed');
// const Description = require('./Description');
// const Snapshot = require('./Snapshot');

// new configer.GUI('config', {
//     config: CUSTOM_CONFIG,
//     parent: 'custom_config'
// })

class GUI 
{

    constructor(id, options) 
    {
        this.id = id;

        this.config = options.config;

        this.root = null;

        if (typeof options.parent == "string") 
        {
            this.domElement = document.getElementById(options.parent);
        }
        else 
        {
            this.domElement = options.parent;
        }

        // if (this.parent) 
        // {
        //     this.parent.id = this.id;
        // }

        if (this.config && this.domElement) 
        {
            this.build(this.config);
        }
    }

    // getOption(path) 
    // {
    //     return GetOption(this.config, path);
    // }

    // description(snapshot) 
    // {
    //     return Description(this.config, snapshot);
    // }

    // changed() 
    // {
    //     return Changed(this.config);
    // }

    // hash() 
    // {
    //     return Hash(this.config);
    // }

    parse(options) 
    {
        return Parse(this.config, options);
    }

    // snapshot() 
    // {
    //     return Snapshot(this.config);
    // }

    // mixin(snapshot) 
    // {
    //     Mixin(this.config, snapshot);

    //     this.apply();
    // }

    // restore(parsed) 
    // {
    //     Restore(this.config, parsed);

    //     this.apply();
    // }

    apply(element, callCallback) 
    {
        if (element == undefined) 
        {
            element = this.config;

            if (callCallback == undefined) 
            {
                callCallback = true;
            }
        }

        element.block && element.block.apply && element.block.apply(callCallback);
    }

    build(config) 
    {
        config = config || this.config;
        // if (title === undefined) 
        // {
        //     title = GPP_TITLE;
        // }

        this.domElement.innerHTML = "";

        var rootBlock = this.root = new RootItemsBlock(this.id, config);

        // if (false) 
        // {
        //     var configPackage = new ConfigPackage(this.id, this.domElement, config);
        // }

        // if (title) 
        // {
        //     var title_element = getGlobalTitle(title, rootBlock, resetButton, domElement.id == "playable_view_config");
        //     domElement.appendChild(title_element);
        // }


        this.domElement.appendChild(rootBlock.getHTML());

        // if (false) 
        // {
        //     var configSaver = new ConfigSaver(id, parent, config);
        // }
    }
}

export default GUI;