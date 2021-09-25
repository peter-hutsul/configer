/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

// var isJQueryAvail = (typeof $ == "function")

const modalContent = `
            <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{TITLE}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style ="width: 100%; height: 100%; display: flex; flex-wrap: wrap; justify-content: center;">
            </div>
            </div>
        `

export default class ExpandedPreview {

    constructor(parent) 
    {

        this.parent = parent;

        var preview = parent.preview.html;

        this.inited = false;

        preview.onclick = () => 
        {
            this.show();
        }

        var html = this.html =  document.createElement("div");
        html.className = "modal fade";
        html.id = parent.id + "_expanded_preview";
        html.innerHTML = modalContent.replace("{TITLE}", parent.obj.title || "");
    }

    init() 
    {
        var _this = this;

        var parent = this.parent;

        var obj = parent.obj;

        var body = this.body = this.html.querySelector('.modal-body');

        var previndex = obj.options.indexOf(obj.value)

        var width = parent.obj.preview_width ? parent.obj.preview_width + "px" : "";
        var height = parent.obj.preview_height ? parent.obj.preview_height + "px" : "";

        for (var t in obj.options) 
        {
            var preview = document.createElement("div");
            preview.id = parent.id + "_expreview";
            preview.className = "select-preview"
            preview.title = obj.labels[t] || obj.options[t];

            var previewImg = document.createElement("img");
            previewImg.id = parent.id + "_expreview_img";
            previewImg.alt = "Preview is not avail";

            if (previndex == t) preview.classList.add("select-expanded-selected");

            preview.appendChild(previewImg);

            previewImg.src = obj.preview[t] || "";

            previewImg.style.width = width;

            previewImg.style.height = height;

            preview.optionIndex = t;
            preview.optionValue = obj.options[t];

            preview.onclick = function() 
            {
                parent.change(this.optionValue, true);
                _this.hide();
            }

            body.appendChild(preview);
        } 

        document.body.appendChild(this.html);
    }

    apply() 
    {
        if (this.body) 
        {
            var previndex = this.parent.obj.options.indexOf(this.parent.obj.value)

            for (var i = 0; i < this.body.children.length; i++) 
            {
                this.body.children[i].classList.remove('select-expanded-selected');
            }

            this.body.children[previndex].classList.add('select-expanded-selected')
        }
    }

    show() 
    {
        if (!this.inited) 
        {
            this.inited = true;

            this.init();
        }

        // $(this.html).modal('show');
    }

    hide() 
    {
        // $(this.html).modal('hide');
    }

}