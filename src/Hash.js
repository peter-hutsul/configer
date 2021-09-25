
// Hash, dat.hash

const isResource = require('./IsResource');
const isSimple = require('./IsSimple');

function parseConfigForHashString(config) {
    var ret = "";
    for (var i in config) {
        if (config[i].ignore)
            continue
            
        if (isSimple(config[i].type)) {
        	if (config[i].type == "data_set" || config[i].type == "range_set")
        		ret += JSON.stringify(config[i].value)
        	else
        		ret += config[i].value
        } else if (isResource(config[i].type) && config[i].src && config[i].src.length > 0) {
            ret += config[i].src.length
        } else if (config[i].type === "block") {
        	ret += parseConfigForHashString(config[i].config)
        }
    }
    return ret;
}

module.exports = function(config) 
{
	return u.hash(parseConfigForHashString(config))
}