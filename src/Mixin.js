
// Mixin, dat.mixin

module.exports = function(target, source) 
{
	if (typeof source != "object") 
	{
		return target;
	}

	var obj;

	for (var key in source) 
	{
		obj = source[key];

		if (target.hasOwnProperty(key)) 
		{
			if (typeof obj == "object") 
			{
				for (var props in obj) 
				{
					if (props == "config" && target[key].type == "block") 
					{
						this.mixin(target[key][props], obj[props]);
					} 
					else if (props == "value" && (target[key].type == "data_set" || target[key].type == "range_set")) 
					{
						GPUtils.deepMixin(target[key][props], obj[props]);
					}
					else 
					{
						if (typeof obj[props] == "object") 
						{
							if (obj[props] instanceof Array) 
							{
								target[key][props] = obj[props].slice(0);
							}
							else 
							{
								GPUtils.deepMixin(target[key][props], obj[props]);
							}
						}
						else 
						{
							target[key][props] = obj[props];
						}
					}
				}

				if (!obj["hidden"]) 
				{
					target[key]["hidden"] = false;
				}

				if (!obj["disabled"]) 
				{
					target[key]["disabled"] = false;
				}
			}
			else 
			{
				target[key].value = obj;
			}
		} 
		else
		{
			//target_config[key] = obj;
		}
	}

	return target;

}