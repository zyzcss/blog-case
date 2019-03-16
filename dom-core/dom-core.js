function createDomElement(html){
    //创建dom
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children;
}

function DomListToArray(doms){
    //dom伪数组转数组
    return Array.prototype.slice.call(doms);
}

function isDOMList(selector) {
    //是否是HTMLCollection或NodeList
    if (!selector) {
        return false;
    }
    if (selector instanceof HTMLCollection || selector instanceof NodeList) {
        return true;
    }
    return false;
}

function Zquery(selector){
    if(!selector)return;
    if(selector instanceof Zquery){
        return selector;
    }
    var dom;
    if(typeof selector === 'string'){
        //字符串
        selector = selector.trim();
        switch (selector[0]) {
            case '<':
                dom = DomListToArray(createDomElement(selector));
                break;
            case '#':
                var _dom = document.getElementById(selector.slice(1));
                dom = _dom ? [_dom] : [];
                break;
            default:
                dom = DomListToArray(document.querySelectorAll(selector));
                break;
        }
    }else if([1,9].indexOf(selector.nodeType) != -1){
        //是dom节点
        dom = [selector];
    }else if(isDOMList(selector) || selector instanceof Array){
        //dom数组
        dom = DomListToArray(selector);
    }else{
        dom = [];
    }

    this.length = dom.length;
    this.elements = dom;
}

Zquery.prototype = {
    constructor: Zquery,

    forEach: function(fn){
        var i = 0,
            elements = this.elements;
        for (; i < elements.length; i++) {
            var element = elements[i];
            fn.call(element, element, i);
        }
        return this;
    },

    on: function(action, fn){
        return this.forEach(function(element){
            element.addEventListener(action, fn);
        });
    },

    off: function(type, fn) {
        return this.forEach(function(elem){
            elem.removeEventListener(type, fn);
        })
    },

    html: function(value) {
        if(!this.length)return '';
        var elem = this.elements[0];
        if (value == null) {
            return elem.innerHTML;
        } else {
            elem.innerHTML = value;
            return this;
        }
    },

    text: function(value) {
        if(!this.length)return '';
        var elem = this.elements[0];
        if (value == null) {
            return elem.innerText;
        } else {
            elem.innerText = value;
            return this;
        }
    },

    val: function() {
        if(!this.length)return '';
        var val = this.elements[0].value;
        return val ? val.trim() : '';
    },

    parent: function() {
        if(!this.length)return null;
        return $(this.elements[0].parentElement);
    },

    find: function(selector) {
        if(!this.length)return null;
        const elem = this.elements[0];
        return $(elem.querySelectorAll(selector));
    },

    attr: function(key, val) {
        if(!this.length)return null;
        if (val == undefined) {
            return this.elements[0].getAttribute(key);
        } else {
            return this.forEach(function(elem){
                elem.setAttribute(key, val);
            })
        }
    },

    children: function() {
        if(!this.length)return null;
        var elem = this.elements[0];
        if (!elem) {
            return null;
        }
        return $(elem.children);
    },

    remove: function() {
        return this.forEach(function(elem){
            if (elem.remove) {
                elem.remove();
            } else {
                var parent = elem.parentElement;
                parent && parent.removeChild(elem);
            }
        })
    },

    parent: function() {
        if(!this.length)return null;
        var elem = this.elements[0];
        return $(elem.parentElement);
    },

    append: function(children) {
        return this.forEach(function(elem) {
            elem.appendChild(children);
        })
    },

    css: function(attr, value){
        if(!this.length)return null;
        if(value != undefined){
            return this.forEach(function(elem) {
                elem.style[attr] = value;
            })
        }else{
            return this.elements[0].style[attr];
        }
    },

    addClass: function(className){
        return this.forEach(function(elem) {
            elem.classList.add(className);
        })
    },

    removeClass: function(className){
        return this.forEach(function(elem) {
            elem.classList.remove(className);
        })
    },

    toggleClass: function(className){
        return this.forEach(function(elem) {
            elem.classList.toggle(className);
        })
    }
}

function $(selector){
    return new Zquery(selector)
}